'use client';

import { Calendar, MapPin, Clock, Users, ArrowRight, Wine } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const upcomingEvents = [
    {
        id: 1,
        title: 'The Art of Whisky Tasting',
        description: 'Learn the fundamentals of whisky appreciation with our expert sommeliers. A guided journey through 5 premium single malts.',
        date: '2025-01-15',
        time: '7:00 PM - 9:00 PM',
        location: 'Balisan Lounge, Downtown',
        capacity: 20,
        spotsLeft: 8,
        image: '/bottle.png',
        type: 'Masterclass',
        price: '$150',
    },
    {
        id: 2,
        title: 'Japanese Whisky Journey',
        description: 'Explore the delicate craftsmanship of Japanese distilleries. Featuring Hibiki, Yamazaki, and Nikka selections.',
        date: '2025-01-22',
        time: '6:30 PM - 8:30 PM',
        location: 'Virtual Event',
        capacity: 50,
        spotsLeft: 22,
        image: '/bottle.png',
        type: 'Virtual Tasting',
        price: '$75',
    },
    {
        id: 3,
        title: 'Premium Gin Experience',
        description: 'Discover botanical wonders from around the world. Create your own custom blend to take home.',
        date: '2025-02-05',
        time: '7:00 PM - 9:30 PM',
        location: 'Balisan Lounge, Downtown',
        capacity: 15,
        spotsLeft: 3,
        image: '/bottle.png',
        type: 'Tasting',
        price: '$120',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

// Text animation variants
const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.04,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.8 + i * 0.1,
            duration: 0.6,
            ease: "easeOut" as const,
        },
    }),
};

// Animated Text Component
function AnimatedHeading({ text, className }: { text: string; className?: string }) {
    return (
        <span className={className}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}

export default function EventsPage() {
    const descriptionWords = "Immerse yourself in the world of fine spirits. Join our exclusive masterclasses, intimate tastings, and curated experiences led by world-class industry experts.".split(' ');

    return (
        <div className="min-h-screen bg-zinc-950 text-foreground selection:bg-amber-500/30">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Badge variant="outline" className="mb-6 border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors px-4 py-1.5 text-sm uppercase tracking-wider backdrop-blur-md">
                            Exclusive Experiences
                        </Badge>
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 tracking-tight pb-2">
                        <AnimatedHeading text="Tastings " />
                        <motion.span
                            className="text-amber-500 inline-block"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.4, type: "spring", stiffness: 200 }}
                        >
                            &
                        </motion.span>
                        <AnimatedHeading text=" Events" />
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed flex flex-wrap justify-center gap-x-1.5">
                        {descriptionWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate="visible"
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>

                    <motion.div
                        className="flex flex-col md:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                    >
                        <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold min-w-[160px]">
                            <a href="#upcoming">View Schedule</a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white min-w-[160px]">
                            <Link href="/contact">Private Events</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section id="upcoming" className="py-24 md:py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                                Upcoming Events
                            </h2>
                            <p className="text-zinc-400 max-w-lg">
                                Secure your spot for our next tasting experiences.
                                Members get early access and special pricing.
                            </p>
                        </div>
                        <Button variant="link" className="text-amber-500 p-0 h-auto hover:text-amber-400 group">
                            View Past Events <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {upcomingEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                variants={item}
                                className="group relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5 backdrop-blur-sm"
                            >
                                {/* Image Area */}
                                <div className="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-zinc-800/80 mix-blend-overlay z-10" />
                                    {/* Placeholder for actual image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent z-20" />
                                    <div className="absolute top-4 left-4 z-30">
                                        <Badge className="bg-zinc-950/80 hover:bg-zinc-900 text-amber-500 border border-amber-500/20 backdrop-blur-md">
                                            {event.type}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4 z-30">
                                        <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-0">
                                            {event.price}
                                        </Badge>
                                    </div>
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="mb-6 space-y-2">
                                        <div className="flex items-center text-amber-500 text-sm font-medium mb-3">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <h3 className="text-2xl font-serif text-white group-hover:text-amber-500 transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 text-sm text-zinc-500 mb-8 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-zinc-400" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-zinc-400" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 col-span-2">
                                            <Users className="h-4 w-4 text-zinc-400" />
                                            <span className={event.spotsLeft <= 5 ? 'text-amber-500 font-medium' : ''}>
                                                {event.spotsLeft} spots remaining
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-white text-black hover:bg-amber-500 border-none transition-colors duration-300"
                                        disabled={event.spotsLeft === 0}
                                    >
                                        {event.spotsLeft === 0 ? 'Sold Out' : 'Reserve Your Spot'}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Private Events CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-950/10" />
                <div className="container relative mx-auto px-4">
                    <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-white/5 rounded-[2rem] p-8 md:p-16 text-center shadow-2xl overflow-hidden relative">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-full mb-4">
                                <Wine className="h-6 w-6 text-amber-500" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif text-white">
                                Host a Private Experience
                            </h2>
                            <p className="text-lg text-zinc-400 leading-relaxed">
                                From corporate tastings to intimate celebrations, our events team creates
                                bespoke experiences tailored to your exact specifications.
                                Featuring curated spirits lists and dedicated sommelier service.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <Button asChild size="lg" className="bg-white text-black hover:bg-amber-100 min-w-[200px]">
                                    <Link href="/contact">Inquire Now</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5 min-w-[200px]">
                                    <Link href="/services">View Service Menu</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
