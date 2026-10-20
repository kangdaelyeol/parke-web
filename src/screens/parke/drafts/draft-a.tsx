// 시안 A - 글래스 카드형 (Apple 스타일)
import './draft-a.css'
import type { CSSProperties, PointerEvent } from 'react'
import { Copy, Phone } from '@/illustration'
import { formatPhone, cn } from '@/utils'
import { Check, DraftError, Mark, Screen, Swap } from './shared'
import { useActionState } from './use-action-state'
import { useCopyFeedback } from './use-copy-feedback'
import { useCopyHint } from './use-copy-hint'

const COPIED_DURATION = 2000

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

export const DraftA = () => {
    const {
        phone,
        loading,
        error,
        copyPhone,
        ownerMessage,
        disabled,
        telHref,
        disabledStyle,
    } = useActionState()

    const { copied, handleCopy } = useCopyFeedback(
        copyPhone,
        disabled,
        COPIED_DURATION,
    )

    const { hintVisible } = useCopyHint(loading, copied)

    return (
        <Screen className="da-root">
            <div className="da-backdrop" aria-hidden />

            <header className="da-rise relative z-10 pt-6" style={delay(0)}>
                <span className="da-glass-chip grid size-10 place-items-center rounded-[12px]">
                    <Mark className="w-6" />
                </span>
            </header>

            <main className="relative z-10 flex flex-1 flex-col justify-center py-10">
                {error ? (
                    <div className="da-rise" style={delay(90)}>
                        <DraftError />
                    </div>
                ) : (
                    <div className="da-rise" style={delay(90)}>
                        <section
                            className="da-card p-7"
                            onPointerMove={moveSheen}
                            onPointerLeave={resetSheen}
                        >
                            <p className="relative text-[length:calc(13px*var(--parke-scale))] font-medium tracking-[0.01em] text-muted">
                                차주 연락처
                                {!loading && (
                                    <span
                                        className="da-hint"
                                        data-visible={hintVisible}
                                    >
                                        터치 한 번으로 번호 복사
                                    </span>
                                )}
                            </p>
                            <Swap
                                loading={loading}
                                className="mt-2 justify-items-start"
                                skeleton={
                                    // 실제 번호와 같은 글자 크기·행간으로 높이를 맞춰 로딩 후 레이아웃이 튀지 않게 한다
                                    <div className="text-[length:min(calc(40px*var(--parke-scale)),calc((min(100vw,440px)_-_104px)/7.8))]">
                                        <div className="da-skeleton h-[1.15em] w-[7.2em] max-w-full" />
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

                            <div className="da-divider my-7 h-px" />

                            <p className="text-[length:calc(13px*var(--parke-scale))] font-medium tracking-[0.01em] text-muted">
                                남긴 메시지
                            </p>
                            <Swap
                                loading={loading}
                                delayMs={90}
                                className="mt-2.5 justify-items-start"
                                skeleton={
                                    <div className="py-[0.325em] text-[length:calc(18px*var(--parke-scale))]">
                                        <div className="da-skeleton h-[1em] w-[70%]" />
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
                className="da-rise relative z-10 flex gap-3"
                style={delay(180)}
            >
                <div className="da-toast-anchor" aria-hidden>
                    <div className="da-toast" data-visible={copied}>
                        <span className="da-toast-icon">
                            <Check
                                key={String(copied)}
                                size={12}
                                className="da-check-draw"
                            />
                        </span>
                        복사되었어요
                    </div>
                </div>
                <span className="sr-only" aria-live="polite">
                    {copied && '전화번호가 복사되었어요'}
                </span>
                <button
                    type="button"
                    onClick={handleCopy}
                    disabled={disabled}
                    data-copied={copied}
                    aria-label={copied ? '복사됨' : '번호 복사'}
                    className={cn(
                        'da-glass-btn da-swap size-[60px] shrink-0 cursor-pointer place-items-center rounded-button',
                        disabledStyle,
                    )}
                >
                    <Copy size={22} />
                    <Check size={22} />
                </button>
                <a
                    href={telHref}
                    aria-disabled={disabled}
                    className={cn(
                        'da-call flex h-[60px] flex-1 items-center justify-center gap-2.5 rounded-button text-[length:calc(17px*var(--parke-scale))] font-semibold tracking-[-0.01em]',
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
