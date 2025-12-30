"use client"

import * as React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void | Promise<void>
    variant?: "default" | "destructive"
    requireConfirmation?: boolean
    confirmationText?: string
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    variant = "default",
    requireConfirmation = false,
    confirmationText = "DELETE",
}: ConfirmDialogProps) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const [error, setError] = React.useState("")

    const handleConfirm = async () => {
        if (requireConfirmation && inputValue !== confirmationText) {
            setError(`Please type "${confirmationText}" to confirm`)
            return
        }

        setIsLoading(true)
        setError("")

        try {
            await onConfirm()
            onOpenChange(false)
            setInputValue("")
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!isLoading) {
            onOpenChange(newOpen)
            if (!newOpen) {
                setInputValue("")
                setError("")
            }
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {requireConfirmation && (
                    <div className="mt-4">
                        <label htmlFor="confirmation-input" className="text-sm text-zinc-400">
                            Type <span className="font-mono font-semibold text-white">{confirmationText}</span> to confirm:
                        </label>
                        <input
                            id="confirmation-input"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="mt-2 w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-balisan-amber"
                            placeholder={confirmationText}
                            disabled={isLoading}
                        />
                        {error && (
                            <p className="mt-2 text-sm text-red-500">{error}</p>
                        )}
                    </div>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={isLoading || (requireConfirmation && inputValue !== confirmationText)}
                        className={
                            variant === "destructive"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-balisan-amber text-balisan-black hover:bg-balisan-amber/90"
                        }
                    >
                        {isLoading ? "Processing..." : confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
