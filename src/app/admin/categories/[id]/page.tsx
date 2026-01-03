import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";
import { getMockCategories } from "@/data/mock";

interface CategoryPageProps {
    params: {
        id: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    let category = null;

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("id", params.id)
            .single();

        if (error || !data) throw error;
        category = data;
    } catch (err) {
        console.error("Fetch category error, falling back to mock:", err);
        category = getMockCategories().find((c) => c.id === params.id) || null;
    }

    if (!category) {
        return notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-display font-bold text-white">Edit Category</h1>
                <p className="text-zinc-400 mt-1">Update category details and imagery</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <CategoryForm initialData={category} />
            </div>
        </div>
    );
}
