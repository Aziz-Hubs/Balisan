'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { BreadcrumbNavigator } from '@/components/layouts/BreadcrumbNavigator';

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
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="mx-auto max-w-5xl">
                <BreadcrumbNavigator items={[{ label: 'Contact Us' }]} />

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Left Column - Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold font-display tracking-tight">Contact Us</h1>
                            <p className="text-xl text-muted-foreground">
                                Questions about an order? Need a spirit recommendation?
                                Our experts are ready to assist.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <a href="mailto:support@balisan.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        support@balisan.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Phone</p>
                                    <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Headquarters</p>
                                    <p className="text-muted-foreground">
                                        123 Artisan Way, Ste 500<br />
                                        Nashville, TN 37201
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Support Hours</p>
                                    <p className="text-muted-foreground">
                                        Monday - Friday: 9AM - 8PM EST<br />
                                        Saturday: 10AM - 6PM EST<br />
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="p-8 rounded-2xl bg-muted/50 border">
                        <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" required placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" required placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" required placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (optional)</Label>
                                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" required placeholder="Order Question" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    required
                                    placeholder="How can we help you today?"
                                    className="min-h-[150px] resize-none"
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
