// 시안 C - Toss 스타일: 카드 리스트, 하단 풀폭 CTA
import './draft-c.css'
import type { CSSProperties } from 'react'
import { Phone } from '@/illustration'
import { Swap } from '@/components'
import { formatPhone, cn } from '@/utils'
import { Check, DraftError, Mark, Screen } from './shared'
import { useActionState } from './use-action-state'
import { useCopyFeedback } from './use-copy-feedback'
import { useCopyHint } from './use-copy-hint'

const COPIED_DURATION = 2000

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

// 카드 안쪽 폭(화면 최대 440px - 좌우 여백 88px)에 번호 13자(약 7.8em)가 들어가도록 상한
const NUMBER_SIZE =
    'text-[length:min(calc(34px*var(--parke-scale)),calc((min(100vw,440px)_-_88px)/7.8))]'

export const DraftC = () => {
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
        <Screen className="dc-root px-5">
            <header className="dc-enter pt-5" style={delay(0)}>
                <Mark className="w-8" />
            </header>

            <main className="flex flex-1 flex-col justify-center gap-3 py-8">
                {error ? (
                    <div className="dc-enter dc-card p-6" style={delay(60)}>
                        <DraftError />
                    </div>
                ) : (
                    <>
                        {/* 카드 전체가 복사 버튼 */}
                        <div className="dc-enter" style={delay(60)}>
                            <button
                                type="button"
                                onClick={handleCopy}
                                disabled={disabled}
                                aria-label={
                                    loading
                                        ? undefined
                                        : `${formatPhone(phone)} 복사`
                                }
                                className="dc-card dc-card-press block w-full cursor-pointer p-6 text-left disabled:cursor-default"
                            >
                                <span className="relative block text-[14px] font-medium text-muted">
                                    차주 연락처
                                    {!loading && (
                                        <span
                                            className="dc-hint"
                                            data-visible={hintVisible}
                                        >
                                            터치 한 번으로 번호 복사
                                        </span>
                                    )}
                                </span>

                                <Swap
                                    loading={loading}
                                    className="mt-2 justify-items-start"
                                    skeleton={
                                        // 실제 번호와 같은 글자 크기·행간으로 높이를 맞춰 로딩 후 레이아웃이 튀지 않게 한다
                                        <div className={NUMBER_SIZE}>
                                            <div className="draft-skeleton h-[1.25em] w-[7.2em] max-w-full" />
                                        </div>
                                    }
                                >
                                    <span
                                        className={cn(
                                            'block whitespace-nowrap font-bold leading-[1.25] tracking-[-0.03em] tabular-nums',
                                            NUMBER_SIZE,
                                        )}
                                    >
                                        {formatPhone(phone)}
                                    </span>
                                </Swap>
                            </button>
                        </div>

                        <section
                            className="dc-enter dc-card p-6"
                            style={delay(120)}
                        >
                            <p className="text-[14px] font-medium text-muted">
                                남긴 메시지
                            </p>
                            <Swap
                                loading={loading}
                                delayMs={90}
                                className="mt-2 justify-items-start"
                                skeleton={
                                    <div className="py-[0.3em] text-[length:calc(17px*var(--parke-scale))]">
                                        <div className="draft-skeleton h-[1em] w-[70%]" />
                                    </div>
                                }
                            >
                                <p className="break-keep text-[length:calc(17px*var(--parke-scale))] font-semibold leading-[1.6] text-[var(--dc-body)]">
                                    {ownerMessage}
                                </p>
                            </Swap>
                        </section>
                    </>
                )}
            </main>

            <footer className="dc-enter relative" style={delay(180)}>
                <div className="dc-toast-anchor" aria-hidden>
                    <div className="dc-toast" data-visible={copied}>
                        <span className="dc-toast-icon">
                            <Check
                                key={String(copied)}
                                size={12}
                                className="dc-check-draw"
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
                        'dc-cta flex h-14 w-full items-center justify-center gap-2 rounded-[16px] text-[17px] font-bold',
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
