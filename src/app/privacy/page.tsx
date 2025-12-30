import { Metadata } from 'next';
import { ContentLayout } from '@/components/layouts/ContentLayout';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Learn how Balisan collects, uses, and protects your personal information when you shop for curated spirits.',
};

export default function PrivacyPage() {
    return (
        <ContentLayout
            title="Privacy Policy"
            subtitle="Your privacy is important to us. Here's how we protect your information."
            lastUpdated="December 31, 2025"
            breadcrumbs={[{ label: 'Privacy Policy' }]}
        >
            <section className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account,
                        make a purchase of curated spirits, subscribe to our newsletter, or communicate with our
                        customer care team. This information may include:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Name, email address, and phone number</li>
                        <li>Billing and shipping addresses</li>
                        <li>Payment information (securely processed via third-party providers)</li>
                        <li>Date of birth (for age verification purposes)</li>
                        <li>Purchase history and product preferences</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">2. Age Verification Data</h2>
                    <p>
                        To comply with federal and state laws regarding the sale of alcoholic beverages,
                        we verify that all customers are at least <strong>21 years of age</strong>.
                        We may collect date of birth information and, in some cases, request a government-issued ID.
                        We do not permanently store sensitive identity document images once verification is complete.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">3. How We Use Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Process transactions and fulfill orders for curated spirits</li>
                        <li>Send order confirmations, shipping updates, and delivery notifications</li>
                        <li>Respond to customer inquiries and provide support</li>
                        <li>Personalize your shopping experience with relevant recommendations</li>
                        <li>Improve our website, products, and services</li>
                        <li>Comply with legal obligations, including age verification requirements</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">4. Information Sharing</h2>
                    <p>
                        We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Shipping carriers to fulfill your orders (FedEx, UPS)</li>
                        <li>Payment processors to complete transactions</li>
                        <li>Analytics providers to improve our services</li>
                        <li>Law enforcement when required by law</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">5. Cookies & Tracking</h2>
                    <p>
                        We use cookies and similar technologies to enhance your experience, analyze site traffic,
                        and personalize content. You can manage your cookie preferences through your browser settings.
                        Note that disabling cookies may affect some site functionality.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
                    <p>
                        We implement industry-standard security measures to protect your personal information,
                        including SSL encryption, secure payment processing, and regular security audits.
                        However, no method of transmission over the Internet is 100% secure.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
                    <p>
                        Depending on your location, you may have the right to access, correct, or delete your
                        personal information. To exercise these rights, please contact us at{' '}
                        <a href="mailto:privacy@balisan.com" className="text-primary hover:underline">
                            privacy@balisan.com
                        </a>.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">8. Responsible Drinking</h2>
                    <p>
                        Balisan is committed to promoting responsible enjoyment of alcoholic beverages.
                        We strictly enforce age verification and do not market to individuals under the legal drinking age.
                        If you or someone you know needs help with alcohol-related issues, please visit{' '}
                        <a href="https://www.samhsa.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            SAMHSA.gov
                        </a>.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at:
                    </p>
                    <address className="not-italic mt-3">
                        <strong>Balisan Privacy Team</strong><br />
                        123 Artisan Way, Ste 500<br />
                        Nashville, TN 37201<br />
                        <a href="mailto:privacy@balisan.com" className="text-primary hover:underline">
                            privacy@balisan.com
                        </a>
                    </address>
                </div>
            </section>
        </ContentLayout>
    );
}
