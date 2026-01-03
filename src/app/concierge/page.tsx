import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Wine, Users, Calendar, Search } from "lucide-react"

export default function ConciergePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900">
                    <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] opacity-30 bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-white">
                        Private Concierge
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                        Expert guidance, rare sourcing, and bespoke event services for the discerning collector.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white min-w-[200px]">
                                Enquire Now
                            </Button>
                        </Link>
                        <Link href="/services/private-client">
                            <Button size="lg" variant="outline" className="min-w-[200px] border-white/20 text-white hover:bg-white/10">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServiceCard
                            icon={Users}
                            title="Private Client"
                            description="Dedicated account management for building and maintaining your cellar."
                            href="/services/private-client"
                        />
                        <ServiceCard
                            icon={Search}
                            title="Rare Sourcing"
                            description="Access to exclusive allocations and hard-to-find vintage spirits."
                            href="/services/sourcing"
                        />
                        <ServiceCard
                            icon={Calendar}
                            title="Events & Tastings"
                            description="Curated experiences for corporate events and private gatherings."
                            href="/services/events"
                        />
                    </div>
                </div>
            </section>

            {/* Value Prop */}
            <section className="py-24 border-t border-border/50">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-display font-bold">The Art of Service</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            At Balisan, we believe that purchasing fine spirits should be as exceptional as the liquid itself. Our Concierge team is composed of sommelier-trained experts dedicated to elevating your experience.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Whether you're looking for an investment-grade whisky, planning a dinner party, or sending a gift to a valued client, we handle every detail with precision and care.
                        </p>
                    </div>
                    <div className="flex-1 aspect-square md:aspect-video bg-zinc-900 rounded-2xl overflow-hidden relative group">
                        {/* Placeholder for service image */}
                        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-600">
                            <Wine className="h-16 w-16 opacity-50" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function ServiceCard({ icon: Icon, title, description, href }: { icon: any, title: string, description: string, href: string }) {
    return (
        <Link href={href} className="group p-8 rounded-xl border border-border/50 bg-card hover:bg-accent/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:border-amber-500/20">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground mb-6 line-clamp-2">
                {description}
            </p>
            <div className="flex items-center text-sm font-medium text-primary">
                Explore Service <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        </Link>
    )
}
