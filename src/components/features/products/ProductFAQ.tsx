"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, ChevronDown } from "lucide-react"
import { Product } from "@/types"
import { cn } from "@/lib/utils"

interface ProductFAQProps {
    product: Product
}

interface FAQItem {
    question: string
    answer: string
}

export function ProductFAQ({ product }: ProductFAQProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    // Dynamic FAQ content based on product category
    const getFAQs = (): FAQItem[] => {
        const categoryName = product.categories?.name || "product"
        const baseFAQs: FAQItem[] = [
            {
                question: "Is this product authentic?",
                answer: "Absolutely. We source all our products directly from authorized distributors and importers. Every bottle comes with a guarantee of authenticity, and we maintain strict quality control throughout our supply chain."
            },
            {
                question: "How should I store this after opening?",
                answer: `For ${categoryName.toLowerCase()}, we recommend storing upright in a cool, dark place away from direct sunlight. Once opened, most spirits will maintain their quality for 1-2 years if properly sealed. Wines should be consumed within 3-5 days of opening.`
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

        return baseFAQs.slice(0, 5)
    }

    const faqs = getFAQs()

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="py-12 border-t" id="faq">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
                Frequently Asked Questions
            </h2>

            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={false}
                        className="border rounded-xl overflow-hidden bg-card"
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className={cn(
                                "w-full flex items-center justify-between p-4 text-left transition-colors",
                                "hover:bg-secondary/50",
                                openIndex === index && "bg-secondary/30"
                            )}
                        >
                            <span className="font-medium text-sm md:text-base pr-4">{faq.question}</span>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="flex-shrink-0"
                            >
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
