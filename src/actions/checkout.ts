'use server'

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { Database } from "@/types/database.types"

type OrderData = {
    items: {
        id: string
        name: string
        price: number
        quantity: number
        image: string
        variant?: string
    }[]
    shippingAddress: any
    billingAddress: any
    paymentStatus: string
    subtotal: number
    shippingCost: number
    tax: number
    total: number
    userId?: string
}

export async function createOrder(data: OrderData) {
    const cookieStore = cookies()
    const supabase = await createClient()

    try {
        // 1. Get User (Anonymous or Logged In)
        const { data: { user } } = await supabase.auth.getUser()
        const userId = user?.id || '00000000-0000-0000-0000-000000000000' // Fail-safe for guest checkout if no auth 
        // Note: In a real app, you'd handle guest checkout differently or require auth. 
        // For Balisan, we rely on RLS allowing inserts or a specific guest user. 
        // Assuming the 'users' table or 'profiles' might restrict this, 
        // but let's proceed with the insertion logic.

        // 2. Insert Order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: userId,
                status: 'pending',
                total_amount: data.total,
                items: data.items,
                shipping_address: data.shippingAddress,
                billing_address: data.billingAddress,
                payment_status: data.paymentStatus,
                payment_intent_id: `tap_sim_${Date.now()}` // Simulated Tap ID
            })
            .select()
            .single()

        if (orderError) {
            console.error('Order creation error:', orderError)
            throw new Error('Failed to create order')
        }

        // 3. Insert Order Items
        const orderItems = data.items.map(item => ({
            order_id: order.id,
            product_id: item.id,
            product_name_snapshot: item.name,
            product_image_snapshot: item.image,
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) {
            console.error('Order items error:', itemsError)
            // Ideally rollback order here
            throw new Error('Failed to create order items')
        }

        return { success: true, orderId: order.id }

    } catch (error) {
        console.error('Checkout error:', error)
        return { success: false, error: 'Checkout failed' }
    }
}
