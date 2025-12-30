"use client"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { GlassCard } from "@/components/ui/extension/glass-card"
import { ShimmerButton } from "@/components/ui/extension/shimmer-button"

export default function PreferencesPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="space-y-6">
                <GlassCard
                    title="Settings"
                    description="Manage your notification preferences."
                    className="bg-black/40"
                >
                    <div className="space-y-6 mt-6">
                        <div className="flex items-center justify-between space-x-2">
                            <div className="flex flex-col space-y-1">
                                <span className="font-medium text-sm text-zinc-200">Email Notifications</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive emails about your order status.</span>
                            </div>
                            <Switch id="email-notifications" defaultChecked className="data-[state=checked]:bg-balisan-amber" />
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex items-center justify-between space-x-2">
                            <div className="flex flex-col space-y-1">
                                <span className="font-medium text-sm text-zinc-200">Marketing Emails</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive emails about new products and sales.</span>
                            </div>
                            <Switch id="marketing-emails" className="data-[state=checked]:bg-balisan-amber" />
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex items-center justify-between space-x-2">
                            <div className="flex flex-col space-y-1">
                                <span className="font-medium text-sm text-zinc-200">SMS Notifications</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive delivery updates via SMS.</span>
                            </div>
                            <Switch id="sms-notifications" defaultChecked className="data-[state=checked]:bg-balisan-amber" />
                        </div>
                        <div className="flex justify-end pt-4">
                            <ShimmerButton className="bg-balisan-amber text-black hover:scale-105">
                                Save Preferences
                            </ShimmerButton>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    )
}
