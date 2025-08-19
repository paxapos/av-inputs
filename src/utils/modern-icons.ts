/**
 * Modern SVG Icons with Glassmorphism design
 * Minimalist and beautiful icons for the face detection component
 */

export const ModernIcons = {
  // Play/Start icon
  play: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="playGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00ff87;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0066ff;stop-opacity:1" />
        </linearGradient>
        <filter id="playGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.504.864l11.282-6.86a1 1 0 0 0 0-1.728L9.504 4.276A1 1 0 0 0 8 5.14z"
            fill="url(#playGradient)"
            filter="url(#playGlow)"
            stroke="rgba(255,255,255,0.3)"
            stroke-width="0.5"/>
    </svg>
  `,

  // Stop icon
  stop: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff4757;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ff3838;stop-opacity:1" />
        </linearGradient>
        <filter id="stopGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="6" y="6" width="12" height="12" rx="2"
            fill="url(#stopGradient)"
            filter="url(#stopGlow)"
            stroke="rgba(255,255,255,0.3)"
            stroke-width="0.5"/>
    </svg>
  `,

  // Flip/Rotate camera icon
  flip: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
        <filter id="flipGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M16 4h2a2 2 0 0 1 2 2v4m0 2v4a2 2 0 0 1-2 2h-4m-4 0H6a2 2 0 0 1-2-2v-4m0-2V6a2 2 0 0 1 2-2h4"
            stroke="url(#flipGradient)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#flipGlow)"/>
      <path d="m15 10-4 4 6 6-4-4"
            stroke="url(#flipGradient)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#flipGlow)"/>
    </svg>
  `,

  // Search/Detect icon
  search: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
        </linearGradient>
        <filter id="searchGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="11" cy="11" r="8"
              stroke="url(#searchGradient)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="url(#searchGlow)"
              fill="rgba(255,255,255,0.1)"/>
      <path d="m21 21-4.35-4.35"
            stroke="url(#searchGradient)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#searchGlow)"/>
    </svg>
  `,

  // Mode toggle icon (interval/manual)
  mode: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="modeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
        </linearGradient>
        <filter id="modeGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="12" cy="12" r="3"
              stroke="url(#modeGradient)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="url(#modeGlow)"
              fill="rgba(255,255,255,0.1)"/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
            stroke="url(#modeGradient)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#modeGlow)"/>
    </svg>
  `,

  // Camera icon
  camera: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cameraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#a8edea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fed6e3;stop-opacity:1" />
        </linearGradient>
        <filter id="cameraGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
            stroke="url(#cameraGradient)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#cameraGlow)"
            fill="rgba(255,255,255,0.1)"/>
      <circle cx="12" cy="13" r="4"
              stroke="url(#cameraGradient)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="url(#cameraGlow)"/>
    </svg>
  `,

  // Lightning/Optimized icon
  lightning: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ffeaa7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fab1a0;stop-opacity:1" />
        </linearGradient>
        <filter id="lightningGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            fill="url(#lightningGradient)"
            filter="url(#lightningGlow)"
            stroke="rgba(255,255,255,0.3)"
            stroke-width="0.5"/>
    </svg>
  `,

  // Warning/Error icon
  warning: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff7675;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fd79a8;stop-opacity:1" />
        </linearGradient>
        <filter id="warningGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            stroke="url(#warningGradient)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#warningGlow)"
            fill="rgba(255,255,255,0.1)"/>
      <line x1="12" y1="9" x2="12" y2="13"
            stroke="url(#warningGradient)"
            stroke-width="2"
            stroke-linecap="round"
            filter="url(#warningGlow)"/>
      <circle cx="12" cy="17" r="1"
              fill="url(#warningGradient)"
              filter="url(#warningGlow)"/>
    </svg>
  `
};

export const IconComponent = ({ name, size = 24, className = '' }: { name: keyof typeof ModernIcons, size?: number, className?: string }) => {
  const iconSvg = ModernIcons[name];

  return `
    <div class="modern-icon ${className}" style="width: ${size}px; height: ${size}px; display: inline-flex; align-items: center; justify-content: center;">
      ${iconSvg}
    </div>
  `;
};
