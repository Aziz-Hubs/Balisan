import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CheckoutState {
    contactInfo: {
        email: string
        marketingConsent: boolean
    }
    shippingAddress: {
        firstName: string
        lastName: string
        address: string
        apartment?: string
        city: string
        state: string
        zip: string
        country: string
    }
    shippingMethod: {
        id: string
        price: number
    }
    paymentStatus: 'idle' | 'processing' | 'success' | 'error'
    setContactInfo: (info: Partial<CheckoutState['contactInfo']>) => void
    setShippingAddress: (address: Partial<CheckoutState['shippingAddress']>) => void
    setShippingMethod: (method: CheckoutState['shippingMethod']) => void
    setPaymentStatus: (status: CheckoutState['paymentStatus']) => void
    resetCheckout: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set) => ({
            contactInfo: {
                email: '',
                marketingConsent: false,
            },
            shippingAddress: {
                firstName: '',
                lastName: '',
                address: '',
                apartment: '',
                city: '',
                state: '',
                zip: '',
                country: 'JO', // Default to Jordan
            },
            shippingMethod: {
                id: 'standard',
                price: 0,
            },
            paymentStatus: 'idle',
            setContactInfo: (info) =>
                set((state) => ({
                    contactInfo: { ...state.contactInfo, ...info },
                })),
            setShippingAddress: (address) =>
                set((state) => ({
                    shippingAddress: { ...state.shippingAddress, ...address },
                })),
            setShippingMethod: (method) =>
                set(() => ({
                    shippingMethod: method,
                })),
            setPaymentStatus: (status) =>
                set(() => ({
                    paymentStatus: status,
                })),
            resetCheckout: () =>
                set(() => ({
                    contactInfo: { email: '', marketingConsent: false },
                    shippingAddress: {
                        firstName: '', lastName: '', address: '', apartment: '', city: '', state: '', zip: '', country: 'JO'
                    },
                    shippingMethod: { id: 'standard', price: 0 },
                    paymentStatus: 'idle',
                })),
        }),
        {
            name: 'checkout-storage',
        }
    )
)
