"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 10,
    speed = "fast",
    waveOpacity = 0.5,
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
    [key: string]: any;
}) => {
    const noise = createNoise3D();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ntRef = useRef(0);

    const getSpeed = () => {
        switch (speed) {
            case "slow":
                return 0.001;
            case "fast":
                return 0.002;
            default:
                return 0.001;
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let w = (ctx.canvas.width = window.innerWidth);
        let h = (ctx.canvas.height = window.innerHeight);
        ctx.filter = `blur(${blur}px)`;

        const handleResize = () => {
            w = (ctx.canvas.width = window.innerWidth);
            h = (ctx.canvas.height = window.innerHeight);
            ctx.filter = `blur(${blur}px)`;
        };

        window.addEventListener("resize", handleResize);

        const waveColors = colors ?? [
            "#F5A623", // Amber
            "#B45309", // Dark Amber
            "#ffffff", // White
            "#1A1A1A", // Black
            "#333333", // Dark Gray
        ];

        const render = () => {
            ntRef.current += getSpeed();
            ctx.fillStyle = backgroundFill || "black";
            ctx.globalAlpha = waveOpacity || 0.5;
            ctx.fillRect(0, 0, w, h);

            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.lineWidth = waveWidth || 50;
                ctx.strokeStyle = waveColors[i % waveColors.length];
                for (let x = 0; x < w; x += 5) {
                    const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
                    ctx.lineTo(x, y + h * 0.5);
                }
                ctx.stroke();
                ctx.closePath();
            }
            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [
        backgroundFill,
        colors,
        waveOpacity,
        blur,
        speed,
        waveWidth,
        noise // Although noise is created on every render, it's fine as long as we use ntRef
    ]);

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        // Avoid setting state if the value hasn't changed
        const isSafariUserAgent = typeof window !== "undefined" &&
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome");
        
        if (isSafariUserAgent !== isSafari) {
             setIsSafari(isSafariUserAgent);
        }
    }, []);

    return (
        <div
            className={cn(
                "h-screen flex flex-col items-center justify-center",
                containerClassName
            )}
        >
            <canvas
                className="absolute inset-0 z-0 h-full w-full"
                ref={canvasRef}
                id="canvas"
                style={{
                    ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
                }}
            ></canvas>
            <div className={cn("relative z-10", className)} {...props}>
                {children}
            </div>
        </div>
    );
};
