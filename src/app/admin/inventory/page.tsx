import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inventory",
};

export default function InventoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Inventory</h1>
                    <p className="text-zinc-400 mt-1">Track and adjust stock levels</p>
                </div>
                <button className="px-4 py-2 bg-balisan-amber text-balisan-black font-semibold rounded-lg hover:bg-balisan-amber/90 transition-colors">
                    Bulk Update
                </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                <p className="text-zinc-400">Inventory management table will be implemented here.</p>
                <p className="text-zinc-500 text-sm mt-2">Features: Stock adjustments, low stock alerts, audit trail</p>
            </div>
        </div>
    );
}
