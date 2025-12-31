"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Plus, Home, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock Addresses
const addresses = [
    {
        id: "addr-1",
        type: "Home",
        name: "John Doe",
        line1: "123 Sunset Boulevard",
        line2: "Apt 4B",
        city: "Los Angeles",
        state: "CA",
        zip: "90028",
        isDefault: true,
    },
    {
        id: "addr-2",
        type: "Work",
        name: "John Doe",
        line1: "456 Corporate Ave",
        line2: "Suite 100",
        city: "Beverly Hills",
        state: "CA",
        zip: "90210",
        isDefault: false,
    },
]

export default function AddressesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-display">Saved Addresses</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your delivery addresses.
                    </p>
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                </Button>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
                {addresses.map((address) => (
                    <Card key={address.id} className={address.isDefault ? 'border-amber-500/50' : ''}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {address.type === 'Home' ? (
                                        <Home className="w-4 h-4 text-amber-500" />
                                    ) : (
                                        <Building className="w-4 h-4 text-amber-500" />
                                    )}
                                    <CardTitle className="text-base">{address.type}</CardTitle>
                                </div>
                                {address.isDefault && (
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                                        Default
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                            <p className="font-medium text-foreground">{address.name}</p>
                            <p>{address.line1}</p>
                            {address.line2 && <p>{address.line2}</p>}
                            <p>{address.city}, {address.state} {address.zip}</p>
                            <div className="flex gap-2 pt-3">
                                <Button variant="outline" size="sm">Edit</Button>
                                {!address.isDefault && (
                                    <Button variant="ghost" size="sm">Set as Default</Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
