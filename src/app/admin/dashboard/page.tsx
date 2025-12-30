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

export const metadata: Metadata = {
    title: "Dashboard",
};

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
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-500" />
                        </div>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">Today's Sales</p>
                        <p className="text-2xl font-bold text-white mt-1">
                            ${dashboardMetrics.todaySales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Week's Sales */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-balisan-amber/10 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-balisan-amber" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">This Week</p>
                        <p className="text-2xl font-bold text-white mt-1">
                            ${dashboardMetrics.weekSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Pending Orders */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-blue-500" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">Pending Orders</p>
                        <p className="text-2xl font-bold text-white mt-1">
                            {dashboardMetrics.pendingOrders}
                        </p>
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">Low Stock</p>
                        <p className="text-2xl font-bold text-white mt-1">
                            {dashboardMetrics.lowStockAlerts}
                        </p>
                    </div>
                </div>

                {/* Pending Verifications */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-zinc-400">Pending Verifications</p>
                        <p className="text-2xl font-bold text-white mt-1">
                            {dashboardMetrics.pendingVerifications}
                        </p>
                    </div>
                </div>
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
            </div>
        </div>
    );
}
