import { Metadata } from 'next';
import { ContentLayout } from '@/components/layouts/ContentLayout';
import { Truck, Clock, MapPin, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Shipping Policy',
    description: 'Learn about Balisan\'s shipping policies, delivery zones, rates, and our commitment to safe, climate-controlled spirit delivery.',
};

export default function ShippingPage() {
    const shippingZones = [
        { zone: 'Southeast US', time: '1-2 Business Days', rate: '$15.00' },
        { zone: 'Northeast & Midwest', time: '2-3 Business Days', rate: '$18.00' },
        { zone: 'West Coast', time: '4-5 Business Days', rate: '$22.00' },
        { zone: 'Alaska & Hawaii', time: '5-7 Business Days', rate: '$35.00' },
    ];

    return (
        <ContentLayout
            title="Shipping Policy"
            subtitle="Safe, secure delivery of curated spirits to your door."
            lastUpdated="December 31, 2025"
            breadcrumbs={[{ label: 'Shipping Policy' }]}
        >
            <section className="space-y-10">
                {/* Feature Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 not-prose">
                    <div className="bg-card border rounded-xl p-5 text-center">
                        <Truck className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-foreground">Insured Shipping</h3>
                        <p className="text-sm text-muted-foreground mt-1">All orders fully protected</p>
                    </div>
                    <div className="bg-card border rounded-xl p-5 text-center">
                        <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-foreground">Fast Delivery</h3>
                        <p className="text-sm text-muted-foreground mt-1">1-7 business days</p>
                    </div>
                    <div className="bg-card border rounded-xl p-5 text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-foreground">Nationwide</h3>
                        <p className="text-sm text-muted-foreground mt-1">Shipping to eligible states</p>
                    </div>
                    <div className="bg-card border rounded-xl p-5 text-center">
                        <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-foreground">Climate Control</h3>
                        <p className="text-sm text-muted-foreground mt-1">Temperature-safe transit</p>
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
                        *Free shipping on all orders over $150. Expedited options available at checkout.
                    </p>
                </div>

                {/* Carrier Information */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Our Shipping Partners</h2>
                    <p>
                        We partner with <strong>FedEx</strong> and <strong>UPS</strong> for all spirit deliveries.
                        These carriers specialize in handling alcohol shipments and maintain proper licensing
                        for interstate alcohol transport. All packages are discreetly labeled and require
                        an adult signature upon delivery.
                    </p>
                </div>

                {/* Processing Time */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Order Processing</h2>
                    <p>
                        Orders placed before <strong>2:00 PM EST</strong> on business days are typically
                        processed and shipped the same day. Orders placed after this time or on weekends
                        will be processed the next business day. You will receive a shipping confirmation
                        email with tracking information once your order ships.
                    </p>
                </div>

                {/* Age Verification */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Adult Signature Required</h2>
                    <p>
                        Federal law requires that an adult <strong>21 years of age or older</strong> be present
                        to sign for any shipment containing alcohol. Our carriers are trained to verify identity
                        and age upon delivery. Valid government-issued photo ID is required.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Packages cannot be left unattended at doors</li>
                        <li>Packages cannot be signed for by minors</li>
                        <li>Multiple delivery attempts will be made if you&apos;re not home</li>
                        <li>You may redirect the package to a FedEx/UPS location for pickup</li>
                    </ul>
                </div>

                {/* Restricted States */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Shipping Restrictions</h2>
                    <p>
                        Due to varying state laws regarding alcohol shipments, we are unable to ship to certain states.
                        Please check your eligibility at checkout. We are continuously working to expand our delivery network.
                    </p>
                </div>

                {/* Climate Control */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Temperature-Controlled Shipping</h2>
                    <p>
                        Fine spirits are sensitive to temperature fluctuations. During extreme weather,
                        we use insulated packaging and ice packs to maintain optimal conditions.
                        In severe heat waves or cold snaps, we may temporarily hold shipments to protect
                        your curated spirits from damage.
                    </p>
                </div>

                <div className="bg-muted p-6 rounded-xl mt-8 not-prose">
                    <h3 className="font-semibold mb-2">Questions About Your Shipment?</h3>
                    <p className="text-sm text-muted-foreground">
                        Contact our customer care team at{' '}
                        <a href="mailto:support@balisan.com" className="text-primary hover:underline">
                            support@balisan.com
                        </a>{' '}
                        or call <strong>+1 (555) 123-4567</strong> for shipping inquiries.
                    </p>
                </div>
            </section>
        </ContentLayout>
    );
}
