// 임시 시안 공용 - 시안 확정 후 삭제
import './shared.css'
import type { PropsWithChildren } from 'react'
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

// 하단 버튼 위 "복사되었어요" 알림 - 모양은 레이아웃마다 className 으로 정한다
// circle: 강조색 동그라미 안에 체크 / plain: 체크만 (색은 --copy-hint-color)
export const CopiedToast = ({
    copied,
    icon = 'circle',
    className,
}: {
    copied: boolean
    icon?: 'circle' | 'plain'
    className?: string
}) => (
    <>
        <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[calc(100%+14px)] flex justify-center"
        >
            <div
                data-visible={copied}
                className={cn(
                    'flex items-center gap-2 text-[14px] font-semibold',
                    'translate-y-2.5 scale-95 opacity-0 transition-[opacity,translate,scale] duration-450 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                    'data-[visible=true]:translate-y-0 data-[visible=true]:scale-100 data-[visible=true]:opacity-100',
                    className,
                )}
            >
                {icon === 'circle' ? (
                    <span className="grid size-[22px] place-items-center rounded-full bg-accent text-on-accent">
                        <Check
                            key={String(copied)}
                            size={12}
                            className="check-draw"
                        />
                    </span>
                ) : (
                    <Check
                        key={String(copied)}
                        size={16}
                        className="check-draw text-[color:var(--copy-hint-color)]"
                    />
                )}
                복사되었어요
            </div>
        </div>
        <span className="sr-only" aria-live="polite">
            {copied && '전화번호가 복사되었어요'}
        </span>
    </>
)

export const Screen = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => (
    <div className="fixed inset-0 overflow-y-auto bg-surface text-content font-notokr">
        <div
            className={cn(
                'relative mx-auto flex min-h-full max-w-[440px] flex-col px-6 pb-[max(20px,env(safe-area-inset-bottom))]',
                className,
            )}
        >
            {children}
        </div>
    </div>
)

export const DraftError = () => {
    const { error, retry } = useParkeContext()

    return (
        <div className="flex flex-col items-start">
            <div className="text-[22px] font-bold">{error}</div>
            <div className="mt-2 text-[15px] text-muted">
                네트워크 상태를 확인한 뒤 다시 시도해주세요.
            </div>
            <button
                type="button"
                onClick={retry}
                className="mt-6 cursor-pointer rounded-button border border-line px-5 py-2.5 text-[15px] font-medium active:bg-line"
            >
                다시 시도
            </button>
        </div>
    )
}

// ?v 로 레이아웃을 덮어쓴다 - 아무것도 고르지 않으면 카드에 저장된 layout 이 보인다
const VERSIONS = [
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
    { key: 'c', label: 'C' },
    { key: 'd', label: 'D' },
]

export const DraftSwitcher = () => {
    const [searchParams] = useSearchParams()
    const { layout } = useParkeContext()
    const current = searchParams.get('v') ?? layout
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
