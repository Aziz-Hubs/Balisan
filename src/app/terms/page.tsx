import { Metadata } from 'next';
import { ContentLayout } from '@/components/layouts/ContentLayout';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Read the Terms of Service for using Balisan. By purchasing curated spirits, you agree to these terms including age requirements.',
};

export default function TermsPage() {
    return (
        <ContentLayout
            title="Terms of Service"
            subtitle="Please read these terms carefully before using our services."
            lastUpdated="December 31, 2025"
            breadcrumbs={[{ label: 'Terms of Service' }]}
        >
            <section className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-3">1. Age Requirement</h2>
                    <p>
                        <strong>You must be at least 21 years of age to use this website and purchase products.</strong>{' '}
                        By accessing or using Balisan, you represent and warrant that you are of legal drinking age
                        in your jurisdiction. We reserve the right to request proof of age at any time and to refuse
                        service to anyone who cannot verify their age.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">2. Acceptance of Terms</h2>
                    <p>
                        By accessing or using our website, mobile applications, or any other services provided by
                        Balisan (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use our Services.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">3. Alcohol Sales & Delivery</h2>
                    <p>
                        Alcoholic beverages may only be sold and delivered to persons who are at least 21 years old.
                        A valid government-issued photo ID will be required at the time of delivery.
                        Our delivery personnel are trained to verify age and are authorized to refuse delivery
                        if proper identification cannot be provided.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>You must be present to receive alcohol deliveries</li>
                        <li>We cannot leave packages unattended or with minors</li>
                        <li>Intoxicated individuals will be refused delivery</li>
                        <li>Some states have restrictions on alcohol deliveries</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">4. Account Registration</h2>
                    <p>
                        To make purchases, you may need to create an account. You are responsible for maintaining
                        the confidentiality of your account credentials and for all activities that occur under your account.
                        You agree to provide accurate, current, and complete information during registration.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">5. Product Information</h2>
                    <p>
                        We strive to provide accurate descriptions, pricing, and imagery for all curated spirits.
                        However, we do not warrant that product descriptions, images, or other content are accurate,
                        complete, reliable, current, or error-free. Colors and vintages may vary.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">6. Pricing & Payment</h2>
                    <p>
                        All prices are in US Dollars and are subject to change without notice. We reserve the right
                        to refuse or cancel orders if pricing errors occur. Payment must be made at the time of order.
                        We accept major credit cards and other payment methods as displayed at checkout.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
                    <p>
                        All content on Balisan, including text, graphics, logos, images, and software, is the property
                        of Balisan or its content suppliers and is protected by intellectual property laws.
                        You may not reproduce, distribute, or create derivative works without our express permission.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
                    <p>
                        Balisan shall not be liable for any indirect, incidental, special, consequential, or punitive
                        damages resulting from your use of or inability to use the Services. Our total liability shall
                        not exceed the amount you paid for the products that are the subject of the claim.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">9. Responsible Drinking</h2>
                    <p>
                        Balisan promotes responsible consumption of alcoholic beverages. Please drink responsibly.
                        Never drink and drive. If you or someone you know has a drinking problem, please contact the
                        Substance Abuse and Mental Health Services Administration (SAMHSA) at 1-800-662-4357.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of the State of Tennessee,
                        without regard to its conflict of law provisions. Any disputes shall be resolved in the courts
                        located in Davidson County, Tennessee.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">11. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms at any time. Changes will be effective immediately
                        upon posting to our website. Your continued use of the Services after changes constitutes
                        acceptance of the modified Terms.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-3">12. Contact Information</h2>
                    <p>
                        For questions about these Terms, please contact us at:
                    </p>
                    <address className="not-italic mt-3">
                        <strong>Balisan Legal Department</strong><br />
                        123 Artisan Way, Ste 500<br />
                        Nashville, TN 37201<br />
                        <a href="mailto:legal@balisan.com" className="text-primary hover:underline">
                            legal@balisan.com
                        </a>
                    </address>
                </div>
            </section>
        </ContentLayout>
    );
}
