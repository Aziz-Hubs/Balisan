import { Metadata } from 'next';
import Image from 'next/image';
import { ContentLayout } from '@/components/layouts/ContentLayout';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Balisan\'s mission to curate the finest spirits and deliver them with exceptional service. Our story, values, and commitment to quality.',
};

export default function AboutPage() {
    return (
        <ContentLayout
            title="Our Story"
            subtitle="Crafting a new standard in spirit curation and delivery."
            breadcrumbs={[{ label: 'About Us' }]}
        >
            <section className="space-y-12">
                {/* Hero Image */}
                <div className="relative aspect-video overflow-hidden rounded-2xl not-prose">
                    <Image
                        src="/bottle.png"
                        alt="Craft distillery setup showcasing premium spirit production"
                        fill
                        className="object-contain p-20 bg-muted/30"
                        priority
                    />
                </div>

                {/* The Origin */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">The Balisan Origin</h2>
                    <p>
                        Founded in 2024, Balisan began with a simple observation: the world of craft spirits
                        is vast and beautiful, but often inaccessible. We saw a gap between the passion of
                        artisan distillers and the convenience expected by modern enthusiasts.
                    </p>
                    <p className="mt-4">
                        Our mission is to bridge that gap. We don&apos;t just sell bottles; we tell the stories
                        behind them. Every spirit in our collection is handpicked by our team of experts
                        who visit the distilleries, meet the makers, and ensure that what reaches your
                        door is nothing short of exceptional.
                    </p>
                </div>

                {/* Why We Curate */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Why We Curate</h2>
                    <p>
                        In an age of infinite choice, curation is the most valuable service. We filter through
                        thousands of options to bring you an edited selection that represents the best of its
                        class. Whether it&apos;s a rare single malt from the Scottish Highlands or a small-batch
                        botanical gin from a local Nashville maker, if it&apos;s on Balisan, it&apos;s there for a reason.
                    </p>
                    <p className="mt-4">
                        Our curation team includes certified sommeliers, former distillers, and spirits educators.
                        They taste, evaluate, and debate before any bottle earns a place in our collection.
                    </p>
                </div>

                {/* Our Values */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                    <div className="grid sm:grid-cols-3 gap-6 not-prose mt-6">
                        <div className="bg-card border rounded-xl p-6">
                            <h3 className="font-semibold text-foreground mb-2">Quality First</h3>
                            <p className="text-sm text-muted-foreground">
                                We never compromise on quality. Every product is authentic, properly stored,
                                and delivered in perfect condition.
                            </p>
                        </div>
                        <div className="bg-card border rounded-xl p-6">
                            <h3 className="font-semibold text-foreground mb-2">Responsible Enjoyment</h3>
                            <p className="text-sm text-muted-foreground">
                                We strictly enforce 21+ age verification and promote mindful consumption.
                                Great spirits deserve to be savored.
                            </p>
                        </div>
                        <div className="bg-card border rounded-xl p-6">
                            <h3 className="font-semibold text-foreground mb-2">Exceptional Service</h3>
                            <p className="text-sm text-muted-foreground">
                                From personalized recommendations to climate-controlled shipping,
                                we go above and beyond for every customer.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Commitment */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
                    <p>
                        Quality, safety, and community. We are strictly 21+ and prioritize responsible enjoyment.
                        We partner with climate-controlled logistics to ensure your spirits arrive exactly
                        as the master distiller intended.
                    </p>
                    <p className="mt-4">
                        We also believe in giving back. A portion of every sale supports organizations
                        that combat alcohol abuse and promote responsible drinking education.
                    </p>
                </div>

                {/* Nashville HQ */}
                <div className="bg-muted p-6 rounded-xl not-prose">
                    <h3 className="font-semibold mb-2">Based in Nashville</h3>
                    <p className="text-sm text-muted-foreground">
                        Our headquarters is in Nashville, Tennessee — a city that knows a thing or two
                        about great whiskey and Southern hospitality. Visit us at 123 Artisan Way, Ste 500.
                    </p>
                </div>
            </section>
        </ContentLayout>
    );
}
