import { Metadata } from "next";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Add Product",
};

export default function NewProductPage() {
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
                    <h1 className="text-3xl font-display font-bold text-white">Add Product</h1>
                    <p className="text-zinc-400 mt-1">Create a new product for your catalog</p>
                </div>
            </div>

            <ProductForm />
        </div>
    );
}
