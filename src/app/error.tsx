'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service like Sentry
        console.error(error)
    }, [error])

    return (
        <div className="container mx-auto flex flex-1 flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-10 w-10" />
            </div>
            <h2 className="mb-2 text-2xl font-bold font-display">Something went wrong!</h2>
            <p className="mb-8 max-w-md text-muted-foreground">
                We apologize for the inconvenience. An unexpected error has occurred.
                Our team has been notified and is working on a fix.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="default">
                    Try again
                </Button>
                <Button onClick={() => window.location.href = '/'} variant="outline">
                    Go back home
                </Button>
            </div>
        </div>
    )
}
