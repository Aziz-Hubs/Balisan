import { Metadata } from 'next';
import { ContentLayout } from '@/components/layouts/ContentLayout';
import { Truck, Clock, MapPin, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Delivery Information',
    description: 'Learn about Balisan delivery zones, estimated times, ID requirements, and our climate-controlled logistics for premium spirits.',
};

export default function DeliveryPage() {
    const shippingZones = [
        { zone: 'Southeast US', time: '1-2 Business Days', rate: '$15.00' },
        { zone: 'Northeast & Midwest', time: '2-3 Business Days', rate: '$18.00' },
        { zone: 'West Coast', time: '4-5 Business Days', rate: '$22.00' },
    ];

    return (
        <ContentLayout
            title="Delivery Information"
            subtitle="Everything you need to know about how your spirits arrive safely."
            breadcrumbs={[{ label: 'Delivery Information' }]}
        >
            <section className="space-y-10">
                {/* Feature Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 not-prose">
                    <div className="bg-card border rounded-xl p-5 text-center">
                        <Truck className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-foreground">Insured</h3>
                        <p className="text-sm text-muted-foreground mt-1">Every shipment protected</p>
                    </div>
                    <div className="bg-card border rounded-xl p-5 text-center">
                        <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-foreground">Fast</h3>
                        <p className="text-sm text-muted-foreground mt-1">1-5 business days</p>
                    </div>
                    <div className="bg-card border rounded-xl p-5 text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-foreground">Nationwide</h3>
                        <p className="text-sm text-muted-foreground mt-1">To eligible states</p>
                    </div>
                    <div className="bg-card border rounded-xl p-5 text-center">
                        <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-foreground">Climate Safe</h3>
                        <p className="text-sm text-muted-foreground mt-1">Temperature controlled</p>
                    </div>
                </div>

                {/* Shipping Rates Table */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Shipping Zones & Rates</h2>
                    <div className="overflow-hidden rounded-xl border bg-card not-prose">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-muted text-muted-foreground">
                                    <th className="p-4 text-left font-bold">Zone</th>
                                    <th className="p-4 text-left font-bold">Estimated Time</th>
                                    <th className="p-4 text-left font-bold">Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {shippingZones.map((zone) => (
                                    <tr key={zone.zone}>
                                        <td className="p-4">{zone.zone}</td>
                                        <td className="p-4">{zone.time}</td>
                                        <td className="p-4 font-medium">{zone.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 italic">
                        *Free shipping on all orders over $150.
                    </p>
                </div>

                {/* ID Verification */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Mandatory ID Verification</h2>
                    <p>
                        Federal law requires that an adult <strong>21 years of age or older</strong> be present
                        to sign for any shipment containing alcohol. Our couriers are trained to verify identity
                        and age. We cannot leave packages unattended at doors or with minors.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Valid government-issued photo ID required</li>
                        <li>Must match the name on the order</li>
                        <li>ID must not be expired</li>
                    </ul>
                </div>

                {/* Climate Control */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Climate Controlled Logistics</h2>
                    <p>
                        Fine spirits are sensitive to temperature fluctuations. We use specialized shippers
                        and climate-controlled hubs to ensure your bottles are never exposed to extreme heat or cold,
                        preserving the flavor profile exactly as the master distiller intended.
                    </p>
                </div>

                {/* Damage Insurance */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Damage Insurance</h2>
                    <p>
                        All shipments are fully insured. If your bottle arrives broken or damaged,
                        simply snap a photo and email us at{' '}
                        <a href="mailto:support@balisan.com" className="text-primary hover:underline">
                            support@balisan.com
                        </a>{' '}
                        within 48 hours. We will ship a replacement immediately.
                    </p>
                </div>

                {/* Tracking */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Order Tracking</h2>
                    <p>
                        Once your order ships, you&apos;ll receive an email with tracking information.
                        You can also track your order anytime by logging into your account and viewing your order history.
                    </p>
                </div>

                <div className="bg-muted p-6 rounded-xl mt-8 not-prose">
                    <h3 className="font-semibold mb-2">Questions About Delivery?</h3>
                    <p className="text-sm text-muted-foreground">
                        Contact our customer care team at{' '}
                        <a href="mailto:support@balisan.com" className="text-primary hover:underline">
                            support@balisan.com
                        </a>{' '}
                        or call <strong>+1 (555) 123-4567</strong>.
                    </p>
                </div>
            </section>
        </ContentLayout>
    );
}
