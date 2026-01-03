'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { BreadcrumbNavigator } from '@/components/layouts/BreadcrumbNavigator';
import { MagicCard } from '@/components/ui/extension/MagicCard';
import { BeamInput } from '@/components/ui/extension/BeamInput';

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success("Message sent! We'll get back to you within 24 hours.");
        setIsLoading(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#0c0a09]">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <BreadcrumbNavigator items={[{ label: 'Contact Us' }]} />

                <div className="grid gap-12 lg:grid-cols-2 mt-8">
                    {/* Left Column - Info Cards */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl font-display font-bold tracking-tight">Get in Touch</h1>
                            <p className="text-xl text-muted-foreground">
                                Detailed inquiries, wholesale requests, or sommelier advice.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="h-40">
                                <MagicCard className="p-6 flex flex-col items-center justify-center text-center gap-3 shadow-none bg-transparent">
                                    <Mail className="h-8 w-8 text-amber-500" />
                                    <h3 className="font-bold">Email Us</h3>
                                    <p className="text-sm text-muted-foreground">support@balisan.com</p>
                                </MagicCard>
                            </div>
                            <div className="h-40">
                                <MagicCard className="p-6 flex flex-col items-center justify-center text-center gap-3 shadow-none bg-transparent">
                                    <Phone className="h-8 w-8 text-amber-500" />
                                    <h3 className="font-bold">Call Us</h3>
                                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                                </MagicCard>
                            </div>
                            <div className="h-40">
                                <MagicCard className="p-6 flex flex-col items-center justify-center text-center gap-3 shadow-none bg-transparent">
                                    <Clock className="h-8 w-8 text-amber-500" />
                                    <h3 className="font-bold">Hours</h3>
                                    <p className="text-sm text-muted-foreground">Mon-Fri: 9AM - 8PM EST</p>
                                </MagicCard>
                            </div>
                            <div className="h-40">
                                <MagicCard className="p-6 flex flex-col items-center justify-center text-center gap-3 shadow-none bg-transparent">
                                    <MapPin className="h-8 w-8 text-amber-500" />
                                    <h3 className="font-bold">Studio</h3>
                                    <p className="text-sm text-muted-foreground">Nashville, TN 37201</p>
                                </MagicCard>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-2xl">
                        <h2 className="text-2xl font-bold font-display mb-6">Concierge Support</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <BeamInput id="first-name" required placeholder="Alexander" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <BeamInput id="last-name" required placeholder="Hamilton" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <BeamInput id="email" type="email" required placeholder="alex@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <BeamInput id="subject" required placeholder="Private Collection Inquiry" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    required
                                    placeholder="Tell us how we can elevate your experience..."
                                    className="min-h-[150px] resize-none bg-muted/30 border-zinc-200 dark:border-white/10 focus:border-amber-500/50"
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
