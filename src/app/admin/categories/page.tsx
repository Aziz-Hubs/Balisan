import { Metadata } from "next";
import { CategoriesTable } from "@/components/admin/categories/CategoriesTable";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Categories",
};

export default function AdminCategoriesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Categories</h1>
                    <p className="text-zinc-400 mt-1">Manage product categories and imagery</p>
                </div>
                <Link href="/admin/categories/new" className="px-4 py-2 bg-balisan-amber text-balisan-black font-semibold rounded-lg hover:bg-balisan-amber/90 transition-colors">
                    Add Category
                </Link>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <CategoriesTable />
            </div>
        </div>
    );
}
