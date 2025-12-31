"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { differenceInYears } from "date-fns" // I might need to install date-fns or just use native JS date

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/stores/auth"

const formSchema = z.object({
    birthDate: z.string().refine((date) => {
        const today = new Date()
        const birth = new Date(date)
        let age = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        return age >= 21
    }, {
        message: "You must be 21 years or older to enter.",
    }),
})

export function AgeGateModal() {
    const { isAgeVerified, setAgeVerified, checkAgeVerification } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)

    // Use effect to avoid hydration mismatch and only show on client if not verified
    useEffect(() => {
        // Re-check verification status from localStorage (in case it expired)
        checkAgeVerification()

        // Check if verification is expired or missing
        if (!isAgeVerified && !isOpen) {
            setIsOpen(true)
        }
    }, [isAgeVerified, checkAgeVerification, isOpen])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            birthDate: "",
        },
    })

    function onSubmit() {
        setAgeVerified(true)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-center font-display text-2xl">Welcome to Balisan</DialogTitle>
                    <DialogDescription className="text-center">
                        You must be of legal drinking age to visit this site.
                        Please enter your date of birth.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} className="w-full justify-center text-center" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full btn-primary">
                            Enter Site
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
