import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderTimeline } from './OrderTimeline'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

// Assume we pass the full order detail object mock
import type { OrderDetail as OrderDetailType } from '@/lib/mock-data'

export function OrderDetail({ order }: { order: OrderDetailType }) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Order Items</CardTitle>
                            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="uppercase">
                                {order.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {order.products.map((item) => (
                                <div key={item.id} className="flex items-start gap-4">
                                    <div className="relative h-16 w-16 rounded overflow-hidden bg-secondary/20 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between font-medium pt-2">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OrderTimeline timeline={order.timeline} />
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Shipping Address</h4>
                            <p className="text-sm">
                                {order.shippingAddress.name}<br />
                                {order.shippingAddress.line1}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                            </p>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Payment Method</h4>
                            <p className="text-sm">{order.paymentMethod}</p>
                        </div>
                        {order.trackingNumber && (
                            <>
                                <Separator />
                                <div>
                                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Tracking Number</h4>
                                    <p className="text-sm font-mono">{order.trackingNumber}</p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
