'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function NewsletterSignup() {
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
        <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Stay in the Loop</h2>
                    <p className="text-lg opacity-90">
                        Join our newsletter for exclusive releases, cocktail recipes, and 10% off your first order.
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-primary-foreground text-foreground border-none h-12"
                            required
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            size="lg"
                            disabled={isLoading}
                            className="h-12"
                        >
                            {isLoading ? 'Joining...' : 'Subscribe'}
                        </Button>
                    </form>

                    <p className="text-xs opacity-70">
                        By subscribing, you agree to our Terms of Service and Privacy Policy. Must be 21+ to join.
                    </p>
                </div>
            </div>
        </section>
    );
}
