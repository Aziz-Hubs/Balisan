import { CategoryForm } from "@/components/admin/categories/CategoryForm";

export default function NewCategoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-display font-bold text-white">New Category</h1>
                <p className="text-zinc-400 mt-1">Create a new product category</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <CategoryForm />
            </div>
        </div>
    );
}
