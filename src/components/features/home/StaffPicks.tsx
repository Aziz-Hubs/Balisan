import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from '@/components/ui/extension/3d-card';
import { Quote } from 'lucide-react';
import Link from 'next/link';

const staffPicks = [
    {
        id: 'sp1',
        name: 'Handpicked Barrel Rye',
        expert: 'Sarah Jennings',
        role: 'Head Sommelier',
        quote: "A remarkably complex rye with notes of toasted vanilla and dark cherry. Perfect for a classic Manhattan.",
        image: "/bottle.png",
    },
    {
        id: 'sp2',
        name: 'Small Batch Botanical Gin',
        expert: 'Mark Chen',
        role: 'Spirits Curator',
        quote: "The brightest gin I've tasted this year. The lavender notes are delicate but persistent.",
        image: "/bottle.png",
    },
];

export function StaffPicks() {
    return (
        <section className="py-24 bg-background overflow-visible">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Staff Picks</h2>
                        <p className="text-muted-foreground">Expert recommendations from our sommeliers.</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-10">
                        {staffPicks.map((pick) => (
                            <CardContainer key={pick.id} className="inter-var">
                                <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-amber-500/[0.1] dark:bg-[#0c0a09] dark:border-white/[0.2] border-zinc-200 border w-auto sm:w-[30rem] h-auto rounded-xl p-6 transition-all duration-300">
                                    <CardItem
                                        translateZ="50"
                                        className="text-xl font-bold text-card-foreground"
                                    >
                                        {pick.name}
                                    </CardItem>

                                    <CardItem
                                        as="p"
                                        translateZ="60"
                                        className="text-amber-500 text-sm max-w-sm mt-2 font-medium tracking-wide uppercase"
                                    >
                                        {pick.expert} — {pick.role}
                                    </CardItem>

                                    <CardItem translateZ="100" className="w-full mt-4">
                                        <Image
                                            src={pick.image}
                                            height="1000"
                                            width="1000"
                                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                            alt={pick.name}
                                        />
                                    </CardItem>

                                    <CardItem
                                        as="div"
                                        translateZ="40"
                                        className="mt-6 text-muted-foreground italic flex gap-2"
                                    >
                                        <Quote className="h-5 w-5 text-amber-500/50 shrink-0 transform rotate-180" />
                                        <p className="text-sm leading-relaxed">&ldquo;{pick.quote}&rdquo;</p>
                                    </CardItem>

                                    <div className="flex justify-between items-center mt-8">
                                        <CardItem
                                            translateZ={20}
                                            as={Link}
                                            href="/shop"
                                            className="px-4 py-2 rounded-xl text-xs font-normal text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            View Details →
                                        </CardItem>
                                        <CardItem
                                            translateZ={20}
                                            as="button"
                                            className="px-4 py-2 rounded-xl bg-[#0c0a09] border border-white/10 text-white text-xs font-bold hover:bg-balisan-amber hover:text-balisan-black transition-colors"
                                        >
                                            Add to Cart
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
