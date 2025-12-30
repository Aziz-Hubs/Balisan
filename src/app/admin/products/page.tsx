import { Metadata } from "next";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Products",
};

export default function ProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Products</h1>
                    <p className="text-zinc-400 mt-1">Manage your product catalog</p>
                </div>
                <Link href="/admin/products/new" className="px-4 py-2 bg-balisan-amber text-balisan-black font-semibold rounded-lg hover:bg-balisan-amber/90 transition-colors">
                    Add Product
                </Link>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <ProductsTable />
            </div>
        </div>
    );
}
