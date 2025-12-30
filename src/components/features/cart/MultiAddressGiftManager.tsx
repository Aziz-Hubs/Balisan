"use client"

import * as React from "react"
import { useCartStore } from "@/lib/stores/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Gift, MapPin, Users, Plus, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Recipient {
    id: string
    name: string
    address: string
    items: string[] // CartItem IDs
}

export function MultiAddressGiftManager() {
    const { items } = useCartStore()
    const [recipients, setRecipients] = React.useState<Recipient[]>([])
    const [showManager, setShowManager] = React.useState(false)

    const addRecipient = () => {
        const id = Math.random().toString(36).substr(2, 9)
        setRecipients([...recipients, { id, name: "", address: "", items: [] }])
    }

    const removeRecipient = (id: string) => {
        setRecipients(recipients.filter(r => r.id !== id))
    }

    const updateRecipient = (id: string, field: keyof Recipient, value: any) => {
        setRecipients(recipients.map(r => r.id === id ? { ...r, [field]: value } : r))
    }

    const toggleItemForRecipient = (recipientId: string, itemId: string) => {
        setRecipients(recipients.map(r => {
            if (r.id === recipientId) {
                const hasItem = r.items.includes(itemId)
                return {
                    ...r,
                    items: hasItem ? r.items.filter(id => id !== itemId) : [...r.items, itemId]
                }
            }
            return r
        }))
    }

    if (!showManager) {
        return (
            <div className="border border-dashed border-primary/30 rounded-2xl p-8 bg-primary/5 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Gift className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sending gifts to multiple people?</h3>
                <p className="text-muted-foreground text-sm max-w-sm mb-6">
                    Use our Multi-Address Gifting Manager to split your order and send premium selections to different destinations in one checkout.
                </p>
                <Button onClick={() => setShowManager(true)} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all">
                    Enable Multi-Address Gifting
                </Button>
            </div>
        )
    }

    return (
        <div className="border rounded-2xl overflow-hidden bg-background shadow-sm border-primary/20">
            <div className="p-6 border-b bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h2 className="font-bold">Multi-Address Gifting Manager</h2>
                </div>
                <button onClick={() => setShowManager(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="p-6 space-y-8">
                <div className="grid gap-6">
                    <AnimatePresence>
                        {recipients.map((recipient, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={recipient.id}
                                className="border rounded-xl p-6 bg-muted/20 relative"
                            >
                                <button
                                    onClick={() => removeRecipient(recipient.id)}
                                    className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recipient Name</label>
                                        <Input
                                            value={recipient.name}
                                            onChange={(e) => updateRecipient(recipient.id, "name", e.target.value)}
                                            placeholder="John Doe"
                                            className="bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Shipping Address</label>
                                        <Input
                                            value={recipient.address}
                                            onChange={(e) => updateRecipient(recipient.id, "address", e.target.value)}
                                            placeholder="123 Luxury Ave, CA 90210"
                                            className="bg-background"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Assign Items</label>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => {
                                            const isSelected = recipient.items.includes(item.id)
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => toggleItemForRecipient(recipient.id, item.id)}
                                                    className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-2 transition-all ${isSelected
                                                            ? "bg-primary text-white border-primary shadow-md"
                                                            : "bg-background hover:border-primary/50"
                                                        }`}
                                                >
                                                    <div className="h-6 w-6 rounded overflow-hidden bg-muted">
                                                        <img src={item.image} alt="" className="h-full w-full object-contain" />
                                                    </div>
                                                    <span className="font-medium truncate max-w-[150px]">{item.name}</span>
                                                    {isSelected && <Badge variant="secondary" className="h-4 w-4 p-0 flex items-center justify-center rounded-full bg-white text-primary">✓</Badge>}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <Button variant="outline" onClick={addRecipient} className="h-16 border-dashed border-2 flex items-center gap-2 text-muted-foreground hover:text-primary transition-all">
                        <Plus className="h-5 w-5" />
                        Add Another Recipient
                    </Button>
                </div>
            </div>

            <div className="p-6 bg-muted/30 border-t flex items-center justify-between">
                <p className="text-xs text-muted-foreground italic max-w-sm">
                    Items not assigned to a specific recipient will be shipped to your primary address.
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">{recipients.length} destinations set</span>
                </div>
            </div>
        </div>
    )
}
