import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Customers",
};

export default function CustomersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Customers</h1>
                    <p className="text-zinc-400 mt-1">Manage customer accounts and history</p>
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                <p className="text-zinc-400">Customer management will be implemented here.</p>
                <p className="text-zinc-500 text-sm mt-2">Features: Profile view, order history, verification status</p>
            </div>
        </div>
    );
}
