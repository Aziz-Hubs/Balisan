import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Orders",
};

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Orders</h1>
                    <p className="text-zinc-400 mt-1">Process and manage customer orders</p>
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                <p className="text-zinc-400">Order management queue will be implemented here.</p>
                <p className="text-zinc-500 text-sm mt-2">Features: Status filters, timeline view, fulfillment actions</p>
            </div>
        </div>
    );
}
