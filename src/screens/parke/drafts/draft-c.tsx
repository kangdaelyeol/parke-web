// 시안 C - 애플 사이트 스타일: 배경·테두리 없이 큰 타이포와 여백으로만 구성
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

// 화면 안쪽 폭(화면 최대 440px - 좌우 여백 48px)에 번호 13자(약 7.6em)가 들어가도록 상한
const NUMBER_SIZE =
    'text-[length:min(calc(52px*var(--parke-scale)),calc((min(100vw,440px)_-_48px)/7.6))]'

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
        <Screen className="dc-root">
            <header
                className="dc-enter flex justify-center pt-6"
                style={delay(0)}
            >
                <Mark className="w-7" />
            </header>

            <main className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                {error ? (
                    <div className="dc-enter" style={delay(80)}>
                        <DraftError />
                    </div>
                ) : (
                    <>
                        <p
                            className="dc-enter relative text-[17px] font-semibold text-muted"
                            style={delay(80)}
                        >
                            차주 연락처
                            {!loading && (
                                <span
                                    className="dc-hint"
                                    data-visible={hintVisible}
                                >
                                    터치 한 번으로 번호 복사
                                </span>
                            )}
                        </p>

                        <Swap
                            loading={loading}
                            className="mt-2 justify-items-center"
                            skeleton={
                                // 실제 번호와 같은 글자 크기·행간으로 높이를 맞춰 로딩 후 레이아웃이 튀지 않게 한다
                                <div className={NUMBER_SIZE}>
                                    <div className="draft-skeleton mx-auto h-[1.1em] w-[6.8em] max-w-full" />
                                </div>
                            }
                        >
                            <button
                                type="button"
                                onClick={handleCopy}
                                aria-label={`${formatPhone(phone)} 복사`}
                                className="cursor-pointer"
                            >
                                <span
                                    className={cn(
                                        'dc-number block whitespace-nowrap font-semibold leading-[1.1] tracking-[-0.03em] tabular-nums',
                                        NUMBER_SIZE,
                                    )}
                                >
                                    {formatPhone(phone)}
                                </span>
                            </button>
                        </Swap>

                        <Swap
                            loading={loading}
                            delayMs={90}
                            className="mt-5 justify-items-center"
                            skeleton={
                                <div className="py-[0.25em] text-[length:calc(21px*var(--parke-scale))]">
                                    <div className="draft-skeleton mx-auto h-[1em] w-[60%]" />
                                </div>
                            }
                        >
                            <p className="max-w-[20em] break-keep text-[length:calc(21px*var(--parke-scale))] font-medium leading-[1.5] text-[var(--dc-body)]">
                                {ownerMessage}
                            </p>
                        </Swap>

                        <button
                            type="button"
                            onClick={handleCopy}
                            disabled={disabled}
                            className={cn(
                                'dc-link dc-enter mt-8 cursor-pointer text-[17px] font-medium',
                                disabledStyle,
                            )}
                            style={delay(160)}
                        >
                            번호 복사하기 ›
                        </button>
                    </>
                )}
            </main>

            <footer className="dc-enter relative" style={delay(240)}>
                <div className="dc-toast-anchor" aria-hidden>
                    <div className="dc-toast" data-visible={copied}>
                        <Check
                            key={String(copied)}
                            size={16}
                            className="dc-check-draw"
                        />
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
                        'dc-cta flex h-14 w-full items-center justify-center gap-2 rounded-full text-[17px] font-semibold',
                        disabledStyle,
                    )}
                >
                    <Phone size={18} />
                    전화하기
                </a>
            </footer>
        </Screen>
    )
}
