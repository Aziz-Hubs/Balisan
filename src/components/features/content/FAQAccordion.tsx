'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: "How do you verify age?",
        answer: "We use a multi-step verification process. This includes an age gate on our website, identity verification during checkout, and a mandatory ID check by the courier upon delivery. All customers must be 21 or older."
    },
    {
        question: "Where do you ship?",
        answer: "Currently, we ship to most locations within the United States where local laws permit alcohol delivery. You can check eligibility by entering your zip code on any product page."
    },
    {
        question: "What is your return policy?",
        answer: "Due to federal and state laws, we cannot accept returns on alcoholic beverages except in cases where the product is damaged or defective upon arrival. Please contact our support team within 48 hours if such an issue occurs."
    },
    {
        question: "Can I schedule my delivery?",
        answer: "Yes! During checkout, you can select a delivery date and a two-hour time slot that works best for you. Please ensure someone 21+ is available to sign for the package."
    },
    {
        question: "Do you offer gift wrapping?",
        answer: "Absolutely. We offer premium gift packaging and personalized notes for all spirits in our collection. You can add these options on the cart page."
    }
];

export function FAQAccordion() {
    return (
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
