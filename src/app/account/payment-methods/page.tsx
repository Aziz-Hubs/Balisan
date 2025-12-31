"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock Payment Methods
const paymentMethods = [
    {
        id: "pm-1",
        type: "Visa",
        last4: "4242",
        expiry: "12/26",
        isDefault: true,
    },
    {
        id: "pm-2",
        type: "Mastercard",
        last4: "8888",
        expiry: "08/25",
        isDefault: false,
    },
]

export default function PaymentMethodsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-display">Payment Methods</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your saved payment options.
                    </p>
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Card
                </Button>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
                {paymentMethods.map((method) => (
                    <Card key={method.id} className={method.isDefault ? 'border-amber-500/50' : ''}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-amber-500" />
                                    <CardTitle className="text-base">{method.type}</CardTitle>
                                </div>
                                {method.isDefault && (
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                                        Default
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="font-medium">•••• •••• •••• {method.last4}</p>
                                    <p className="text-muted-foreground">Expires {method.expiry}</p>
                                </div>
                                <div className="flex gap-2">
                                    {!method.isDefault && (
                                        <Button variant="ghost" size="sm">Set as Default</Button>
                                    )}
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
