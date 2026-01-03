import { Skeleton } from "@/components/ui/skeleton"

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-4">
                    {/* Image Skeleton */}
                    <Skeleton className="aspect-[3/4] w-full rounded-[2rem] bg-zinc-100 dark:bg-zinc-800/50" />
                    {/* Content Skeleton */}
                    <div className="space-y-2 px-2">
                        <div className="flex justify-between">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                        <Skeleton className="h-6 w-3/4" />
                        <div className="flex justify-between items-end pt-2">
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-10" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                            <Skeleton className="h-10 w-20 rounded-xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function ProductListSkeleton() {
    return (
        <div className="space-y-4 w-full mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-full h-24 rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 p-2 flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-xl" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                    </div>
                    <div className="pr-4">
                        <Skeleton className="h-8 w-24 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    )
}
