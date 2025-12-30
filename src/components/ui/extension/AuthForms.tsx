"use client";

import React, { useEffect } from "react";
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

import { GlassCard } from "@/components/ui/extension/glass-card";

export function PremiumLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isAuthenticated } = useAuthStore();
    const redirectTo = searchParams.get("redirect") || "/";

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

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                toast.error("Login failed", { description: error.message });
                return;
            }

            if (data.user) {
                login({
                    id: data.user.id,
                    email: data.user.email!,
                    name:
                        data.user.user_metadata?.full_name ||
                        data.user.email!.split("@")[0],
                });

                toast.success("Welcome back!", {
                    description: "You have successfully logged in.",
                });

                setTimeout(() => {
                    router.push(redirectTo);
                    router.refresh();
                }, 100);
            }
        } catch (error) {
            toast.error("Login failed", {
                description: "An unexpected error occurred.",
            });
        }
    }

    return (
        <GlassCard
            title="Welcome Back"
            description="Sign in to access your curated collection"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-300">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@example.com"
                                        {...field}
                                        className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-zinc-300">Password</FormLabel>
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
                                        className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20"
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

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            birthDate: "",
        },
    })

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        try {
            setAgeVerified(true)

            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        full_name: values.name,
                        birth_date: values.birthDate,
                    }
                }
            })

            if (error) {
                toast.error("Registration failed", { description: error.message })
                return
            }

            if (data.session && data.user) {
                await login({
                    id: data.user.id,
                    email: data.user.email!,
                    name: values.name,
                })

                toast.success("Account created!", { description: "Welcome to Balisan." })
                router.refresh()
                router.push("/")
            } else {
                toast.success("Account created!", { description: "Please check your email to confirm your account." })
                router.push("/login")
            }
        } catch (error) {
            toast.error("Registration failed", { description: "An unexpected error occurred." })
        }
    }

    return (
        <GlassCard
            title="Join the Club"
            description="Create an account to unlock exclusive benefits"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-300">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        {...field}
                                        className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-300">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@example.com"
                                        {...field}
                                        className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-300">Date of Birth</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        {...field}
                                        className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20 [color-scheme:dark]"
                                    />
                                </FormControl>
                                <FormDescription className="text-zinc-500 text-xs">
                                    You must be 21+ to join.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">Confirm</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="pt-4">
                        <ShimmerButton
                            type="submit"
                            className="w-full h-12 rounded-xl"
                            disabled={form.formState.isSubmitting}
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
