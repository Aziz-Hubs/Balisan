import { Metadata } from 'next';
import { ContentLayout } from '@/components/layouts/ContentLayout';

export const metadata: Metadata = {
    title: 'Refund & Return Policy',
    description: 'Learn about Balisan\'s refund and return policies for premium spirits. Due to legal regulations, specific conditions apply to alcohol returns.',
};

export default function RefundPage() {
    return (
        <ContentLayout
            title="Refund & Return Policy"
            subtitle="Our commitment to your satisfaction with every curated spirit."
            lastUpdated="December 31, 2025"
            breadcrumbs={[{ label: 'Refund & Return Policy' }]}
        >
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                    <p>
                        At Balisan, we take pride in curating only the finest spirits for our discerning customers.
                        We understand that sometimes a purchase may not meet your expectations, and we&apos;re here to help.
                        However, due to federal and state regulations governing the sale and return of alcoholic beverages,
                        our return policy has specific conditions.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">Sealed Products</h2>
                    <p>
                        <strong>Unopened bottles</strong> in their original packaging may be returned within
                        <strong> 14 days</strong> of delivery for a full refund, provided:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>The seal is completely intact and unbroken</li>
                        <li>The product is in its original packaging</li>
                        <li>You provide proof of purchase (order confirmation email)</li>
                        <li>The return is shipped using our provided prepaid label</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">Opened Products</h2>
                    <p>
                        Due to safety and legal regulations, <strong>we cannot accept returns</strong> on alcoholic
                        beverages once the seal has been broken or the product has left our chain of custody.
                        This policy exists to protect both our customers and maintain responsible drinking standards.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">Damaged or Defective Items</h2>
                    <p>
                        If your order arrives damaged, broken, or otherwise defective, we will replace it at no cost.
                        Please follow these steps:
                    </p>
                    <ol className="list-decimal pl-6 mt-3 space-y-2">
                        <li>Take photos of the damaged packaging and product</li>
                        <li>Email support@balisan.com within <strong>48 hours</strong> of delivery</li>
                        <li>Include your order number and photos in the email</li>
                        <li>We will ship a replacement immediately at no additional charge</li>
                    </ol>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">Incorrect Orders</h2>
                    <p>
                        If you receive the wrong item, please contact us within <strong>48 hours</strong> of delivery.
                        We will arrange for the incorrect item to be picked up and send the correct product at no cost to you.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">Refund Timeline</h2>
                    <p>
                        Once we receive and inspect your return, we will process your refund within
                        <strong> 5-7 business days</strong>. The refund will be credited to your original payment method.
                        Please note that your bank or credit card company may take additional time to post the refund to your account.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">Non-Returnable Items</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Products with broken or tampered seals</li>
                        <li>Limited edition or allocated bottles (final sale)</li>
                        <li>Gift cards</li>
                        <li>Items marked as &quot;Final Sale&quot;</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">Age Verification</h2>
                    <p>
                        In accordance with our commitment to responsible drinking, all returns must be handled by
                        an individual <strong>21 years of age or older</strong>. Valid government-issued ID is required
                        when arranging return pickup.
                    </p>
                </div>

                <div className="bg-muted p-6 rounded-xl mt-8">
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <p className="text-sm">
                        If you have questions about our refund policy or need assistance with a return,
                        please contact our customer care team at{' '}
                        <a href="mailto:support@balisan.com" className="text-primary hover:underline">
                            support@balisan.com
                        </a>{' '}
                        or call us at <strong>+1 (555) 123-4567</strong>.
                    </p>
                </div>
            </section>
        </ContentLayout>
    );
}
