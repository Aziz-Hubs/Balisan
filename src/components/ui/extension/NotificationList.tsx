"use client"

import React, { useEffect, useState } from "react"
import { AnimatedList } from "@/components/ui/animated-list"
import { cn } from "@/lib/utils"
import { X, CheckCircle2, AlertCircle, Info, Loader2 } from "lucide-react"

interface Notification {
    id: string
    title: string
    description?: string
    type: "success" | "error" | "info" | "warning" | "loading"
}

const NotificationItem = ({ notification, onRemove }: { notification: Notification, onRemove: (id: string) => void }) => {
    const icons = {
        success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
        warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
        loading: <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />,
    }

    const bgs = {
        success: "bg-green-500/10 border-green-500/20",
        error: "bg-red-500/10 border-red-500/20",
        info: "bg-blue-500/10 border-blue-500/20",
        warning: "bg-amber-500/10 border-amber-500/20",
        loading: "bg-amber-500/10 border-amber-500/20",
    }

    return (
        <div className={cn(
            "flex items-start gap-4 p-4 rounded-xl border backdrop-blur-md shadow-lg min-w-[300px] max-w-md pointer-events-auto",
            bgs[notification.type]
        )}>
            <div className="mt-0.5">{icons[notification.type]}</div>
            <div className="flex-1 space-y-1">
                <p className="text-sm font-bold text-foreground leading-none">{notification.title}</p>
                {notification.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed">{notification.description}</p>
                )}
            </div>
            <button
                onClick={() => onRemove(notification.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}

export function NotificationList() {
    const [notifications, setNotifications] = useState<Notification[]>([])

    // Expose a global way to add notifications for demo purposes
    // In a real app, this would be a context or a store (Zustand)
    useEffect(() => {
        const handleAdd = (event: any) => {
            const { notification } = event.detail
            setNotifications(prev => [notification, ...prev])

            if (notification.type !== "loading") {
                setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== notification.id))
                }, 5000)
            }
        }

        window.addEventListener("add-notification", handleAdd)
        return () => window.removeEventListener("add-notification", handleAdd)
    }, [])

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    return (
        <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
            <AnimatedList delay={0.1}>
                {notifications.map((n) => (
                    <NotificationItem key={n.id} notification={n} onRemove={removeNotification} />
                ))}
            </AnimatedList>
        </div>
    )
}

// Helper to trigger notifications
export const notify = (title: string, description?: string, type: Notification["type"] = "info") => {
    const id = Math.random().toString(36).substring(2, 9)
    window.dispatchEvent(new CustomEvent("add-notification", {
        detail: { notification: { id, title, description, type } }
    }))
    return id
}
