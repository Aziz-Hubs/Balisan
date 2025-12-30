import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineProps {
    timeline: {
        status: string
        date: string
        completed: boolean
    }[]
}

export function OrderTimeline({ timeline }: TimelineProps) {
    return (
        <div className="relative pl-8 space-y-8 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-muted">
            {timeline.map((step, index) => (
                <div key={index} className="relative">
                    <div className={cn(
                        "absolute -left-[29px] flex h-8 w-8 items-center justify-center rounded-full border bg-background ring-4 ring-background",
                        step.completed || (typeof step.completed === 'string') // Handling case where it might be non-boolean in mock
                            ? "border-primary text-primary"
                            : "border-muted-foreground text-muted-foreground"
                    )}>
                        {step.completed ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className={cn("font-medium", step.completed ? "text-foreground" : "text-muted-foreground")}>
                            {step.status}
                        </span>
                        <span className="text-xs text-muted-foreground">{step.date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
