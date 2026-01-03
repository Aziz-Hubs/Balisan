"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2, ImageIcon } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"

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
import { Category } from "@/types"

export function CategoriesTable() {
    const [data, setData] = React.useState<Category[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [categoryToDelete, setCategoryToDelete] = React.useState<Category | null>(null)

    const fetchData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/admin/categories')
            const result = await response.json()
            if (result.success) {
                setData(result.data)
            } else {
                toast.error("Failed to load categories")
            }
        } catch (error) {
            toast.error("Error loading categories")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleDelete = async () => {
        if (!categoryToDelete) return

        try {
            const response = await fetch(`/api/admin/categories/${categoryToDelete.id}`, {
                method: 'DELETE',
            })
            const result = await response.json()

            if (result.success) {
                toast.success("Category deleted successfully")
                fetchData()
            } else {
                toast.error("Failed to delete category")
            }
        } catch (error) {
            toast.error("Error deleting category")
            console.error(error)
        }
    }

    const openDeleteDialog = (category: Category) => {
        setCategoryToDelete(category)
        setIsDeleteDialogOpen(true)
    }

    const columns: ColumnDef<Category>[] = [
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
            accessorKey: "image_url",
            header: "Image",
            cell: ({ row }) => {
                const imageUrl = row.getValue("image_url") as string
                return (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={row.original.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-500">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
        {
            accessorKey: "created_at",
            header: "Created",
            cell: ({ row }) => format(new Date(row.getValue("created_at")), "MMM dd, yyyy"),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const category = row.original

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
                                onClick={() => navigator.clipboard.writeText(category.id)}
                                className="focus:bg-zinc-800 focus:text-white"
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-700" />
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/categories/${category.id}`} className="flex w-full items-center focus:bg-zinc-800 focus:text-white cursor-pointer px-2 py-1.5">
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => openDeleteDialog(category)}
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
                searchPlaceholder="Filter categories..."
                isLoading={isLoading}
            />

            <ConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                title="Delete Category"
                description={`Are you sure you want to delete ${categoryToDelete?.name}? This action cannot be undone.`}
                confirmText="Delete"
                variant="destructive"
                onConfirm={handleDelete}
                requireConfirmation={true}
            />
        </>
    )
}
