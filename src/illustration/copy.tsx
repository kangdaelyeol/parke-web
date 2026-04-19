import type { IllustrationProps } from '.'

export const Copy = ({ styles = {}, size, color }: IllustrationProps) => {
    return (
        <svg
            width={size || '16'}
            height={size || '16'}
            stroke={color || 'currentColor'}
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            {...styles}
        >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    )
}
