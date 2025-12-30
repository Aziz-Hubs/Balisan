"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/admin/DataTable"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { toast } from "sonner"

// Define Product type based on your schema/API
export type Product = {
    id: string
    name: string
    sku: string
    category: string
    brand: string
    price: number
    stockQuantity: number
    inStock: boolean
    updatedAt: string
}

export function ProductsTable() {
    const [data, setData] = React.useState<Product[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [productToDelete, setProductToDelete] = React.useState<Product | null>(null)

    // Fetch data
    const fetchData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/admin/products')
            const result = await response.json()
            if (result.success) {
                setData(result.data)
            } else {
                toast.error("Failed to load products")
            }
        } catch (error) {
            toast.error("Error loading products")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    // Delete handler
    const handleDelete = async () => {
        if (!productToDelete) return

        try {
            const response = await fetch(`/api/admin/products/${productToDelete.id}`, {
                method: 'DELETE',
            })
            const result = await response.json()

            if (result.success) {
                toast.success("Product deleted successfully")
                fetchData() // Refresh data
            } else {
                toast.error("Failed to delete product")
            }
        } catch (error) {
            toast.error("Error deleting product")
            console.error(error)
        }
    }

    const openDeleteDialog = (product: Product) => {
        setProductToDelete(product)
        setIsDeleteDialogOpen(true)
    }

    // Define columns
    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-[2px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "sku",
            header: "SKU",
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "price",
            header: ({ column }) => (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            ),
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "stockQuantity",
            header: "Stock",
            cell: ({ row }) => {
                const stock = parseInt(row.getValue("stockQuantity"))
                return (
                    <div className={`font-medium ${stock < 10 ? "text-red-400" : ""}`}>
                        {stock}
                    </div>
                )
            }
        },
        {
            accessorKey: "inStock",
            header: "Status",
            cell: ({ row }) => {
                const inStock = row.getValue("inStock")
                return (
                    <Badge variant={inStock ? "default" : "destructive"}>
                        {inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const product = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-700">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(product.id)}
                                className="focus:bg-zinc-800 focus:text-white"
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-700" />
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}`} className="flex w-full items-center focus:bg-zinc-800 focus:text-white cursor-pointer px-2 py-1.5">
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => openDeleteDialog(product)}
                                className="text-red-400 focus:text-red-400 focus:bg-red-400/10"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                searchKey="name"
                searchPlaceholder="Filter products..."
                isLoading={isLoading}
                onDelete={(rows) => {
                    // Bulk delete implementation would go here
                    console.log("Delete rows:", rows)
                    alert(`Bulk delete not implemented yet. Selected ${rows.length} items.`)
                }}
            />

            <ConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                title="Delete Product"
                description={`Are you sure you want to delete ${productToDelete?.name}? This action cannot be undone.`}
                confirmText="Delete"
                variant="destructive"
                onConfirm={handleDelete}
                requireConfirmation={true}
            />
        </>
    )
}
