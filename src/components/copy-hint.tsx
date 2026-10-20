import { cn } from '@/utils'

// "터치 한 번으로 번호 복사" 안내 - 레이블 위에 떠서 왼쪽에서 오른쪽으로 써 내려가듯 나타난다
// 색은 레이아웃 루트의 --copy-hint-color 로 바꿀 수 있고, 위치·크기는 className 으로 덮어쓴다
export const CopyHint = ({
    visible,
    className,
}: {
    visible: boolean
    className?: string
}) => (
    <span
        data-visible={visible}
        className={cn(
            'write-in pointer-events-none absolute bottom-[calc(100%+6px)] left-0 whitespace-nowrap text-[12px] font-semibold',
            'text-[color:var(--copy-hint-color,color-mix(in_srgb,var(--parke-accent)_55%,var(--parke-content)))]',
            'transition-opacity duration-400 data-[visible=false]:opacity-0',
            className,
        )}
    >
        터치 한 번으로 번호 복사
    </span>
)
