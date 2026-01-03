'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function DesktopSpotlight() {
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            const isTouch = window.matchMedia('(pointer: coarse)').matches;
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (isTouch || isMobile) {
                setIsVisible(false);
                return true;
            }
            return false;
        };

        // Initial check
        if (checkMobile()) return;

        const handleResize = () => {
            checkMobile();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (checkMobile()) return;
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => {
            if (!checkMobile()) setIsVisible(true);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                left: springX,
                top: springY,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed pointer-events-none z-[9999] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        >
            <div
                className="w-full h-full rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(245, 166, 35, 0.08) 0%, rgba(245, 166, 35, 0) 70%)',
                    filter: 'blur(20px)'
                }}
            />
        </motion.div>
    );
}
