import { ReactNode } from 'react';
import { BreadcrumbNavigator } from './BreadcrumbNavigator';
import { Container } from '@/components/ui/Container';

interface ContentLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    lastUpdated?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

export function ContentLayout({
    children,
    title,
    subtitle,
    lastUpdated,
    breadcrumbs = [],
}: ContentLayoutProps) {
    return (
        <Container className="py-12 md:py-20">
            <div className="mx-auto max-w-4xl">
                {breadcrumbs.length > 0 && (
                    <BreadcrumbNavigator items={breadcrumbs} />
                )}

                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-xl text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                    {lastUpdated && (
                        <p className="text-sm text-muted-foreground mt-2">
                            Last updated: {lastUpdated}
                        </p>
                    )}
                </header>

                <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
                    {children}
                </div>
            </div>
        </Container>
    );
}
