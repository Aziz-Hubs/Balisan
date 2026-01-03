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
import { HoldToConfirm } from "@/components/ui/hold-toconfirm"
import { Folder, FolderContent } from "@/components/ui/folder"

export function AddressManager() {
    const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
    const [isAdding, setIsAdding] = useState(false)

    // Simple form state
    const [newAddress, setNewAddress] = useState<Partial<Address>>({
        label: 'Home',
        is_default: false
    })

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter(a => a.id !== id))
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
            postal_code: newAddress.postal_code || '',
            is_default: newAddress.is_default || false
        }
        setAddresses([...addresses, address])
        setIsAdding(false)
        setNewAddress({ label: 'Home', is_default: false })
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
                                <label className="text-sm font-medium">postal_code</label>
                                <Input required
                                    value={newAddress.postal_code}
                                    onChange={e => setNewAddress({ ...newAddress, postal_code: e.target.value })}
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
                                checked={newAddress.is_default}
                                onCheckedChange={(c) => setNewAddress({ ...newAddress, is_default: !!c })}
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
                                    {addr.is_default && <Badge variant="secondary" className="text-xs">Default</Badge>}
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <HoldToConfirm
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onConfirm={() => handleDelete(addr.id)}
                                        duration={1500}
                                        fillClassName="bg-destructive/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </HoldToConfirm>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground">{addr.name}</p>
                            <p>{addr.line1}</p>
                            {addr.line2 && <p>{addr.line2}</p>}
                            <p>{addr.city}, {addr.state} {addr.postal_code}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Import/Export Zone */}
            <div className="pt-8 border-t border-border">
                <h3 className="text-sm font-medium mb-6">Backup & Sync</h3>
                <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                    <Folder color="#f59e0b" tabColor="#d97706" size="xs">
                        <FolderContent className="bg-zinc-900 border-zinc-800">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xs font-bold text-white uppercase italic tracking-tighter">Export Addresses</span>
                                <Button size="sm" variant="outline" className="h-7 text-[10px] uppercase font-bold tracking-widest bg-zinc-800 border-zinc-700 hover:bg-balisan-amber hover:text-black">
                                    Download .JSON
                                </Button>
                            </div>
                        </FolderContent>
                    </Folder>

                    <Folder color="#3b82f6" tabColor="#2563eb" size="xs">
                        <FolderContent className="bg-zinc-900 border-zinc-800">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xs font-bold text-white uppercase italic tracking-tighter">Sync Cloud</span>
                                <Button size="sm" variant="outline" className="h-7 text-[10px] uppercase font-bold tracking-widest bg-zinc-800 border-zinc-700 hover:bg-balisan-amber hover:text-black">
                                    Push to Account
                                </Button>
                            </div>
                        </FolderContent>
                    </Folder>
                </div>
            </div>
        </div>
    )
}
