"use client"

import * as React from "react"
import { useCartStore } from "@/lib/stores/cart"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle, CheckCircle2, Download, PackageOpen } from "lucide-react"
import { PRODUCTS } from "@/lib/mock-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function BulkOrderUpload() {
    const { addItem } = useCartStore()
    const [isDragging, setIsDragging] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [result, setResult] = React.useState<{ success: number; errors: string[] } | null>(null)

    const handleFileUpload = (files: FileList | null) => {
        if (!files || files.length === 0) return

        setIsProcessing(true)
        setProgress(0)
        setResult(null)

        // Mock CSV parsing
        const reader = new FileReader()
        reader.onload = async (e) => {
            const content = e.target?.result as string
            const lines = content.split('\n').filter(line => line.trim() !== '')

            let successCount = 0
            const errors: string[] = []

            for (let i = 1; i < lines.length; i++) {
                const [sku, quantity] = lines[i].split(',').map(s => s.trim())
                const product = PRODUCTS.find(p => p.id === sku || p.slug === sku)

                if (product) {
                    const qty = parseInt(quantity) || 1
                    for (let q = 0; q < qty; q++) {
                        addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image || '/bottle.png',
                            variant: "Standard"
                        })
                    }
                    successCount++
                } else {
                    errors.push(`Row ${i + 1}: SKU/Slug "${sku}" not found.`)
                }

                setProgress(Math.round((i / (lines.length - 1)) * 100))
                await new Promise(resolve => setTimeout(resolve, 100)) // Simulation
            }

            setResult({ success: successCount, errors })
            setIsProcessing(false)
        }
        reader.readAsText(files[0])
    }

    return (
        <div className="border rounded-2xl p-8 bg-background shadow-sm space-y-6">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <PackageOpen className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Bulk Order Upload</h3>
                    <p className="text-sm text-muted-foreground italic">Add multiple items using a CSV file (for events or large orders).</p>
                </div>
            </div>

            {!isProcessing && !result && (
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileUpload(e.dataTransfer.files); }}
                    className={`border-2 border-dashed rounded-xl py-12 flex flex-col items-center justify-center transition-all ${isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-muted hover:border-primary/50"
                        }`}
                >
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium">Drag and drop your CSV file here or</p>
                    <Button
                        variant="link"
                        className="text-primary font-bold"
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        Browse Files
                    </Button>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e.target.files)}
                    />
                    <div className="mt-8 flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> SKU, Quantity</span>
                        <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> UTF-8 Only</span>
                    </div>
                </div>
            )}

            {isProcessing && (
                <div className="space-y-4 py-8">
                    <div className="flex justify-between text-sm">
                        <span>Processing your order...</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            )}

            {result && (
                <div className="space-y-6">
                    <Alert variant={result.errors.length > 0 ? "default" : "default"} className="bg-green-50 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Process Complete</AlertTitle>
                        <AlertDescription className="text-green-700">
                            Successfully added {result.success} different product lines to your cart.
                        </AlertDescription>
                    </Alert>

                    {result.errors.length > 0 && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Issues Found</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc list-inside mt-2 text-xs">
                                    {result.errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setResult(null)} className="flex-1">Upload Another</Button>
                        <Button className="flex-1" variant="secondary" onClick={() => setResult(null)}>Done</Button>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-dashed">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-2">
                    <Download className="h-3 w-3" />
                    Download CSV Template
                </Button>
                <div className="flex gap-2">
                    <Badge variant="outline">.CSV</Badge>
                    <Badge variant="outline">Max 5MB</Badge>
                </div>
            </div>
        </div>
    )
}
