// Age verification integration (Yoti/Vouched)

import type { ComplianceVerification, DocumentType } from '@/types/admin';

/**
 * Get verification documents and extracted data from provider
 */
export async function getVerificationDocuments(verificationId: string): Promise<{
    success: boolean;
    data?: {
        id: string;
        images: string[];
        extractedData?: {
            name?: string;
            dateOfBirth?: string;
            documentNumber?: string;
            expiryDate?: string;
        };
    };
    error?: string;
}> {
    try {
        // TODO: Fetch from Yoti/Vouched API
        // const client = new YotiClient(process.env.YOTI_CLIENT_ID!, process.env.YOTI_CLIENT_SECRET!);
        // const verification = await client.getVerification(verificationId);

        // For MVP, return mock data
        console.log(`[VERIFICATION STUB] Fetching documents for verification ${verificationId}`);

        return {
            success: true,
            data: {
                id: verificationId,
                images: [
                    '/images/mock/id-front.jpg',
                    '/images/mock/id-back.jpg',
                ],
                extractedData: {
                    name: 'John Doe',
                    dateOfBirth: '1990-05-15',
                    documentNumber: 'DL123456789',
                    expiryDate: '2027-05-15',
                },
            },
        };
    } catch (error) {
        console.error('Verification fetch error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch verification',
        };
    }
}

/**
 * Submit age verification for automated checking
 */
export async function submitForVerification(
    userId: string,
    documentType: DocumentType,
    images: string[] // Base64 or URLs
): Promise<{
    success: boolean;
    verificationId?: string;
    autoApproved?: boolean;
    confidence?: number;
    error?: string;
}> {
    try {
        // TODO: Submit to Yoti/Vouched API

        console.log(`[VERIFICATION STUB] Submitting verification for user ${userId}`);

        return {
            success: true,
            verificationId: `ver_${Date.now()}`,
            autoApproved: false, // Requires manual review
            confidence: 0.85,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Verification submission failed',
        };
    }
}

/**
 * Check automated verification result (for auto-approved cases)
 */
export async function checkVerificationResult(verificationId: string): Promise<{
    status: 'pending' | 'approved' | 'rejected';
    confidence: number;
    ageVerified: boolean;
}> {
    // TODO: Check with Yoti/Vouched API

    return {
        status: 'pending',
        confidence: 0.85,
        ageVerified: false,
    };
}
