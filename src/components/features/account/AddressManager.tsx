"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Pencil, X, Save } from "lucide-react"
import { mockAddresses } from "@/lib/mock-data"
import { useState } from "react"
import type { Address } from "@/lib/mock-data"
import { Checkbox } from "@/components/ui/checkbox"

export function AddressManager() {
    const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
    const [isAdding, setIsAdding] = useState(false)

    // Simple form state
    const [newAddress, setNewAddress] = useState<Partial<Address>>({
        label: 'Home',
        isDefault: false
    })

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this address?')) {
            setAddresses(addresses.filter(a => a.id !== id))
        }
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        const address: Address = {
            id: `ADDR-NEW-${Date.now()}`,
            label: newAddress.label || 'Home',
            name: newAddress.name || '',
            line1: newAddress.line1 || '',
            city: newAddress.city || '',
            state: newAddress.state || '',
            zip: newAddress.zip || '',
            isDefault: newAddress.isDefault || false
        }
        setAddresses([...addresses, address])
        setIsAdding(false)
        setNewAddress({ label: 'Home', isDefault: false })
    }

    if (isAdding) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Add New Address</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsAdding(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input required
                                value={newAddress.name}
                                onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Address Line 1</label>
                            <Input required
                                value={newAddress.line1}
                                onChange={e => setNewAddress({ ...newAddress, line1: e.target.value })}
                                placeholder="123 Street Name"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">City</label>
                                <Input required
                                    value={newAddress.city}
                                    onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">State</label>
                                <Input required
                                    value={newAddress.state}
                                    onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Zip Code</label>
                                <Input required
                                    value={newAddress.zip}
                                    onChange={e => setNewAddress({ ...newAddress, zip: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Label (e.g. Home, Work)</label>
                                <Input
                                    value={newAddress.label}
                                    onChange={e => setNewAddress({ ...newAddress, label: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="default"
                                checked={newAddress.isDefault}
                                onCheckedChange={(c) => setNewAddress({ ...newAddress, isDefault: !!c })}
                            />
                            <label htmlFor="default" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Set as default address
                            </label>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save Address</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium hidden">Saved Addresses</h2>
                <Button size="sm" onClick={() => setIsAdding(true)} className="ml-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {addresses.map((addr) => (
                    <Card key={addr.id}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-medium flex items-center gap-2">
                                    {addr.label}
                                    {addr.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={() => handleDelete(addr.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground">{addr.name}</p>
                            <p>{addr.line1}</p>
                            {addr.line2 && <p>{addr.line2}</p>}
                            <p>{addr.city}, {addr.state} {addr.zip}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
