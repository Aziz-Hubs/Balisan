import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compliance",
};

export default function CompliancePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Compliance & Verification</h1>
                    <p className="text-zinc-400 mt-1">Review age verifications and audit logs</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Pending Verifications</h2>
                    <p className="text-zinc-400 text-center py-8">Verification queue will be implemented here.</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Audit Logs</h2>
                    <p className="text-zinc-400 text-center py-8">Audit log search will be implemented here.</p>
                </div>
            </div>
        </div>
    );
}
