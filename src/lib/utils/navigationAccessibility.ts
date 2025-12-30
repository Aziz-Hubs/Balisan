import { useEffect, useCallback } from 'react'

/**
 * Hook to handle Escape key press
 * @param callback Function to call when Escape is pressed
 */
export function useEscapeKey(callback: () => void) {
    const handleEscape = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                callback()
            }
        },
        [callback]
    )

    useEffect(() => {
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [handleEscape])
}

/**
 * Trap focus within an element
 * @param element Element to trap focus within
 * @returns Cleanup function
 */
export function trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault()
                lastElement?.focus()
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault()
                firstElement?.focus()
            }
        }
    }

    element.addEventListener('keydown', handleTabKey)

    // Focus first element
    firstElement?.focus()

    return () => {
        element.removeEventListener('keydown', handleTabKey)
    }
}

/**
 * Announce navigation changes to screen readers
 * @param message Message to announce
 */
export function announceNavigation(message: string): void {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
        document.body.removeChild(announcement)
    }, 1000)
}
