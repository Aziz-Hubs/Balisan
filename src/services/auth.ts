import { createClient } from "@/lib/supabase/client"
import { AuthError } from "@supabase/supabase-js"
import { config } from "@/lib/config"

const supabase = createClient()

export async function signInWithPhone(phone: string, metadata?: object) {
    try {
        const { error } = await supabase.auth.signInWithOtp({
            phone,
            options: {
                data: metadata
            }
        })
        if (error) throw error
        return { error: null }
    } catch (error) {
        console.error("Auth Error:", error)
        return { error: error as AuthError }
    }
}

export async function verifyPhoneOtp(phone: string, token: string) {
    try {
        const { data, error } = await supabase.auth.verifyOtp({
            phone,
            token,
            type: 'sms',
        })
        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error("Auth Verify Error:", error)
        return { data: null, error: error as AuthError }
    }
}

export async function signInWithEmail(email: string, password: string) {
    try {
        if (config.useMockData) {
            const mockUsers = ["admin@balisan.com", "user@balisan.com", "guest@balisan.com"]
            if (mockUsers.includes(email) && password === "12345678") {
                // Set a mock cookie for the server-side services to pick up
                document.cookie = `balisan_mock_user=${email}; path=/; max-age=3600; SameSite=Lax`
                if (email === "admin@balisan.com") {
                    document.cookie = `user_role=SUPER_ADMIN; path=/; max-age=3600; SameSite=Lax`
                } else {
                    document.cookie = `user_role=customer; path=/; max-age=3600; SameSite=Lax`
                }
                return { data: { user: { email } }, error: null }
            }
            throw new Error("Invalid mock credentials")
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
        return { data, error: null }
    } catch (error: any) {
        console.error("Auth Error:", error)
        return { data: null, error: error as AuthError }
    }
}

export async function updateUser(attributes: any) {
    try {
        const { data, error } = await supabase.auth.updateUser(attributes)
        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error("User Update Error:", error)
        return { data: null, error: error as AuthError }
    }
}
