import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata = {
    title: 'Events | Balisan',
    description: 'Join our exclusive tastings, masterclasses, and whisky experiences.',
};

const upcomingEvents = [
    {
        id: 1,
        title: 'The Art of Whisky Tasting',
        description: 'Learn the fundamentals of whisky appreciation with our expert sommeliers.',
        date: '2025-01-15',
        time: '7:00 PM - 9:00 PM',
        location: 'Balisan Lounge, Downtown',
        capacity: 20,
        spotsLeft: 8,
        image: '/bottle.png',
        type: 'Masterclass',
    },
    {
        id: 2,
        title: 'Japanese Whisky Journey',
        description: 'Explore the delicate craftsmanship of Japanese distilleries.',
        date: '2025-01-22',
        time: '6:30 PM - 8:30 PM',
        location: 'Virtual Event',
        capacity: 50,
        spotsLeft: 22,
        image: '/bottle.png',
        type: 'Virtual Tasting',
    },
    {
        id: 3,
        title: 'Premium Gin Experience',
        description: 'Discover botanical wonders from around the world.',
        date: '2025-02-05',
        time: '7:00 PM - 9:30 PM',
        location: 'Balisan Lounge, Downtown',
        capacity: 15,
        spotsLeft: 3,
        image: '/bottle.png',
        type: 'Tasting',
    },
];

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-gradient-to-b from-zinc-900 to-background">
                <div className="container mx-auto px-4 text-center">
                    <Badge variant="secondary" className="mb-4 bg-amber-500/10 text-amber-500 border-amber-500/20">
                        Exclusive Experiences
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
                        Tastings & Events
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
                        Immerse yourself in the world of fine spirits. Join our exclusive masterclasses,
                        tastings, and curated experiences led by industry experts.
                    </p>
                    <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                        <a href="#upcoming">View Upcoming Events</a>
                    </Button>
                </div>
            </section>

            {/* Upcoming Events */}
            <section id="upcoming" className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-foreground mb-12 text-center">
                        Upcoming Events
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors group"
                            >
                                <div className="aspect-video bg-zinc-800 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <Badge className="absolute top-4 left-4 bg-amber-500 text-black">
                                        {event.type}
                                    </Badge>
                                </div>

                                <div className="p-6 space-y-4">
                                    <h3 className="text-xl font-serif text-foreground group-hover:text-amber-500 transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-amber-500" />
                                            <span>{new Date(event.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-amber-500" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-amber-500" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-amber-500" />
                                            <span className={event.spotsLeft <= 5 ? 'text-red-500' : ''}>
                                                {event.spotsLeft} spots left
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-amber-500 hover:bg-amber-600 text-black mt-4 group/btn"
                                        disabled={event.spotsLeft === 0}
                                    >
                                        {event.spotsLeft === 0 ? 'Sold Out' : 'Reserve Spot'}
                                        {event.spotsLeft > 0 && (
                                            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Private Events CTA */}
            <section className="py-16 md:py-24 bg-zinc-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif text-white mb-6">
                        Host a Private Event
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                        Looking for a unique experience for your team or clients?
                        We offer bespoke tastings and private events tailored to your needs.
                    </p>
                    <Button asChild variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">
                        <Link href="/contact">Contact Our Events Team</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
