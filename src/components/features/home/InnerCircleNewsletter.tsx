'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ShimmerButton from '@/components/ui/extension/ShimmerButton';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function InnerCircleNewsletter() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Thanks for subscribing! Check your email for your 10% discount code.');
        setEmail('');
        setIsLoading(false);
    };

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-background flex flex-col items-center justify-center text-center">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Join the Inner Circle</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-lg font-light">
                        Experience the extraordinary. Subscribe to our newsletter for exclusive releases,
                        expert curation, and 10% off your first order.
                    </p>
                </motion.div>

                <div className="max-w-xl mx-auto mb-12">
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-muted/50 border-input text-foreground h-12 focus-visible:ring-amber-500/50 flex-grow"
                            required
                        />
                        <ShimmerButton
                            type="submit"
                            disabled={isLoading}
                            className="h-12 px-8 shadow-2xl"
                        >
                            <span className="text-sm font-medium text-white">
                                {isLoading ? 'Joining...' : 'Stay in the Loop'}
                            </span>
                        </ShimmerButton>
                    </form>
                    <p className="text-xs text-zinc-500 mt-4">
                        By subscribing, you agree to our Terms of Service and Privacy Policy. Must be 21+ to join.
                    </p>
                </div>

                <div className="pt-12 border-t border-border inline-block w-full max-w-2xl">
                    <div className="flex flex-col items-center">
                        <p className="text-muted-foreground text-sm mb-4 italic">Looking for exclusive member-only releases?</p>
                        <Link href="/signup">
                            <button className="text-amber-500 hover:text-amber-400 font-medium transition-colors flex items-center gap-2 group mx-auto text-lg underline-offset-4 hover:underline">
                                Become a Member <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
