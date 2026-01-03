"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/lib/stores/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { signInWithPhone, verifyPhoneOtp, signInWithEmail, updateUser } from "@/services/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, Phone } from "lucide-react";
import { useTheme } from "next-themes";

import ShimmerButton from "@/components/ui/extension/ShimmerButton";
import { BeamInput } from "@/components/ui/extension/BeamInput";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

// --- Schemas ---



// --- Schemas ---

const loginSchema = z.object({
    identifier: z.string().min(1, "Please enter email or phone number"),
    password: z.string().optional(),
})

const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
})

const signupSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        email: z.string().email("Invalid email address").optional().or(z.literal("")),
        password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
        confirmPassword: z.string().optional(),
        birthDate: z.string().refine(
            (date) => {
                const today = new Date();
                const birth = new Date(date);
                let age = today.getFullYear() - birth.getFullYear();
                const m = today.getMonth() - birth.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }
                return age >= 21;
            },
            {
                message: "You must be 21 years or older to register.",
            }
        ),
    })

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

import { GlassCard } from "@/components/ui/extension/glass-card";

type ShimmerState = 'idle' | 'success' | 'error';
type AuthStep = 'IDENTIFIER' | 'OTP' | 'PASSWORD';

export function PremiumLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isAuthenticated } = useAuthStore();
    const redirectTo = searchParams.get("redirect") || "/";
    const [step, setStep] = useState<AuthStep>('IDENTIFIER');
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [shimmerState, setShimmerState] = useState<ShimmerState>('idle');
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Forms
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { identifier: "", password: "" },
    });

    const otpForm = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    useEffect(() => {
        if (isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, router, redirectTo]);

    const handleFormError = () => {
        setShimmerState('error');
        setTimeout(() => setShimmerState('idle'), 1500);
    };

    // Step 1: Handle Identifier (Email or Phone)
    async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
        try {
            setShimmerState('idle');
            const identifier = values.identifier.trim();
            const isEmail = identifier.includes("@");

            if (isEmail) {
                if (step === 'IDENTIFIER') {
                    setEmail(identifier);
                    setStep('PASSWORD');
                    return;
                }

                // Handle Email Login
                if (!values.password) {
                    toast.error("Password required");
                    return;
                }

                const { data, error } = await signInWithEmail(identifier, values.password);
                if (error) {
                    toast.error("Login failed", { description: error.message });
                    handleFormError();
                    return;
                }

                if (data?.user) {
                    handleLoginSuccess(data.user);
                }

            } else {
                // Formatting for Phone
                let formattedPhone = identifier.replace(/[^\d+]/g, '');
                if (!formattedPhone.startsWith('+')) {
                    if (formattedPhone.startsWith('07')) {
                        formattedPhone = '+962' + formattedPhone.substring(1);
                    } else if (formattedPhone.startsWith('962')) {
                        formattedPhone = '+' + formattedPhone;
                    } else {
                        formattedPhone = '+962' + formattedPhone;
                    }
                }

                setPhone(formattedPhone);

                const { error } = await signInWithPhone(formattedPhone);
                if (error) {
                    toast.error("Error sending OTP", { description: error.message });
                    handleFormError();
                    return;
                }

                toast.success("OTP Sent", { description: "Check your phone." });
                setShimmerState('success');
                setTimeout(() => {
                    setShimmerState('idle');
                    setStep('OTP');
                }, 500);
            }

        } catch (error) {
            handleFormError();
            toast.error("Login failed", { description: "An unexpected error occurred." });
        }
    }

    async function handleLoginSuccess(user: any) {
        setShimmerState('success');
        // Fetch user profile
        const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        const isAdmin = (profileData as any)?.role === 'admin';

        login({
            id: user.id,
            email: user.email || user.phone || "User",
            name: user.user_metadata?.full_name || "User",
            isAdmin,
        });

        toast.success("Welcome back!", { description: "Successfully logged in." });
        setTimeout(() => {
            router.push(redirectTo);
            router.refresh();
        }, 800);
    }

    // Step 2: Verify OTP
    async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
        try {
            setShimmerState('idle');
            const { data, error } = await verifyPhoneOtp(phone, values.otp);

            if (error) {
                toast.error("Invalid OTP", { description: error.message });
                handleFormError();
                return;
            }

            if (data?.user) {
                handleLoginSuccess(data.user);
            }
        } catch (error) {
            handleFormError();
            toast.error("Verification failed", { description: "An unexpected error occurred." });
        }
    }

    // Shimmer config
    const shimmerConfig = {
        idle: { color: "#ffffff", speed: 2 },
        success: { color: "#22c55e", speed: 2 },
        error: { color: "#ef4444", speed: 2 },
    };
    const currentConfig = shimmerConfig[shimmerState];

    return (
        <GlassCard
            title={step === 'IDENTIFIER' ? "Welcome Back" : step === 'PASSWORD' ? "Enter Password" : "Enter OTP"}
            description={
                step === 'IDENTIFIER' ? "Login with email or phone"
                    : step === 'PASSWORD' ? `Enter password for ${email}`
                        : `Code sent to ${phone}`
            }
            className="max-w-[450px] mx-auto"
        >
            {step === 'IDENTIFIER' || step === 'PASSWORD' ? (
                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit, handleFormError)} className="space-y-6">
                        {step === 'IDENTIFIER' && (
                            <FormField
                                control={loginForm.control}
                                name="identifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Email or Phone</FormLabel>
                                        <FormControl>
                                            <BeamInput
                                                placeholder="email@example.com or 079..."
                                                {...field}
                                                className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {step === 'PASSWORD' && (
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Password</FormLabel>
                                        <FormControl>
                                            <BeamInput
                                                type="password"
                                                placeholder="••••••••"
                                                {...field}
                                                className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <div className="pt-2">
                            <ShimmerButton
                                type="submit"
                                shimmerColor={currentConfig.color}
                                shimmerDuration={`${currentConfig.speed}s`}
                                background={isDark ? "#000000" : "#ffffff"}
                                className={cn(
                                    "w-full h-12 rounded-xl",
                                    isDark ? "text-white" : "text-black"
                                )}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loginForm.formState.isSubmitting && (
                                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                                    )}
                                    {loginForm.formState.isSubmitting
                                        ? "Processing..."
                                        : step === 'IDENTIFIER' ? "Continue" : "Login"}
                                </span>
                            </ShimmerButton>
                        </div>
                        {step === 'PASSWORD' && (
                            <div className="text-center text-sm">
                                <button
                                    type="button"
                                    onClick={() => setStep('IDENTIFIER')}
                                    className="text-amber-500 hover:underline"
                                >
                                    Back to login options
                                </button>
                            </div>
                        )}
                    </form>
                </Form>
            ) : (
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit, handleFormError)} className="space-y-6">
                        <FormField
                            control={otpForm.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">One-Time Password</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-center">
                                            <InputOTP
                                                maxLength={6}
                                                value={field.value}
                                                onChange={field.onChange}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-2">
                            <ShimmerButton
                                type="submit"
                                shimmerColor={currentConfig.color}
                                shimmerDuration={`${currentConfig.speed}s`}
                                background={isDark ? "#000000" : "#ffffff"}
                                className={cn(
                                    "w-full h-12 rounded-xl",
                                    isDark ? "text-white" : "text-black"
                                )}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {otpForm.formState.isSubmitting && (
                                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                                    )}
                                    {otpForm.formState.isSubmitting ? "Verifying..." : "Verify & Login"}
                                </span>
                            </ShimmerButton>
                        </div>
                        <div className="text-center text-sm">
                            <button
                                type="button"
                                onClick={() => setStep('IDENTIFIER')}
                                className="text-amber-500 hover:underline"
                            >
                                Change phone number
                            </button>
                        </div>
                    </form>
                </Form>
            )}

            <div className="text-center text-sm text-zinc-500 mt-6">
                New to Balisan?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-amber-500 hover:text-amber-400 transition-colors"
                >
                    Create an account
                </Link>
            </div>
        </GlassCard>
    );
}

export function PremiumSignupForm() {
    const router = useRouter()
    const { login, setAgeVerified } = useAuthStore()
    const [shimmerState, setShimmerState] = useState<ShimmerState>('idle')
    const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS')
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const form = useForm<any>({
        resolver: zodResolver(step === 'DETAILS' ? signupSchema : otpSchema),
        defaultValues: {
            name: "",
            phone: "",
            birthDate: "",
            otp: "",
        },
    })

    // Trigger error state on validation failure
    const handleFormError = () => {
        setShimmerState('error')
        setTimeout(() => setShimmerState('idle'), 1500)
    }

    async function handleDetailsSubmit(values: z.infer<typeof signupSchema>) {
        setShimmerState('idle');
        try {
            setAgeVerified(true)

            // Format phone number to E.164
            let formattedPhone = values.phone;
            if (formattedPhone) {
                if (formattedPhone.startsWith('07')) {
                    formattedPhone = formattedPhone.substring(1);
                    formattedPhone = '+962' + formattedPhone;
                } else if (!formattedPhone.startsWith('+')) {
                    formattedPhone = '+962' + formattedPhone;
                }
            }

            // Update form value seamlessly
            form.setValue('phone', formattedPhone);

            const { error } = await signInWithPhone(formattedPhone, {
                full_name: values.name,
                birth_date: values.birthDate,
            });

            if (error) {
                setShimmerState('error')
                setTimeout(() => setShimmerState('idle'), 1500)
                toast.error("Registration failed", { description: error.message })
                return
            }

            setShimmerState('success')
            toast.success("OTP Sent", { description: "Check your phone via WhatsApp/SMS." })
            setTimeout(() => {
                setShimmerState('idle')
                setStep('OTP')
            }, 800)

        } catch (error) {
            setShimmerState('error')
            setTimeout(() => setShimmerState('idle'), 1500)
            toast.error("Error", { description: "An unexpected error occurred." })
        }
    }

    async function handleOtpSubmit(values: z.infer<typeof otpSchema>) {
        setShimmerState('idle');
        try {
            const phone = form.getValues('phone');
            if (!phone) {
                toast.error("Phone number missing", { description: "Please start over." });
                setStep('DETAILS');
                return;
            }

            const { data, error } = await verifyPhoneOtp(phone, values.otp);

            if (error) {
                setShimmerState('error')
                setTimeout(() => setShimmerState('idle'), 1500)
                toast.error("Verification failed", { description: error.message })
                return
            }

            if (data?.session && data?.user) {
                // If user provided email and password, link them now
                const email = form.getValues('email');
                const password = form.getValues('password');

                if (email && password) {
                    await updateUser({ email, password });
                }

                setShimmerState('success')
                await login({
                    id: data.user.id,
                    email: email || data.user.email || "",
                    name: data.user.user_metadata?.full_name || form.getValues('name'),
                })

                toast.success("Account created!", { description: "Welcome to Balisan." })
                setTimeout(() => {
                    router.refresh()
                    router.push("/")
                }, 800)
            }
        } catch (error) {
            setShimmerState('error')
            setTimeout(() => setShimmerState('idle'), 1500)
            toast.error("Verification failed", { description: "Invalid code." })
        }
    }

    const onSubmit = (values: any) => {
        if (step === 'DETAILS') {
            handleDetailsSubmit(values)
        } else {
            handleOtpSubmit(values)
        }
    }

    // Shimmer config
    const shimmerConfig = {
        idle: { color: "#ffffff", speed: 2 },
        success: { color: "#22c55e", speed: 2 },
        error: { color: "#ef4444", speed: 2 },
    }
    const currentConfig = shimmerConfig[shimmerState]

    return (
        <GlassCard
            title={step === 'DETAILS' ? "Join the Club" : "Verify Phone"}
            description={step === 'DETAILS' ? "Create an account to unlock exclusive benefits" : "Enter the code sent to your phone"}
            className="max-w-[450px] mx-auto"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, handleFormError)} className="space-y-4">

                    {step === 'DETAILS' && (
                        <>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Full Name</FormLabel>
                                        <FormControl>
                                            <BeamInput
                                                placeholder="John Doe"
                                                {...field}
                                                className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                            />
                                        </FormControl>
                                        <FormMessage className="min-h-[20px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Phone Number</FormLabel>
                                        <FormControl>
                                            <BeamInput
                                                placeholder="+962 79 000 0000"
                                                {...field}
                                                className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                            />
                                        </FormControl>
                                        <FormMessage className="min-h-[20px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="birthDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Date of Birth</FormLabel>
                                        <FormControl>
                                            <BeamInput
                                                type="date"
                                                {...field}
                                                className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20 [color-scheme:light] dark:[color-scheme:dark]"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-muted-foreground text-xs">
                                            You must be 18+ to join.
                                        </FormDescription>
                                        <FormMessage className="min-h-[20px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Email (Optional)</FormLabel>
                                        <FormControl>
                                            <BeamInput
                                                placeholder="email@example.com"
                                                {...field}
                                                className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                            />
                                        </FormControl>
                                        <FormMessage className="min-h-[20px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Password (Optional)</FormLabel>
                                        <FormControl>
                                            <BeamInput
                                                type="password"
                                                placeholder="Set a password for email login"
                                                {...field}
                                                className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-muted-foreground text-xs">
                                            Allows you to login with email instead of phone.
                                        </FormDescription>
                                        <FormMessage className="min-h-[20px]" />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {step === 'OTP' && (
                        <div className="flex justify-center py-4">
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP
                                                maxLength={6}
                                                {...field}
                                                render={({ slots }) => (
                                                    <InputOTPGroup>
                                                        {slots.map((slot, index) => (
                                                            <InputOTPSlot key={index} index={index} {...slot} />
                                                        ))}
                                                    </InputOTPGroup>
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    <div className="pt-4">
                        <ShimmerButton
                            type="submit"
                            shimmerColor={currentConfig.color}
                            shimmerDuration={`${currentConfig.speed}s`}
                            background={isDark ? "#000000" : "#ffffff"}
                            className={cn(
                                "w-full h-12 rounded-xl",
                                isDark ? "text-white" : "text-black"
                            )}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {form.formState.isSubmitting && (
                                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                                )}
                                {form.formState.isSubmitting
                                    ? (step === 'DETAILS' ? "Sending Code..." : "Verifying...")
                                    : (step === 'DETAILS' ? "Continue with Phone" : "Verify & Create Account")}
                            </span>
                        </ShimmerButton>
                    </div>

                    {step === 'OTP' && (
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setStep('DETAILS')}
                                className="text-amber-500 hover:underline text-sm"
                            >
                                Change phone number
                            </button>
                        </div>
                    )}

                    <div className="text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-amber-500 hover:text-amber-400 transition-colors"
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </Form>
        </GlassCard>
    );
}

export function PremiumForgotPasswordForm() {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/account/reset-password`,
            })

            if (error) {
                toast.error("Error", { description: error.message })
                return
            }

            toast.success("Reset link sent", { description: "If an account exists, we've sent a reset link to your email." })
        } catch (error) {
            toast.error("Error", { description: "An unexpected error occurred." })
        }
    }

    return (
        <GlassCard
            title="Reset Password"
            description="Enter your email to receive a reset link"
            className="max-w-[450px] mx-auto"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormControl>
                                    <BeamInput
                                        placeholder="name@example.com"
                                        {...field}
                                        className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="pt-2">
                        <ShimmerButton
                            type="submit"
                            className="w-full h-12 rounded-xl"
                            disabled={form.formState.isSubmitting}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {form.formState.isSubmitting && (
                                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                                )}
                                {form.formState.isSubmitting ? "Sending Link..." : "Send Reset Link"}
                            </span>
                        </ShimmerButton>
                    </div>

                    <div className="text-center text-sm text-zinc-500">
                        Remember your password?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-amber-500 hover:text-amber-400 transition-colors"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            </Form>
        </GlassCard>
    )
}
