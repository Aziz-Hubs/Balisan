"use client"; // Standard for page

import { useState } from 'react';
import { Truck, Clock, MapPin, Shield, Search, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { BeamsBackground } from '@/components/ui/extension/BeamsBackground';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function DeliveryPage() {
    const [trackingId, setTrackingId] = useState("");
    const [status, setStatus] = useState<"processing" | "shipped" | "delivered" | null>(null);

    const handleTrack = () => {
        if (!trackingId) {
            toast.error("Please enter a valid tracking number");
            return;
        }
        // Mock tracking logic
        setStatus("shipped");
        toast.info("Tracking status detailed below");
    };

    const StatusStep = ({ step, current, label, icon: Icon }: any) => {
        const isActive = step === current || (current === "delivered") || (current === "shipped" && step === "processing");

        return (
            <div className="flex flex-col items-center gap-2 relative z-10">
                <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                    isActive ? "bg-amber-500 border-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]" : "bg-muted border-muted-foreground/30 text-muted-foreground"
                )}>
                    <Icon className="h-5 w-5" />
                </div>
                <span className={cn(
                    "text-xs font-bold uppercase tracking-wider transition-colors duration-500",
                    isActive ? "text-amber-500" : "text-muted-foreground"
                )}>{label}</span>
            </div>
        );
    };

    return (
        <BeamsBackground className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto max-w-5xl space-y-16">
                {/* Header & Tracker */}
                <div className="text-center space-y-6">
                    <h1 className="text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400">
                        Delivery & Tracking
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                        Track your premium spirits in real-time. Our climate-controlled logistics ensure your order arrives in perfect condition.
                    </p>

                    <div className="max-w-md mx-auto relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="relative bg-black rounded-lg flex items-center p-1.5 gap-2">
                            <Search className="h-5 w-5 text-muted-foreground ml-2" />
                            <Input
                                placeholder="Enter Order ID (e.g. BL-12345)"
                                className="border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-neutral-500"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                            />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Button onClick={handleTrack} className="bg-amber-500 hover:bg-amber-600 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transition-shadow">
                                    Track
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Status Slider (Active when tracking) */}
                {/* Status Slider (Strobing Effect) */}
                {status && (
                    <div className="col-span-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-6 rounded-3xl overflow-hidden relative"
                        >
                            <div className="flex justify-between text-sm font-bold tracking-tight uppercase mb-4 px-1">
                                <span className="flex items-center gap-2 text-zinc-400">
                                    <Truck className="h-4 w-4 text-amber-500" />
                                    Tracking Status: <span className="text-amber-500">{status}</span>
                                </span>
                                <span className="text-zinc-500">
                                    {status === "processing" ? "33%" : status === "shipped" ? "66%" : "100%"}
                                </span>
                            </div>

                            <div className="relative h-3 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: status === "processing" ? "33%" : status === "shipped" ? "66%" : "100%"
                                    }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="absolute top-0 left-0 h-full bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.3),55%,transparent)] bg-[length:200%_100%] animate-shimmer" />
                                </motion.div>
                            </div>

                            <div className="mt-4 flex justify-between text-xs text-muted-foreground font-mono">
                                <span className={cn(status === "processing" ? "text-amber-500" : "")}>Processing</span>
                                <span className={cn(status === "shipped" ? "text-amber-500" : "")}>On the way</span>
                                <span className={cn(status === "delivered" ? "text-amber-500" : "")}>Delivered</span>
                            </div>

                            <div className="mt-6 text-center bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                                <p className="font-mono text-amber-500 text-sm">
                                    <Clock className="inline-block h-3 w-3 mr-2" />
                                    Est. Delivery: Jan 4th - Order by 2pm for same-day dispatch.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Info Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Truck, title: "Insured Shipping", desc: "100% coverage on breakage." },
                        { icon: Clock, title: "Fast Delivery", desc: "1-3 day options available." },
                        { icon: Shield, title: "21+ Verification", desc: "ID check required at door." },
                        { icon: Package, title: "Climate Control", desc: "Temperature monitored." }
                    ].map((item, i) => (
                        <div key={i} className="bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur border border-zinc-200 dark:border-white/5 p-6 rounded-2xl hover:border-amber-500/30 transition-colors group">
                            <item.icon className="h-8 w-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Zone Table Redesign */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30">
                    <div className="p-6 border-b border-white/10">
                        <h3 className="text-xl font-bold font-display">Shipping Zones & Rates</h3>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 uppercase text-xs font-bold tracking-wider text-muted-foreground">
                            <tr>
                                <th className="p-4">Region</th>
                                <th className="p-4">Timeline</th>
                                <th className="p-4 text-right">Standard Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { name: "Amman & Environs", time: "Same Day / Next Day", cost: "3.00 JOD" },
                                { name: "Zarqa & Madaba", time: "Next Day Delivery", cost: "4.00 JOD" },
                                { name: "Irbid & Northern Cities", time: "1-2 Business Days", cost: "5.00 JOD" },
                                { name: "Aqaba & Southern Regions", time: "2-3 Business Days", cost: "7.00 JOD" }
                            ].map((zone) => (
                                <tr key={zone.name} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium">{zone.name}</td>
                                    <td className="p-4 text-muted-foreground">{zone.time}</td>
                                    <td className="p-4 text-right font-mono text-amber-500">{zone.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-amber-500/10 p-3 text-center text-xs font-bold text-amber-500 tracking-widest uppercase">
                        Free Delivery on Orders Over 50 JOD
                    </div>
                </div>
            </div>
        </BeamsBackground>
    );
}
