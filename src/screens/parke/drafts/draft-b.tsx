// 시안 B - 글래스 카드형 (Apple 스타일)
import './draft-b.css'
import type { CSSProperties, PointerEvent } from 'react'
import { Copy, Phone } from '@/illustration'
import { CopyHint, Swap } from '@/components'
import { formatPhone, cn } from '@/utils'
import { Check, CopiedToast, DraftError, Mark, Screen } from './shared'
import { useActionState } from './use-action-state'
import { useCopyFeedback } from './use-copy-feedback'
import { useCopyHint } from '@/hooks'

const COPIED_DURATION = 2000

const SWAP_ICON =
    '[grid-area:1/1] transition-[opacity,scale,rotate,filter] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

// 포인터 위치를 따라 카드의 반사광을 옮긴다
const moveSheen = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

const resetSheen = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.removeProperty('--mx')
    e.currentTarget.style.removeProperty('--my')
}

export const DraftB = () => {
    const {
        phone,
        loading,
        error,
        copyPhone,
        ownerMessage,
        disabled,
        copyBlocked,
        telHref,
        disabledStyle,
    } = useActionState()

    const { copied, handleCopy } = useCopyFeedback(
        copyPhone,
        copyBlocked,
        COPIED_DURATION,
    )

    const { hintVisible } = useCopyHint(loading, copied)

    return (
        <Screen className="db-root">
            <div className="db-backdrop" aria-hidden />

            <header
                className="db-rise relative z-10 pt-6 preview:pt-4"
                style={delay(0)}
            >
                <span className="db-glass-chip grid size-10 place-items-center rounded-[12px]">
                    <Mark className="w-6" />
                </span>
            </header>

            <main className="relative z-10 flex flex-1 flex-col justify-center py-10 preview:py-4">
                {error ? (
                    <div className="db-rise" style={delay(90)}>
                        <DraftError />
                    </div>
                ) : (
                    <div className="db-rise" style={delay(90)}>
                        <section
                            className="db-card p-7"
                            onPointerMove={moveSheen}
                            onPointerLeave={resetSheen}
                        >
                            <p className="relative text-[13px] font-medium tracking-[0.01em] text-muted">
                                차주 연락처
                                {!loading && (
                                    <CopyHint
                                        visible={hintVisible}
                                        className="tracking-[-0.005em]"
                                    />
                                )}
                            </p>
                            <Swap
                                loading={loading}
                                className="mt-2 justify-items-start"
                                skeleton={
                                    // 실제 번호와 같은 글자 크기·행간으로 높이를 맞춰 로딩 후 레이아웃이 튀지 않게 한다
                                    <div className="text-[length:min(calc(40px*var(--parke-scale)),calc((min(100vw,440px)_-_104px)/7.8))]">
                                        <div className="draft-skeleton h-[1.15em] w-[7.2em] max-w-full" />
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    aria-label={`${formatPhone(phone)} 복사`}
                                    className="block cursor-pointer text-left"
                                >
                                    {/* 카드 안쪽 폭(화면 최대 440px - 좌우 여백 104px)에 번호 13자(약 7.8em)가 들어가도록 상한 */}
                                    <span className="whitespace-nowrap font-number text-[length:min(calc(40px*var(--parke-scale)),calc((min(100vw,440px)_-_104px)/7.8))] font-bold leading-[1.15] tracking-[-0.025em] tabular-nums">
                                        {formatPhone(phone)}
                                    </span>
                                </button>
                            </Swap>

                            <div className="my-7 h-px bg-linear-to-r from-transparent via-[var(--db-edge)] to-transparent preview:my-5" />

                            <p className="text-[13px] font-medium tracking-[0.01em] text-muted">
                                남긴 메시지
                            </p>
                            <Swap
                                loading={loading}
                                delayMs={90}
                                className="mt-2.5 justify-items-start"
                                skeleton={
                                    <div className="py-[0.325em] text-[length:calc(18px*var(--parke-scale))]">
                                        <div className="draft-skeleton h-[1em] w-[70%]" />
                                    </div>
                                }
                            >
                                <p className="break-keep text-[length:calc(18px*var(--parke-scale))] font-medium leading-[1.65] text-content/90">
                                    {ownerMessage}
                                </p>
                            </Swap>
                        </section>
                    </div>
                )}
            </main>

            <footer
                className="db-rise relative z-10 flex gap-3"
                style={delay(180)}
            >
                <CopiedToast
                    copied={copied}
                    className="db-toast rounded-full py-2 pr-4 pl-2 tracking-[-0.01em] text-content"
                />
                <button
                    type="button"
                    onClick={handleCopy}
                    disabled={disabled}
                    data-copied={copied}
                    aria-label={copied ? '복사됨' : '번호 복사'}
                    className={cn(
                        'db-glass-btn group grid size-[60px] shrink-0 cursor-pointer place-items-center rounded-button',
                        disabledStyle,
                    )}
                >
                    {/* 복사하면 복사 아이콘이 돌며 사라지고 체크가 돌며 나타난다 */}
                    <Copy
                        size={22}
                        className={cn(
                            SWAP_ICON,
                            'group-data-[copied=true]:scale-60 group-data-[copied=true]:rotate-15 group-data-[copied=true]:opacity-0 group-data-[copied=true]:blur-xs',
                        )}
                    />
                    <Check
                        size={22}
                        className={cn(
                            SWAP_ICON,
                            '-rotate-15 scale-60 text-accent opacity-0 blur-xs',
                            'group-data-[copied=true]:rotate-0 group-data-[copied=true]:scale-100 group-data-[copied=true]:opacity-100 group-data-[copied=true]:blur-none',
                        )}
                    />
                </button>
                <a
                    href={telHref}
                    aria-disabled={disabled}
                    className={cn(
                        'db-call flex h-[60px] flex-1 items-center justify-center gap-2.5 rounded-button text-[17px] font-semibold tracking-[-0.01em]',
                        disabledStyle,
                    )}
                >
                    <Phone size={20} />
                    전화하기
                </a>
            </footer>
        </Screen>
    )
}
