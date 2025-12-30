"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Plus, Trash, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { productUpdateSchema } from "@/lib/schemas/admin"

// Extend schema for form usage if needed
const productFormSchema = productUpdateSchema.extend({
    // Add any form-specific fields here (e.g. file objects for upload)
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface ProductFormProps {
    initialData?: ProductFormValues & { id: string }
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    const defaultValues: Partial<ProductFormValues> = initialData || {
        name: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        category: "",
        inStock: true,
    }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues,
    })

    async function onSubmit(data: ProductFormValues) {
        setIsLoading(true)
        try {
            const url = initialData
                ? `/api/admin/products/${initialData.id}`
                : `/api/admin/products`

            const method = initialData ? "PATCH" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Failed to save product")

            toast.success(initialData ? "Product updated" : "Product created")
            router.push("/admin/products")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {/* Main Info */}
                    <Card className="col-span-2 bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                            <CardDescription>Basic information about the product</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product name" {...field} className="bg-zinc-800 border-zinc-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Product description..."
                                                className="min-h-[120px] bg-zinc-800 border-zinc-700"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Supports Markdown for rich text formatting.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Pricing & Inventory */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle>Inventory & Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={e => field.onChange(parseFloat(e.target.value))}
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="stockQuantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="inStock"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-zinc-700 p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Available</FormLabel>
                                            <FormDescription>
                                                Product is available for purchase
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Media - Placeholder for Image Uploader */}
                    <Card className="col-span-full bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                            <CardDescription>Product images and 3D models</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-zinc-700 rounded-lg p-12 text-center hover:bg-zinc-800/50 transition-colors cursor-pointer">
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="h-10 w-10 text-zinc-500" />
                                    <p className="text-zinc-400 font-medium">Drag & drop images here</p>
                                    <p className="text-zinc-600 text-sm">or click to browse</p>
                                </div>
                            </div>
                            {/* Image list would go here */}
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="bg-balisan-amber text-balisan-black hover:bg-balisan-amber/90">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Save Changes" : "Create Product"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
