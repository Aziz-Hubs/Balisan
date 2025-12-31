"use client"

import { useAuthStore } from "@/lib/stores/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Award, DollarSign, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock Data
const stats = [
    {
        title: "Active Orders",
        value: "2",
        icon: Package,
        description: "1 shipping, 1 processing",
    },
    {
        title: "Loyalty Points",
        value: "1,250",
        icon: Award,
        description: "Bronze Tier",
    },
    {
        title: "Total Savings",
        value: "$145.00",
        icon: DollarSign,
        description: "Lifestyle member savings",
    },
]

const recentOrders = [
    {
        id: "ORD-7723",
        date: "2024-12-28",
        items: "Macallan 12 Years, Grey Goose Vodka",
        total: "$154.00",
        status: "Processing",
    },
    {
        id: "ORD-7721",
        date: "2024-12-15",
        items: "Patron Silver, Baileys Irish Cream",
        total: "$89.50",
        status: "Delivered",
    },
    {
        id: "ORD-7690",
        date: "2024-11-30",
        items: "Casamigos Reposado",
        total: "$65.00",
        status: "Delivered",
    },
]

export default function AccountDashboardPage() {
    const { user } = useAuthStore()

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                    Welcome back, {user?.name?.split(" ")[0] || "Guest"}
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage your orders, rewards, and account preferences.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold font-display">Recent Activity</h2>
                    <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-500/10" asChild>
                        <Link href="/account/orders">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm overflow-hidden">
                    {recentOrders.map((order, i) => (
                        <div key={order.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${i !== recentOrders.length - 1 ? 'border-b border-border/50' : ''}`}>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{order.id}</span>
                                    <Badge variant={order.status === 'Processing' ? 'secondary' : 'outline'} className={order.status === 'Processing' ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20' : ''}>
                                        {order.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{order.items}</p>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-6 min-w-[200px]">
                                <div className="flex items-center text-sm text-muted-foreground gap-1">
                                    <Clock className="w-3 h-3" />
                                    {order.date}
                                </div>
                                <div className="font-medium text-right">
                                    {order.total}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
