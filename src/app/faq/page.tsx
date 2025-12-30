import { Metadata } from 'next';
import { ContentLayout } from '@/components/layouts/ContentLayout';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about Balisan orders, shipping, age verification, returns, and our curated spirits collection.',
};

const faqCategories = [
    {
        category: 'Orders & Payment',
        faqs: [
            {
                question: 'How do I place an order?',
                answer: 'Browse our curated collection, add items to your cart, and proceed to checkout. You\'ll need to create an account and verify your age (21+) to complete your purchase.',
            },
            {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), Apple Pay, Google Pay, and PayPal.',
            },
            {
                question: 'Can I modify or cancel my order?',
                answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, please contact support@balisan.com and we\'ll do our best to accommodate your request before shipping.',
            },
            {
                question: 'Is my payment information secure?',
                answer: 'Absolutely. We use industry-standard SSL encryption and never store your full credit card details. All payments are processed through secure, PCI-compliant payment processors.',
            },
        ],
    },
    {
        category: 'Shipping & Delivery',
        faqs: [
            {
                question: 'What are your delivery hours?',
                answer: 'Carrier delivery typically occurs between 9:00 AM and 8:00 PM local time, Monday through Saturday. Sunday delivery may be available in select areas.',
            },
            {
                question: 'How long does shipping take?',
                answer: 'Shipping times vary by location: Southeast US (1-2 days), Northeast & Midwest (2-3 days), West Coast (4-5 days), Alaska & Hawaii (5-7 days).',
            },
            {
                question: 'Do you offer free shipping?',
                answer: 'Yes! We offer free standard shipping on all orders over $150. Expedited shipping options are available at checkout for an additional fee.',
            },
            {
                question: 'Can I track my order?',
                answer: 'Yes, once your order ships, you\'ll receive an email with tracking information. You can also log into your account to view order status anytime.',
            },
        ],
    },
    {
        category: 'Age Verification',
        faqs: [
            {
                question: 'Do I need to show ID at delivery?',
                answer: 'Yes, a valid government-issued photo ID showing you are 21 or older is required for all alcohol deliveries. The carrier will verify your ID before releasing the package.',
            },
            {
                question: 'What happens if I\'m not home?',
                answer: 'The carrier will leave a notice and attempt redelivery. After multiple failed attempts, the package may be held at a local carrier facility for pickup, or returned to us.',
            },
            {
                question: 'Can someone else sign for my package?',
                answer: 'Yes, as long as they are 21 years or older and present a valid ID. The person signing must be at the delivery address.',
            },
        ],
    },
    {
        category: 'Returns & Refunds',
        faqs: [
            {
                question: 'What is your return policy?',
                answer: 'Unopened bottles in original packaging may be returned within 14 days for a full refund. Due to safety and legal regulations, we cannot accept returns on opened products.',
            },
            {
                question: 'What if my order arrives damaged?',
                answer: 'If your order arrives damaged, take photos and email support@balisan.com within 48 hours. We\'ll ship a replacement at no cost.',
            },
            {
                question: 'How long do refunds take?',
                answer: 'Once we receive and inspect your return, refunds are processed within 5-7 business days. Your bank may take additional time to post the credit.',
            },
        ],
    },
    {
        category: 'Products',
        faqs: [
            {
                question: 'How do you select your spirits?',
                answer: 'Our team of experts visits distilleries, meets the makers, and personally evaluates each spirit. Only those that meet our standards for quality, craftsmanship, and story make it to our collection.',
            },
            {
                question: 'Do you offer gift wrapping?',
                answer: 'Yes, we offer premium gift wrapping and personalized notes for most orders. You can select this option in your cart before checkout.',
            },
            {
                question: 'Are your products authentic?',
                answer: 'Absolutely. We source all products directly from distilleries or authorized distributors. Every bottle is guaranteed authentic.',
            },
            {
                question: 'Do you have limited edition releases?',
                answer: 'Yes! We regularly feature limited edition and allocated bottles. Sign up for our newsletter to be notified of exclusive releases.',
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <ContentLayout
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about Balisan and our curated spirits."
            breadcrumbs={[{ label: 'FAQ' }]}
        >
            <section className="space-y-10">
                {faqCategories.map((category) => (
                    <div key={category.category}>
                        <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                        <Accordion type="single" collapsible className="w-full not-prose">
                            {category.faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`${category.category}-${index}`}>
                                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}

                <div className="bg-muted p-6 rounded-xl mt-8 not-prose">
                    <h3 className="font-semibold mb-2">Still Have Questions?</h3>
                    <p className="text-sm text-muted-foreground">
                        Our customer care team is here to help. Reach out at{' '}
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
