export const buttonSize = {
    /* Small: 32 px or 36 px tall */
    sm: {
        base: 'h-8 pl-2 pr-3 gap-1',   // 32 × 8 / 12 / 4 spacing
        icon: 'size-5',                 // 20 px
        text: 'text-sm',
    },
    smPlus: {                         // 36 px version
        base: 'h-9 pl-2 pr-3 gap-1',
        icon: 'size-5',
        text: 'text-sm',
    },
    smSquare: {
        base: 'size-8',
        icon: 'size-5',
        text: '',
    },

    /* Medium: 40 px or 48 px tall */
    md: {
        base: 'h-10 pl-3 pr-4 gap-2',   // 40 × 12 / 16 / 8
        icon: 'size-6',                 // 24 px
        text: 'text-base',
    },
    mdPlus: {
        base: 'h-12 pl-3 pr-4 gap-2',   // 48 px
        icon: 'size-6',
        text: 'text-base',
    },
    mdSquare: {
        base: 'size-10',
        icon: 'size-6',
        text: '',
    },

    /* Large: 52 px or 56 px tall */
    lg: {
        base: 'h-13 pl-5 pr-6 gap-2',   // 52 × 20 / 24 / 8
        icon: 'size-6',
        text: 'text-lg',
    },
    lgPlus: {
        base: 'h-14 pl-5 pr-6 gap-2',   // 56 px
        icon: 'size-6',
        text: 'text-lg',
    },
    lgSquare: {
        base: 'size-13',
        icon: 'size-6',
        text: '',
    }
}
type ButtonSizeMap = typeof buttonSize;
export type ButtonSizeKey = keyof ButtonSizeMap;

export function getStyle(size: ButtonSizeKey) {
  return buttonSize[size]; // <-- ¡Correcto!
}
