"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle2, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Mock Orders
const orders = [
    {
        id: "ORD-7723",
        date: "2024-12-28",
        items: [
            { name: "Macallan 12 Years", quantity: 1, price: 89.00 },
            { name: "Grey Goose Vodka", quantity: 1, price: 65.00 },
        ],
        total: 154.00,
        status: "Processing",
    },
    {
        id: "ORD-7721",
        date: "2024-12-15",
        items: [
            { name: "Patron Silver", quantity: 1, price: 59.50 },
            { name: "Baileys Irish Cream", quantity: 1, price: 30.00 },
        ],
        total: 89.50,
        status: "Delivered",
    },
    {
        id: "ORD-7690",
        date: "2024-11-30",
        items: [
            { name: "Casamigos Reposado", quantity: 1, price: 65.00 },
        ],
        total: 65.00,
        status: "Delivered",
    },
]

const statusConfig: Record<string, { icon: typeof Package; className: string }> = {
    Processing: { icon: Clock, className: "bg-amber-500/10 text-amber-600" },
    Shipped: { icon: Truck, className: "bg-blue-500/10 text-blue-600" },
    Delivered: { icon: CheckCircle2, className: "bg-green-500/10 text-green-600" },
}

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-display">Order History</h1>
                <p className="text-muted-foreground mt-1">
                    View and track all your past orders.
                </p>
            </div>
            <Separator />

            <div className="space-y-4">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-zinc-200 dark:border-white/5 rounded-3xl bg-zinc-50/50 dark:bg-white/5 backdrop-blur-sm">
                        <div className="bg-amber-500/10 p-6 rounded-full mb-6">
                            <Package className="w-12 h-12 text-amber-500" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white mb-2">
                            No orders yet
                        </h3>
                        <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                            Looks like you haven't placed any orders yet. Start building your collection today.
                        </p>
                        <a
                            href="/shop"
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium transition-all hover:scale-105 active:scale-95 shadow-xl"
                        >
                            Start Shopping
                        </a>
                    </div>
                ) : (
                    orders.map((order) => {
                        const config = statusConfig[order.status] || statusConfig.Processing
                        const StatusIcon = config.icon

                        return (
                            <Card key={order.id}>
                                <CardHeader className="pb-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            <CardTitle className="text-base">{order.id}</CardTitle>
                                            <CardDescription>Placed on {order.date}</CardDescription>
                                        </div>
                                        <Badge variant="outline" className={config.className}>
                                            <StatusIcon className="w-3 h-3 mr-1" />
                                            {order.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    {item.quantity}x {item.name}
                                                </span>
                                                <span>${item.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <Separator className="my-2" />
                                        <div className="flex justify-between font-medium">
                                            <span>Total</span>
                                            <span className="text-amber-600">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}
