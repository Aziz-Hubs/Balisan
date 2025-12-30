import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center p-6 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-muted-foreground">
                <Search className="h-10 w-10" />
            </div>
            <h2 className="mb-2 text-3xl font-bold font-display">Page Not Found</h2>
            <p className="mb-8 max-w-md text-muted-foreground">
                The page you are looking for doesn't exist or has been moved.
                Try searching or return home to continue browsing.
            </p>
            <div className="flex gap-4">
                <Button asChild variant="default">
                    <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/shop">Browse Shop</Link>
                </Button>
            </div>
        </div>
    )
}
