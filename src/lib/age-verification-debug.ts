/**
 * Age Verification Testing & Debugging Utilities
 * 
 * Use these functions in the browser console to test age verification behavior
 */

import {
    checkAgeVerification,
    setAgeVerification,
    clearAgeVerification,
    getVerificationData,
    getDaysUntilExpiration,
    isVerificationExpired,
} from './age-verification'

/**
 * Debug: Print current verification status
 */
export function debugAgeVerification() {
    const data = getVerificationData()
    const isValid = checkAgeVerification()
    const daysRemaining = getDaysUntilExpiration()

    console.group('🔒 Age Verification Status')
    console.log('Valid:', isValid)
    console.log('Days Remaining:', daysRemaining)
    console.log('Raw Data:', data)
    console.groupEnd()

    return { isValid, daysRemaining, data }
}

/**
 * Test: Simulate verification expiring in X days
 * @param daysAgo - Number of days in the past to set verification
 */
export function simulateAgeVerification(daysAgo: number = 0) {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - daysAgo)

    localStorage.setItem(
        'balisan-age-verification',
        JSON.stringify({
            verified: true,
            timestamp: pastDate.toISOString(),
        })
    )

    console.log(`✅ Simulated verification from ${daysAgo} days ago`)
    debugAgeVerification()
}

/**
 * Test: Simulate expired verification (31+ days old)
 */
export function simulateExpiredVerification() {
    simulateAgeVerification(31)
    console.log('⚠️ Verification should be expired')
}

/**
 * Test: Check if verification will expire soon
 */
export function checkExpirationWarning(warningDays: number = 7) {
    const daysRemaining = getDaysUntilExpiration()

    if (daysRemaining === 0) {
        console.log('❌ Verification expired or not found')
        return false
    } else if (daysRemaining <= warningDays) {
        console.log(`⚠️ Verification expires in ${daysRemaining} days`)
        return true
    } else {
        console.log(`✅ Verification valid for ${daysRemaining} more days`)
        return false
    }
}

/**
 * Test: Reset verification to trigger modal
 */
export function resetVerification() {
    clearAgeVerification()
    console.log('♻️ Verification cleared - modal should appear on refresh')
}

/**
 * Show all test commands
 */
export function showTestCommands() {
    console.group('🧪 Age Verification Test Commands')
    console.log('debugAgeVerification() - Show current status')
    console.log('simulateAgeVerification(daysAgo) - Simulate verification from X days ago')
    console.log('simulateExpiredVerification() - Simulate 31-day old verification')
    console.log('checkExpirationWarning(warningDays) - Check if expiring soon')
    console.log('resetVerification() - Clear verification to test modal')
    console.groupEnd()
}

// Auto-expose to window in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    (window as any).ageVerificationDebug = {
        debug: debugAgeVerification,
        simulate: simulateAgeVerification,
        simulateExpired: simulateExpiredVerification,
        checkWarning: checkExpirationWarning,
        reset: resetVerification,
        help: showTestCommands,
    }

    console.log('🔧 Age Verification Debug Tools loaded. Type: ageVerificationDebug.help()')
}
