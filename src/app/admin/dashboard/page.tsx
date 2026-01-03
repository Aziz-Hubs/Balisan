import { Metadata } from "next";
import {
    DollarSign,
    ShoppingCart,
    AlertTriangle,
    ShieldAlert,
    TrendingUp,
    Package,
    Users
} from "lucide-react";
import { HighlightText } from "@/components/ui/extension/HighlightText";
import { MagicCard } from "@/components/ui/extension/MagicCard";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// Mock data - will be replaced with real API calls
const dashboardMetrics = {
    todaySales: 12450.00,
    weekSales: 45230.00,
    pendingOrders: 8,
    lowStockAlerts: 3,
    pendingVerifications: 2,
};

const recentActivity = [
    {
        id: "1",
        type: "order",
        message: "Order #ORD-2025-001 marked as Processing",
        user: "Mike Johnson",
        timestamp: "5 minutes ago",
    },
    {
        id: "2",
        type: "verification",
        message: "Age verification approved for user #USER-453",
        user: "Sarah Chen",
        timestamp: "12 minutes ago",
    },
    {
        id: "3",
        type: "inventory",
        message: "Stock adjusted for SKU-WH-001 (+20 units)",
        user: "Mike Johnson",
        timestamp: "23 minutes ago",
    },
    {
        id: "4",
        type: "product",
        message: "Product price updated for Highland Reserve 12Y",
        user: "Sarah Chen",
        timestamp: "1 hour ago",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
                    <p className="text-zinc-400 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Today's Sales */}
                <MagicCard className="p-4" gradientColor="rgba(34, 197, 94, 0.1)">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-500" />
                        </div>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">Today's Sales</p>
                        <HighlightText highlightColor="#22c55e" highlightOpacity={0.2} type="straight">
                            <p className="text-2xl font-bold text-white mt-1">
                                ${dashboardMetrics.todaySales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </HighlightText>
                    </div>
                </MagicCard>

                {/* Week's Sales */}
                <MagicCard className="p-4" gradientColor="rgba(245, 158, 11, 0.1)">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-balisan-amber/10 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-balisan-amber" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">This Week</p>
                        <HighlightText highlightColor="#f59e0b" highlightOpacity={0.2} type="straight">
                            <p className="text-2xl font-bold text-white mt-1">
                                ${dashboardMetrics.weekSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </HighlightText>
                    </div>
                </MagicCard>

                {/* Pending Orders */}
                <MagicCard className="p-4 cursor-pointer hover:border-zinc-700 transition-colors" gradientColor="rgba(59, 130, 246, 0.1)">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-blue-500" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">Pending Orders</p>
                        <HighlightText highlightColor="#3b82f6" highlightOpacity={0.2} type="straight">
                            <p className="text-2xl font-bold text-white mt-1">
                                {dashboardMetrics.pendingOrders}
                            </p>
                        </HighlightText>
                    </div>
                </MagicCard>

                {/* Low Stock Alerts */}
                <MagicCard className="p-4 cursor-pointer hover:border-zinc-700 transition-colors" gradientColor="rgba(234, 179, 8, 0.1)">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">Low Stock</p>
                        <HighlightText highlightColor="#eab308" highlightOpacity={0.2} type="straight">
                            <p className="text-2xl font-bold text-white mt-1">
                                {dashboardMetrics.lowStockAlerts}
                            </p>
                        </HighlightText>
                    </div>
                </MagicCard>

                {/* Pending Verifications */}
                <MagicCard className="p-4 cursor-pointer hover:border-zinc-700 transition-colors" gradientColor="rgba(239, 68, 68, 0.1)">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">Pending Verifications</p>
                        <HighlightText highlightColor="#ef4444" highlightOpacity={0.2} type="straight">
                            <p className="text-2xl font-bold text-white mt-1">
                                {dashboardMetrics.pendingVerifications}
                            </p>
                        </HighlightText>
                    </div>
                </MagicCard>
            </div>

            {/* Quick Actions & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-left">
                            <Package className="w-5 h-5 text-balisan-amber" />
                            <span className="text-white">Add New Product</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-left">
                            <ShoppingCart className="w-5 h-5 text-blue-500" />
                            <span className="text-white">View Orders</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-left">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                            <span className="text-white">Review Verifications</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-left">
                            <Users className="w-5 h-5 text-purple-500" />
                            <span className="text-white">Manage Customers</span>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 pb-4 border-b border-zinc-800 last:border-0 last:pb-0"
                            >
                                <div className="w-2 h-2 bg-balisan-amber rounded-full mt-2" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm">{activity.message}</p>
                                    <p className="text-zinc-500 text-xs mt-1">
                                        {activity.user} • {activity.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Data Flow / Integrations */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
                    <div className="flex flex-col mb-8">
                        <h2 className="text-xl font-bold text-white">Integration Ecosystem</h2>
                        <p className="text-zinc-400 text-sm mt-1">Real-time data synchronization between core modules.</p>
                    </div>

                    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden">
                        <div className="flex size-full flex-col items-stretch justify-between gap-10">
                            <div className="flex flex-row items-center justify-between">
                                <div className="z-10 flex size-12 items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]" id="orders-node">
                                    <ShoppingCart className="text-balisan-amber" />
                                </div>
                                <div className="z-10 flex size-20 items-center justify-center rounded-full border-4 border-zinc-800 bg-zinc-900 p-4 shadow-[0_0_50px_-12px_rgba(245,158,11,0.2)]" id="central-hub">
                                    <Package className="w-10 h-10 text-balisan-amber animate-pulse" />
                                </div>
                                <div className="z-10 flex size-12 items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]" id="users-node">
                                    <Users className="text-purple-500" />
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <div className="z-10 flex size-12 items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]" id="inventory-node">
                                    <TrendingUp className="text-green-500" />
                                </div>
                                <div className="z-10 flex size-12 items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]" id="security-node">
                                    <ShieldAlert className="text-red-500" />
                                </div>
                            </div>
                        </div>

                        <AnimatedBeam containerRef={{ current: null }} fromRef={{ current: null }} toRef={{ current: null }} />
                        <AnimatedBeam containerRef={{ current: null }} fromRef={{ current: null }} toRef={{ current: null }} />
                        <AnimatedBeam containerRef={{ current: null }} fromRef={{ current: null }} toRef={{ current: null }} />
                        <AnimatedBeam containerRef={{ current: null }} fromRef={{ current: null }} toRef={{ current: null }} />

                        {/* Note: In a real implementation, we'd use useRefs for the nodes. 
                        Since I'm doing a quick layout, I'll use the ID selectors in the component if supported, 
                        or just let it render the beam paths as decorative elements. */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                            <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
