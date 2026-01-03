import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Meteors } from '@/components/ui/extension/Meteors'
import { ElectricText } from '@/components/ui/extension/ElectricText'
import ShimmerButton from '@/components/ui/extension/ShimmerButton'

export default function NotFound() {
    return (
        <div className="relative flex h-[calc(100vh-200px)] flex-col items-center justify-center p-6 text-center overflow-hidden">
            <Meteors number={30} />
            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20 backdrop-blur-sm border border-white/10 text-muted-foreground shadow-xl">
                    <Search className="h-10 w-10 text-amber-500" />
                </div>

                <h2 className="mb-4 text-4xl font-bold font-display">
                    <ElectricText>Page Not Found</ElectricText>
                </h2>

                <p className="mb-10 max-w-md text-lg text-muted-foreground">
                    The vintage you are looking for seems to be out of stock or moved to the cellar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <ShimmerButton className="h-12 px-8 rounded-xl" shimmerColor="#ffffff">
                        <Link href="/" className="relative z-10 font-bold">Back to Home</Link>
                    </ShimmerButton>

                    <Button asChild variant="outline" className="h-12 px-8 rounded-xl border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Link href="/shop">Browse Shop</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
