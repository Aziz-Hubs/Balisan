import { Metadata } from "next";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Edit Product",
};

export default async function EditProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // TODO: Fetch real data from API/DB
    // For MVP, we'll use a mock fallback or try to fetch from our own API if running
    // But safer to just mock data here for the UI shell.

    const mockProduct = {
        id: id,
        name: "Highland Reserve 12Y",
        description: "**Highland Reserve 12Y** is a premium single malt...",
        price: 54.99,
        stockQuantity: 24,
        inStock: true,
        categoryId: "whiskey",
        sku: "SKU-WH-001",
        brand: "Highland"
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                >
                    <ArrowLeft className="h-6 w-6 text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Edit Product</h1>
                    <p className="text-zinc-400 mt-1">Update product details</p>
                </div>
            </div>

            <ProductForm initialData={mockProduct} />
        </div>
    );
}
