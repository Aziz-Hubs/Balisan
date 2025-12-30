declare module '@google/model-viewer' {
    export interface ModelViewerElement extends HTMLElement {
        src: string;
        poster?: string;
        alt: string;
        shadowIntensity: string;
        cameraControls: boolean;
        autoRotate: boolean;
        rotationPerSecond: string;
        interactionPrompt: string;
        dismissPoster: () => void;
    }
}

declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src?: string;
            poster?: string;
            alt?: string;
            'shadow-intensity'?: string;
            'camera-controls'?: boolean;
            'auto-rotate'?: boolean;
            'rotation-per-second'?: string;
            'interaction-prompt'?: string;
        };
    }
}
