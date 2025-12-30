"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight, Home, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BreadcrumbNavigatorProps {
    items: {
        label: string
        href?: string
        options?: { label: string; href: string }[]
    }[]
}

export function BreadcrumbNavigator({ items }: BreadcrumbNavigatorProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8 overflow-x-auto no-scrollbar">
            <Link href="/" className="flex items-center hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />

                    {item.options ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors outline-none font-medium text-foreground">
                                {item.label}
                                <ChevronDown className="h-3 w-3" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="min-w-[150px]">
                                {item.options.map((option) => (
                                    <DropdownMenuItem key={option.href} asChild>
                                        <Link href={option.href}>{option.label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        item.href ? (
                            <Link
                                href={item.href}
                                className={index === items.length - 1 ? "font-medium text-foreground" : "hover:text-primary transition-colors"}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-medium text-foreground">{item.label}</span>
                        )
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}
