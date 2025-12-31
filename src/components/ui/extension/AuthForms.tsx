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
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import ShimmerButton from "@/components/ui/extension/ShimmerButton";
import { Input } from "@/components/ui/input";
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

// --- Schemas ---

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
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
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

import { GlassCard } from "@/components/ui/extension/glass-card";

type ShimmerState = 'idle' | 'success' | 'error';

export function PremiumLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isAuthenticated } = useAuthStore();
    const redirectTo = searchParams.get("redirect") || "/";
    const [shimmerState, setShimmerState] = useState<ShimmerState>('idle');

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, router, redirectTo]);

    // Trigger error state on validation failure
    const handleFormError = () => {
        setShimmerState('error');
        setTimeout(() => setShimmerState('idle'), 1500);
    };

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                // Trigger error shimmer
                setShimmerState('error');
                setTimeout(() => setShimmerState('idle'), 1500);
                toast.error("Login failed", { description: error.message });
                return;
            }

            if (data.user) {
                // Trigger success shimmer
                setShimmerState('success');

                // Fetch user profile to check for admin role
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                const isAdmin = (profileData as any)?.role === 'admin';

                login({
                    id: data.user.id,
                    email: data.user.email!,
                    name:
                        data.user.user_metadata?.full_name ||
                        data.user.email!.split("@")[0],
                    isAdmin,
                });

                toast.success("Welcome back!", {
                    description: "You have successfully logged in.",
                });

                // Brief delay to show success state before redirect
                setTimeout(() => {
                    router.push(redirectTo);
                    router.refresh();
                }, 800);
            }
        } catch (error) {
            setShimmerState('error');
            setTimeout(() => setShimmerState('idle'), 1500);
            toast.error("Login failed", {
                description: "An unexpected error occurred.",
            });
        }
    }

    // Shimmer config: use playSpeed for seamless transitions (duration stays constant)
    const shimmerConfig = {
        idle: { color: "#ffffff", speed: 1 },
        success: { color: "#22c55e", speed: 4 }, // 4x speed
        error: { color: "#ef4444", speed: 4 },   // 4x speed
    };

    const currentConfig = shimmerConfig[shimmerState];

    return (
        <GlassCard
            title="Welcome Back"
            description="Sign in to access your curated collection"
            className="max-w-[450px] mx-auto"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, handleFormError)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@example.com"
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
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-foreground">Password</FormLabel>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs text-amber-500 hover:text-amber-400 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <Input
                                        type="password"
                                        {...field}
                                        className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                    />
                                </FormControl>
                                <FormMessage className="min-h-[20px]" />
                            </FormItem>
                        )}
                    />

                    <div className="pt-2">
                        <ShimmerButton
                            type="submit"
                            className="w-full h-12 rounded-xl"
                            disabled={form.formState.isSubmitting}
                            shimmerColor={currentConfig.color}
                            playSpeed={currentConfig.speed}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {form.formState.isSubmitting && (
                                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                                )}
                                {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
                            </span>
                        </ShimmerButton>
                    </div>

                    <div className="text-center text-sm text-zinc-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-amber-500 hover:text-amber-400 transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>
                </form>
            </Form>
        </GlassCard>
    );
}

export function PremiumSignupForm() {
    const router = useRouter()
    const { login, setAgeVerified } = useAuthStore()
    const [shimmerState, setShimmerState] = useState<ShimmerState>('idle')

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            birthDate: "",
        },
    })

    // Trigger error state on validation failure
    const handleFormError = () => {
        setShimmerState('error')
        setTimeout(() => setShimmerState('idle'), 1500)
    }

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        try {
            setAgeVerified(true)

            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        full_name: values.name,
                        phone: values.phone,
                        birth_date: values.birthDate,
                    }
                }
            })

            if (error) {
                setShimmerState('error')
                setTimeout(() => setShimmerState('idle'), 1500)
                toast.error("Registration failed", { description: error.message })
                return
            }

            if (data.session && data.user) {
                setShimmerState('success')
                await login({
                    id: data.user.id,
                    email: data.user.email!,
                    name: values.name,
                })

                toast.success("Account created!", { description: "Welcome to Balisan." })
                setTimeout(() => {
                    router.refresh()
                    router.push("/")
                }, 800)
            } else {
                setShimmerState('success')
                toast.success("Account created!", { description: "Please check your email to confirm your account." })
                setTimeout(() => router.push("/login"), 800)
            }
        } catch (error) {
            setShimmerState('error')
            setTimeout(() => setShimmerState('idle'), 1500)
            toast.error("Registration failed", { description: "An unexpected error occurred." })
        }
    }

    // Shimmer config
    const shimmerConfig = {
        idle: { color: "#ffffff", speed: 1 },
        success: { color: "#22c55e", speed: 4 },
        error: { color: "#ef4444", speed: 4 },
    }
    const currentConfig = shimmerConfig[shimmerState]

    return (
        <GlassCard
            title="Join the Club"
            description="Create an account to unlock exclusive benefits"
            className="max-w-[450px] mx-auto"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, handleFormError)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Full Name</FormLabel>
                                <FormControl>
                                    <Input
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@example.com"
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
                                    <Input
                                        placeholder="+1 (555) 000-0000"
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
                                    <Input
                                        type="date"
                                        {...field}
                                        className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20 [color-scheme:light] dark:[color-scheme:dark]"
                                    />
                                </FormControl>
                                <FormDescription className="text-muted-foreground text-xs">
                                    You must be 21+ to join.
                                </FormDescription>
                                <FormMessage className="min-h-[20px]" />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
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
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Confirm</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:ring-amber-500/20"
                                        />
                                    </FormControl>
                                    <FormMessage className="min-h-[20px]" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="pt-4">
                        <ShimmerButton
                            type="submit"
                            className="w-full h-12 rounded-xl"
                            disabled={form.formState.isSubmitting}
                            shimmerColor={currentConfig.color}
                            playSpeed={currentConfig.speed}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {form.formState.isSubmitting && (
                                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                                )}
                                {form.formState.isSubmitting
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </span>
                        </ShimmerButton>
                    </div>

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
                                    <Input
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
