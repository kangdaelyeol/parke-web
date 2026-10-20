// 시안 B - Toss 스타일: 큰 질문형 헤드라인, 카드 리스트, 하단 풀폭 CTA
import './draft-b.css'
import type { CSSProperties } from 'react'
import { Copy, Phone } from '@/illustration'
import { formatPhone, cn } from '@/utils'
import { Check, DraftError, Mark, Screen, Swap } from './shared'
import { useActionState } from './use-action-state'
import { useCopyFeedback } from './use-copy-feedback'
import { useCopyHint } from './use-copy-hint'

const COPIED_DURATION = 2000

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

// 카드 안쪽 폭(화면 최대 440px - 좌우 여백 88px)에 번호 13자(약 7.8em)가 들어가도록 상한
const NUMBER_SIZE =
    'text-[length:min(calc(34px*var(--parke-scale)),calc((min(100vw,440px)_-_88px)/7.8))]'

export const DraftB = () => {
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
        <Screen className="db-root px-5">
            <header className="db-enter pt-5" style={delay(0)}>
                <Mark className="w-8" />
            </header>

            <div className="db-enter pt-10" style={delay(60)}>
                <h1 className="text-[length:calc(26px*var(--parke-scale))] font-bold leading-[1.35]">
                    차량 이동이
                    <br />
                    필요하신가요?
                </h1>
                <p className="mt-2 text-[length:calc(16px*var(--parke-scale))] font-medium text-muted">
                    차주에게 바로 연락할 수 있어요
                </p>
            </div>

            <main className="flex flex-1 flex-col gap-3 pt-8 pb-8">
                {error ? (
                    <div className="db-enter db-card p-6" style={delay(120)}>
                        <DraftError />
                    </div>
                ) : (
                    <>
                        <section
                            className="db-enter db-card p-6"
                            style={delay(120)}
                        >
                            <div className="flex items-center justify-between">
                                <p className="relative text-[length:calc(14px*var(--parke-scale))] font-medium text-muted">
                                    차주 연락처
                                    {!loading && (
                                        <span
                                            className="db-hint"
                                            data-visible={hintVisible}
                                        >
                                            터치 한 번으로 번호 복사
                                        </span>
                                    )}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    disabled={disabled}
                                    data-copied={copied}
                                    className={cn(
                                        'db-press db-chip flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold',
                                        disabledStyle,
                                    )}
                                >
                                    <span
                                        key={String(copied)}
                                        className="db-pop grid place-items-center"
                                    >
                                        {copied ? (
                                            <Check size={14} />
                                        ) : (
                                            <Copy size={14} />
                                        )}
                                    </span>
                                    {copied ? '복사됨' : '복사'}
                                </button>
                            </div>

                            <Swap
                                loading={loading}
                                className="mt-2 justify-items-start"
                                skeleton={
                                    // 실제 번호와 같은 글자 크기·행간으로 높이를 맞춰 로딩 후 레이아웃이 튀지 않게 한다
                                    <div className={NUMBER_SIZE}>
                                        <div className="db-skeleton h-[1.25em] w-[7.2em] max-w-full" />
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    aria-label={`${formatPhone(phone)} 복사`}
                                    className="block cursor-pointer text-left"
                                >
                                    <span
                                        className={cn(
                                            'db-press inline-block origin-left whitespace-nowrap font-bold leading-[1.25] tracking-[-0.03em] tabular-nums',
                                            NUMBER_SIZE,
                                        )}
                                    >
                                        {formatPhone(phone)}
                                    </span>
                                </button>
                            </Swap>
                        </section>

                        <section
                            className="db-enter db-card p-6"
                            style={delay(180)}
                        >
                            <p className="text-[length:calc(14px*var(--parke-scale))] font-medium text-muted">
                                남긴 메시지
                            </p>
                            <Swap
                                loading={loading}
                                delayMs={90}
                                className="mt-2 justify-items-start"
                                skeleton={
                                    <div className="py-[0.3em] text-[length:calc(17px*var(--parke-scale))]">
                                        <div className="db-skeleton h-[1em] w-[70%]" />
                                    </div>
                                }
                            >
                                <p className="break-keep text-[length:calc(17px*var(--parke-scale))] font-semibold leading-[1.6] text-[var(--db-body)]">
                                    {ownerMessage}
                                </p>
                            </Swap>
                        </section>
                    </>
                )}
            </main>

            <footer className="db-enter relative" style={delay(240)}>
                <div className="db-toast-anchor" aria-hidden>
                    <div className="db-toast" data-visible={copied}>
                        <span className="db-toast-icon">
                            <Check
                                key={String(copied)}
                                size={12}
                                className="db-check-draw"
                            />
                        </span>
                        복사되었어요
                    </div>
                </div>
                <span className="sr-only" aria-live="polite">
                    {copied && '전화번호가 복사되었어요'}
                </span>
                <a
                    href={telHref}
                    aria-disabled={disabled}
                    className={cn(
                        'db-cta flex h-14 w-full items-center justify-center gap-2 rounded-[16px] text-[length:calc(17px*var(--parke-scale))] font-bold',
                        disabledStyle,
                    )}
                >
                    <Phone size={19} />
                    전화하기
                </a>
            </footer>
        </Screen>
    )
}
