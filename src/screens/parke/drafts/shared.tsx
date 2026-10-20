// 임시 시안 공용 - 시안 확정 후 삭제
import './shared.css'
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AppLogo from '@/images/app-logo.png'
import { useParkeContext } from '@/contexts'
import { cn } from '@/utils'

export const Mark = ({ className }: { className?: string }) => (
    <img
        src={AppLogo}
        alt="Parke"
        className={className}
        style={{ filter: 'var(--parke-logo-filter)' }}
    />
)

export const Check = ({
    size,
    className,
}: {
    size: number
    className?: string
}) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

export const Screen = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => (
    <div className="fixed inset-0 overflow-y-auto bg-surface text-content font-notokr">
        <div
            className={cn(
                'draft-root relative mx-auto flex min-h-full max-w-[440px] flex-col px-6 pb-[max(20px,env(safe-area-inset-bottom))]',
                className,
            )}
        >
            {children}
        </div>
    </div>
)

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
        className={cn('draft-swap grid w-full', className)}
        data-loading={loading}
        style={{ '--d': `${delayMs}ms` } as CSSProperties}
    >
        <div className="draft-swap-skeleton" aria-hidden>
            {skeleton}
        </div>
        {!loading && <div className="draft-swap-content">{children}</div>}
    </div>
)

export const DraftError = () => {
    const { error, retry } = useParkeContext()

    return (
        <div className="flex flex-col items-start">
            <div className="text-[length:calc(22px*var(--parke-scale))] font-bold">
                {error}
            </div>
            <div className="mt-2 text-[length:calc(15px*var(--parke-scale))] text-muted">
                네트워크 상태를 확인한 뒤 다시 시도해주세요.
            </div>
            <button
                type="button"
                onClick={retry}
                className="mt-6 cursor-pointer rounded-button border border-line px-5 py-2.5 text-[length:calc(15px*var(--parke-scale))] font-medium active:bg-line"
            >
                다시 시도
            </button>
        </div>
    )
}

const VERSIONS = [
    { key: null, label: '현재' },
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
    { key: 'c', label: 'C' },
]

export const DraftSwitcher = () => {
    const [searchParams] = useSearchParams()
    const current = searchParams.get('v')
    const activeIndex = Math.max(
        0,
        VERSIONS.findIndex(({ key }) => key === current),
    )

    return (
        <nav className="fixed right-2 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1 rounded-full bg-black/50 p-1 font-intertight text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <span
                aria-hidden
                className="absolute left-1 top-1 size-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ transform: `translateY(${activeIndex * 36}px)` }}
            />
            {VERSIONS.map(({ key, label }, index) => {
                const params = new URLSearchParams(searchParams)
                if (key) params.set('v', key)
                else params.delete('v')

                return (
                    <Link
                        key={label}
                        to={{ search: params.toString() }}
                        replace
                        className={cn(
                            'relative grid size-8 place-items-center rounded-full transition-[color,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-85 active:duration-100',
                            index === activeIndex
                                ? 'text-black'
                                : 'text-white/70 hover:text-white',
                        )}
                    >
                        {label}
                    </Link>
                )
            })}
        </nav>
    )
}
