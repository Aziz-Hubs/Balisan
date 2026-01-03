"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Category } from "@/types"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().optional(),
    image_url: z.string().url("Must be a valid URL").or(z.literal("")),
    level: z.coerce.number().default(0),
    parent_id: z.string().nullable().optional(),
})

type CategoryFormValues = z.infer<typeof categorySchema>

interface CategoryFormProps {
    initialData?: Category | null
    categories?: Category[]
}

export function CategoryForm({ initialData, categories = [] }: CategoryFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            description: "",
            image_url: "",
            level: 0,
            parent_id: null,
        },
    })

    const onSubmit = async (values: CategoryFormValues) => {
        setIsLoading(true)
        try {
            const url = initialData
                ? `/api/admin/categories/${initialData.id}`
                : '/api/admin/categories'

            const method = initialData ? 'PATCH' : 'POST'

            const response = await fetch(url, {
                method,
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const result = await response.json()

            if (result.success) {
                toast.success(initialData ? "Category updated" : "Category created")
                router.push('/admin/categories')
                router.refresh()
            } else {
                toast.error(result.error?.message || "Something went wrong")
            }
        } catch (error) {
            toast.error("An error occurred")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Category Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="e.g. Rare Whiskey"
                                        className="bg-zinc-900 border-zinc-800 text-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Slug</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="rare-whiskey"
                                        className="bg-zinc-900 border-zinc-800 text-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isLoading}
                                    placeholder="Describe this category..."
                                    className="bg-zinc-900 border-zinc-800 text-white resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Image URL</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="https://images.unsplash.com/..."
                                    className="bg-zinc-900 border-zinc-800 text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Provide a high-quality image URL for the bento grid display.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-end gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        disabled={isLoading}
                        onClick={() => router.push('/admin/categories')}
                        className="text-zinc-400 hover:text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-balisan-amber text-balisan-black hover:bg-balisan-amber/90"
                    >
                        {isLoading ? "Saving..." : (initialData ? "Save Changes" : "Create Category")}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
