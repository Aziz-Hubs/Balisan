import { Metadata } from 'next';
import { ContentLayout } from '@/components/layouts/ContentLayout';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Wine, Heart } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Careers',
    description: 'Join the Balisan team and help us redefine the premium spirits experience. Explore open positions and our company culture.',
};

const openPositions = [
    {
        title: 'Spirits Curator',
        department: 'Product',
        location: 'Nashville, TN',
        type: 'Full-time',
        description: 'Source and evaluate premium spirits from distilleries worldwide. Build relationships with craft producers.',
    },
    {
        title: 'Senior Frontend Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'Build beautiful, performant e-commerce experiences with Next.js and React.',
    },
    {
        title: 'Customer Experience Lead',
        department: 'Operations',
        location: 'Nashville, TN',
        type: 'Full-time',
        description: 'Lead our customer support team and ensure every interaction reflects our premium brand.',
    },
    {
        title: 'Content Writer',
        department: 'Marketing',
        location: 'Remote',
        type: 'Part-time',
        description: 'Create compelling tasting notes, brand stories, and educational content about craft spirits.',
    },
];

const values = [
    {
        icon: Wine,
        title: 'Passion for Craft',
        description: 'We celebrate the artistry behind every bottle and the stories of the makers.',
    },
    {
        icon: Users,
        title: 'Customer Obsession',
        description: 'Every decision starts with asking: how does this serve our community?',
    },
    {
        icon: Heart,
        title: 'Responsible Enjoyment',
        description: 'We promote mindful consumption and strictly adhere to age verification.',
    },
    {
        icon: MapPin,
        title: 'Nashville Roots',
        description: 'Born in Music City, we bring Southern hospitality to everything we do.',
    },
];

export default function CareersPage() {
    return (
        <ContentLayout
            title="Careers at Balisan"
            subtitle="Join our team and help redefine the premium spirits experience."
            breadcrumbs={[{ label: 'Careers' }]}
        >
            <section className="space-y-12">
                {/* Intro */}
                <div>
                    <p className="text-lg">
                        At Balisan, we&apos;re building more than a liquor store — we&apos;re creating a destination
                        for spirit enthusiasts who appreciate quality, craftsmanship, and exceptional service.
                        Our team is a blend of sommeliers, technologists, and hospitality veterans united
                        by a shared passion for curated experiences.
                    </p>
                </div>

                {/* Values */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
                    <div className="grid sm:grid-cols-2 gap-6 not-prose">
                        {values.map((value) => (
                            <div key={value.title} className="flex gap-4 items-start">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <value.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Perks & Benefits</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Competitive salary and equity packages</li>
                        <li>Comprehensive health, dental, and vision insurance</li>
                        <li>Generous PTO and flexible work arrangements</li>
                        <li>Monthly spirit education and tasting sessions</li>
                        <li>Employee discounts on all products</li>
                        <li>Professional development budget</li>
                        <li>401(k) matching program</li>
                    </ul>
                </div>

                {/* Open Positions */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
                    <div className="space-y-4 not-prose">
                        {openPositions.map((position) => (
                            <div
                                key={position.title}
                                className="border rounded-xl p-6 bg-card hover:border-primary/50 transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground">{position.title}</h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                                {position.department}
                                            </span>
                                            <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                                {position.location}
                                            </span>
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                {position.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-3">
                                            {position.description}
                                        </p>
                                    </div>
                                    <Button asChild className="shrink-0">
                                        <Link href={`mailto:careers@balisan.com?subject=Application: ${position.title}`}>
                                            Apply Now
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Don't see a fit */}
                <div className="bg-muted p-6 rounded-xl not-prose">
                    <h3 className="font-semibold mb-2">Don&apos;t See a Fit?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        We&apos;re always looking for talented individuals who share our passion.
                        Send your resume and a note about what excites you about Balisan to{' '}
                        <a href="mailto:careers@balisan.com" className="text-primary hover:underline">
                            careers@balisan.com
                        </a>.
                    </p>
                </div>
            </section>
        </ContentLayout>
    );
}
