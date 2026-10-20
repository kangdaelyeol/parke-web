import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/utils'

// 로딩이 끝나면 스켈레톤은 흐려지며 사라지고, 같은 자리에서 내용이 선명해진다
// 둘을 같은 칸에 겹쳐 두기 때문에 전환 중에도 레이아웃이 흔들리지 않는다
export const Swap = ({
    loading,
    skeleton,
    children,
    delayMs = 0,
    className,
}: PropsWithChildren<{
    loading: boolean
    skeleton: ReactNode
    delayMs?: number
    className?: string
}>) => (
    <div
        className={cn('swap grid w-full', className)}
        data-loading={loading}
        style={{ '--d': `${delayMs}ms` } as CSSProperties}
    >
        <div className="swap-skeleton" aria-hidden>
            {skeleton}
        </div>
        {!loading && <div className="swap-content">{children}</div>}
    </div>
)
