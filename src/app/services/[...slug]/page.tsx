import { notFound } from "next/navigation"
import { navigationCategories } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react"

interface ServicePageProps {
    params: Promise<{
        slug: string[]
    }>
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
    const { slug } = await params
    const serviceSlug = slug[0]

    // Find service metadata from Concierge section in navigation config
    const conciergeGroup = navigationCategories.find(c => c.title === "Concierge")
    const serviceGroup = conciergeGroup?.items.find(item => item.title === "Services")
    const serviceMetadata = serviceGroup?.subcategories?.find(sub => sub.href.includes(serviceSlug))

    if (!serviceMetadata) {
        return notFound()
    }

    // Dynamic data based on slug
    const content = {
        'private-client': {
            title: "Private Client Services",
            subtitle: "Exclusive Cellar Management & Advisory",
            description: "Our Private Client service is designed for collectors who value expertise, discretion, and access. We provide end-to-end management of your spirits and wine collection.",
            features: [
                "Dedicated Portfolio Manager",
                "Priority Access to Rare Allocations",
                "Valuation & Appraisal Services",
                "Storage Advisory & Logistics"
            ],
            icon: ShieldCheck
        },
        'sourcing': {
            title: "Rare Sourcing",
            subtitle: "Global Procurement of Exceptional Liquids",
            description: "Leveraging our international network of distilleries, private collectors, and auction houses to find the impossible.",
            features: [
                "Bespoke Search Requests",
                "Provenance Verification",
                "Global Shipping & Insurance",
                "Limited Edition Alerts"
            ],
            icon: Globe
        },
        'events': {
            title: "Bespoke Events",
            subtitle: "Unforgettable Sensory Experiences",
            description: "From corporate galas to intimate private tastings, we craft events that center around the art of the pour.",
            features: [
                "Sommelier-led Tastings",
                "Custom Cocktail Curation",
                "Mobile Bar Service & Staffing",
                "Glassware & Equipment Rental"
            ],
            icon: Zap
        }
    }[serviceSlug] || {
        title: serviceMetadata.title,
        subtitle: "Professional Concierge Services",
        description: "Experience the pinnacle of hospitality with our dedicated concierge services.",
        features: ["Expert Advice", "Personalized Service", "Quality Assurance"],
        icon: CheckCircle2
    }

    const Icon = content.icon

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="border-b bg-muted/30">
                <div className="container mx-auto px-4 py-8">
                    <Link href="/concierge" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Concierge
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Icon className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-display font-bold tracking-tight">{content.title}</h1>
                            <p className="text-lg text-muted-foreground font-light">{content.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="prose prose-zinc dark:prose-invert max-w-none">
                            <p className="text-xl leading-relaxed text-foreground/80">
                                {content.description}
                            </p>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                Our bespoke approach ensures that every client's unique needs are met with precision. Whether you are building a legacy collection or planning a high-stakes corporate event, Balisan is your partner in excellence.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {content.features.map((feature) => (
                                <div key={feature} className="flex items-start gap-4 p-6 rounded-xl border bg-card/50">
                                    <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0" />
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 p-8 rounded-2xl border bg-zinc-900 text-white space-y-6">
                            <h3 className="text-2xl font-bold">Start a Request</h3>
                            <p className="text-zinc-400">
                                Tell us about your requirements and one of our specialists will contact you within 24 hours.
                            </p>
                            <Link href="/contact" className="block">
                                <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700 border-none">
                                    Contact Specialist
                                </Button>
                            </Link>
                            <div className="pt-6 border-t border-white/10 text-sm text-zinc-500 space-y-2">
                                <p className="flex justify-between"><span>Response Time:</span> <span className="text-zinc-300">{"< 24h"}</span></p>
                                <p className="flex justify-between"><span>Availability:</span> <span className="text-zinc-300">Global</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
