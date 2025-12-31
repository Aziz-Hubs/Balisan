"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { Product } from "@/types"

interface ProductFAQProps {
    product: Product
}

export function ProductFAQ({ product }: ProductFAQProps) {
    // Dynamic FAQ content based on product category
    const getFAQs = () => {
        const baseFAQs = [
            {
                question: "Is this product authentic?",
                answer: "Absolutely. We source all our products directly from authorized distributors and importers. Every bottle comes with a guarantee of authenticity, and we maintain strict quality control throughout our supply chain."
            },
            {
                question: "How should I store this after opening?",
                answer: `For ${product.category.toLowerCase()}, we recommend storing upright in a cool, dark place away from direct sunlight. Once opened, most spirits will maintain their quality for 1-2 years if properly sealed. Wines should be consumed within 3-5 days of opening.`
            },
            {
                question: "What is the alcohol content?",
                answer: `This product has an ABV (Alcohol by Volume) of ${product.abv}%. Please enjoy responsibly and ensure you meet the legal drinking age in your jurisdiction.`
            },
            {
                question: "Can I return this product?",
                answer: "We accept returns on unopened products within 30 days of purchase. Due to licensing regulations, opened bottles cannot be returned unless there's a quality issue. Please contact our concierge team for any concerns."
            },
            {
                question: "Do you offer gift wrapping?",
                answer: "Yes! We offer premium gift wrapping and personalized gift cards at checkout. Our signature gift boxes are perfect for special occasions and corporate gifting."
            },
            {
                question: "What's the delivery timeframe?",
                answer: "Standard delivery takes 2-5 business days. Express delivery (1-2 days) is available for most locations. Same-day delivery is available in select areas for orders placed before 2 PM."
            }
        ]

        // Add category-specific FAQs
        if (product.category.toLowerCase().includes('whisky') || product.category.toLowerCase().includes('whiskey')) {
            baseFAQs.push({
                question: "Does this whisky have an age statement?",
                answer: product.tags?.find(t => t.includes('Year'))
                    ? `Yes, this is a ${product.tags.find(t => t.includes('Year'))} expression, meaning the youngest whisky in the blend is at least that age.`
                    : "This is a non-age-statement (NAS) whisky. The distillery has chosen to focus on flavor profile rather than age, allowing for a more consistent taste experience."
            })
        }

        if (product.category.toLowerCase() === 'wine') {
            baseFAQs.push({
                question: "What's the ideal serving temperature?",
                answer: "Red wines are best served at 60-68°F (15-20°C), while white wines shine at 45-55°F (7-13°C). Sparkling wines should be well-chilled at 40-50°F (4-10°C)."
            })
        }

        return baseFAQs.slice(0, 6) // Limit to 6 FAQs
    }

    const faqs = getFAQs()

    return (
        <div className="py-12 border-t" id="faq">
            <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-amber-500" />
                Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
