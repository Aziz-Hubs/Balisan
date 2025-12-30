/**
 * Age Verification Utility
 * 
 * Manages persistent age verification status for alcohol retail compliance.
 * 
 * Privacy & Compliance:
 * - Does NOT store date of birth (privacy/GDPR)
 * - Stores only verification status and timestamp
 * - Configurable TTL (Time-To-Live): default 30 days
 * - Uses localStorage for cross-session persistence
 */

export interface AgeVerificationData {
    verified: boolean;
    timestamp: string; // ISO 8601 format
}

// Configuration
const STORAGE_KEY = 'balisan-age-verification';
const DEFAULT_TTL_DAYS = 30; // Can be configured: 30-90 days

/**
 * Check if age verification exists and is still valid
 * @returns boolean - true if verified and not expired
 */
export function checkAgeVerification(): boolean {
    if (typeof window === 'undefined') {
        return false; // Server-side, always return false
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            return false;
        }

        const data: AgeVerificationData = JSON.parse(stored);

        if (!data.verified || !data.timestamp) {
            return false;
        }

        // Check if verification has expired
        if (isVerificationExpired(data.timestamp)) {
            clearAgeVerification();
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking age verification:', error);
        clearAgeVerification();
        return false;
    }
}

/**
 * Set age verification status
 * @param verified - boolean indicating if user is verified
 */
export function setAgeVerification(verified: boolean): void {
    if (typeof window === 'undefined') {
        return; // Server-side, do nothing
    }

    try {
        const data: AgeVerificationData = {
            verified,
            timestamp: new Date().toISOString(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error setting age verification:', error);
    }
}

/**
 * Clear age verification from storage
 */
export function clearAgeVerification(): void {
    if (typeof window === 'undefined') {
        return; // Server-side, do nothing
    }

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing age verification:', error);
    }
}

/**
 * Check if verification timestamp has expired
 * @param timestamp - ISO 8601 timestamp string
 * @param ttlDays - Time-to-live in days (default: 30)
 * @returns boolean - true if expired
 */
export function isVerificationExpired(
    timestamp: string,
    ttlDays: number = DEFAULT_TTL_DAYS
): boolean {
    try {
        const verificationDate = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - verificationDate.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        return diffDays >= ttlDays;
    } catch (error) {
        console.error('Error checking verification expiration:', error);
        return true; // If error, consider expired for safety
    }
}

/**
 * Get verification data (for debugging/admin purposes)
 * @returns AgeVerificationData | null
 */
export function getVerificationData(): AgeVerificationData | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error getting verification data:', error);
        return null;
    }
}

/**
 * Get days remaining until verification expires
 * @returns number - days remaining, or 0 if expired/not found
 */
export function getDaysUntilExpiration(ttlDays: number = DEFAULT_TTL_DAYS): number {
    const data = getVerificationData();

    if (!data || !data.timestamp) {
        return 0;
    }

    try {
        const verificationDate = new Date(data.timestamp);
        const now = new Date();
        const diffMs = now.getTime() - verificationDate.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        const remaining = ttlDays - diffDays;

        return Math.max(0, Math.floor(remaining));
    } catch (error) {
        console.error('Error calculating expiration:', error);
        return 0;
    }
}
