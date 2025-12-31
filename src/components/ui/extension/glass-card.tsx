import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/ui/extension/ShineBorder";

export function GlassCard({
    children,
    className,
    title,
    description,
}: {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "relative w-full rounded-3xl bg-white/80 dark:bg-zinc-900/60 shadow-2xl backdrop-blur-xl",
                className
            )}
        >
            <ShineBorder
                className="rounded-3xl p-8"
                shineColor={["#F5A623", "#B45309", "#FFFFFF"]}
                borderWidth={1.5}
            >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-50 rounded-3xl pointer-events-none" />
                {(title || description) && (
                    <div className="relative z-10 flex flex-col gap-2 mb-8 text-center md:text-left">
                        {title && (
                            <h1 className="text-3xl font-serif font-medium text-foreground tracking-tight">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                    </div>
                )}
                <div className="relative z-10">{children}</div>
            </ShineBorder>
        </motion.div>
    );
}
