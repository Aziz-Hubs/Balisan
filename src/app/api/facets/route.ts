import { NextResponse } from 'next/server'
import { getFacets } from '@/services'

export async function GET() {
    try {
        const facets = await getFacets()
        return NextResponse.json({ success: true, ...facets })
    } catch (error) {
        console.error('Facets error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch facets' },
            { status: 500 }
        )
    }
}
