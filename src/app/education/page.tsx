import { navigationCategories } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, BookOpen, Microscope, ArrowRight, Play } from "lucide-react"

export default function EducationHubPage() {
    const educationGroup = navigationCategories.find(c => c.title === "Concierge")?.items.find(i => i.title === "Education")

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-24 border-b bg-muted/20">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-sm font-bold uppercase tracking-wider mb-6">
                        <GraduationCap className="h-4 w-4" />
                        Balisan Academy
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
                        The Master of <br />
                        <span className="text-amber-600 italic">Fine Spirits</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        From basic tasting notes to the complexities of distillery terroir, our educational resources are designed to refine your palate and deepen your appreciation.
                    </p>
                </div>
            </section>

            {/* Resource Blocks */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {educationGroup?.subcategories?.map((sub) => {
                            const icons = {
                                'Masterclasses': Play,
                                'Tasting Guides': BookOpen,
                                'Distillery Spotlights': Microscope,
                            }
                            const Icon = icons[sub.title as keyof typeof icons] || GraduationCap

                            return (
                                <Link key={sub.title} href={sub.href} className="group p-10 rounded-2xl border bg-card hover:border-amber-500/30 transition-all">
                                    <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{sub.title}</h3>
                                    <p className="text-muted-foreground mb-8 leading-relaxed">
                                        Explore our curated {sub.title.toLowerCase()} collection, expert-led and detailed.
                                    </p>
                                    <div className="flex items-center text-sm font-bold text-amber-600 uppercase tracking-widest">
                                        Enter Library <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Newsletter/Call to Action */}
            <section className="py-24 border-t">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto rounded-3xl bg-zinc-900 p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                        <h2 className="text-3xl font-bold mb-6">Stay Informed</h2>
                        <p className="text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed">
                            Join our mailing list to receive invitations to private virtual tastings and new journal publications.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white min-w-[300px] outline-none focus:border-amber-500 transition-colors"
                            />
                            <Button className="bg-amber-600 hover:bg-amber-700 py-6 px-10 text-lg">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
