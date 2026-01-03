/**
 * User Service
 * 
 * Type-safe data fetching for user profiles and orders from Supabase.
 */

import { createClient } from '@/lib/supabase/server'
import { config } from '@/lib/config'
import { USERS, ORDERS } from '@/data/mock'
// Return types matching the schema
export interface UserProfile {
    id: string
    email: string
    fullName: string | null
    avatarUrl: string | null
    role: 'admin' | 'customer'
    createdAt: string
}

export interface UserOrder {
    id: string
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    subtotal: number
    tax: number
    shipping: number
    total: number
    paymentMethod: string | null
    trackingNumber: string | null
    createdAt: string
    updatedAt: string
}

export interface UserAddress {
    id: string
    label: string
    name: string
    line1: string
    line2: string | null
    city: string
    state: string
    zip: string
    country: string
    phone: string | null
    isDefault: boolean
}

export async function getUserProfile(): Promise<UserProfile | null> {
    try {
        if (config.useMockData) throw new Error('Mock mode enabled')
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return null

        // Fetch profile data from public.profiles
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (error || !data) {
            // Return minimal profile from auth if no extra profile exists
            return {
                id: user.id,
                email: user.email!,
                fullName: null,
                avatarUrl: null,
                role: 'customer',
                createdAt: user.created_at
            }
        }

        // Use type assertion since DB types may not be fully generated
        const profile = data as {
            id: string
            full_name: string | null
            avatar_url: string | null
            role: 'admin' | 'customer'
            created_at: string
        }

        return {
            id: profile.id,
            email: user.email!,
            fullName: profile.full_name,
            avatarUrl: profile.avatar_url,
            role: profile.role,
            createdAt: profile.created_at
        }
    } catch (err) {
        if (config.useMockData) {
            const cookieStore = await require('next/headers').cookies()
            const mockEmail = cookieStore.get('balisan_mock_user')?.value
            const mockUser = USERS.find(u => u.email === mockEmail) || USERS[0];

            return {
                id: mockUser.id,
                email: mockUser.email,
                fullName: mockUser.full_name,
                avatarUrl: mockUser.avatar_url || null,
                role: mockUser.role as 'admin' | 'customer',
                createdAt: mockUser.created_at
            }
        }
        console.error('getUserProfile error:', err)
        return null
    }
}

export async function getUserOrders(): Promise<UserOrder[]> {
    try {
        if (config.useMockData) throw new Error('Mock mode enabled')
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return []

        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error || !data) return []

        return (data as any[]).map((row) => ({
            id: row.id,
            status: row.status,
            subtotal: row.subtotal,
            tax: row.tax,
            shipping: row.shipping,
            total: row.total,
            paymentMethod: row.payment_method,
            trackingNumber: row.tracking_number,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        }))
    } catch (err) {
        if (config.useMockData) {
            const cookieStore = await require('next/headers').cookies()
            const mockEmail = cookieStore.get('balisan_mock_user')?.value
            const mockUser = USERS.find(u => u.email === mockEmail) || USERS[0]

            return ORDERS.filter(o => o.user_id === mockUser.id).map(row => ({
                id: row.id,
                status: row.status as any,
                subtotal: row.subtotal,
                tax: row.tax_amount,
                shipping: row.shipping_amount,
                total: row.total_amount,
                paymentMethod: row.payment_method,
                trackingNumber: row.tracking_number,
                createdAt: row.created_at,
                updatedAt: row.updated_at
            })) as UserOrder[]
        }
        console.error('getUserOrders error:', err)
        return []
    }
}

export async function getUserAddresses(): Promise<UserAddress[]> {
    try {
        if (config.useMockData) throw new Error('Mock mode enabled')
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return []

        const { data, error } = await supabase
            .from('addresses')
            .select('*')
            .eq('user_id', user.id)
            .order('is_default', { ascending: false })

        if (error || !data) return []

        return (data as any[]).map((row) => ({
            id: row.id,
            label: row.label,
            name: row.name,
            line1: row.line1,
            line2: row.line2,
            city: row.city,
            state: row.state,
            zip: row.zip,
            country: row.country,
            phone: row.phone,
            isDefault: row.is_default
        }))
    } catch (err) {
        if (config.useMockData) {
            const cookieStore = await require('next/headers').cookies()
            const mockEmail = cookieStore.get('balisan_mock_user')?.value
            const mockUser = USERS.find(u => u.email === mockEmail) || USERS[0]

            return (mockUser.addresses || []).map(row => ({
                id: row.id,
                label: row.label,
                name: row.name,
                line1: row.line1,
                line2: row.line2 || null,
                city: row.city,
                state: row.state,
                zip: row.postal_code,
                country: row.country,
                phone: row.phone || null,
                isDefault: row.is_default
            })) as UserAddress[]
        }
        console.error('getUserAddresses error:', err)
        return []
    }
}
