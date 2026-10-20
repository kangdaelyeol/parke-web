import { useParkeContext } from '@/contexts'
import { CopyHint, Swap } from '@/components'
import { useCopyHint } from '@/hooks'
import { formatPhone, cn } from '@/utils'
import { CircleGradient } from './circle-gradient'
import { Skeleton } from './skeleton'

export const Main = () => {
    const { phone, loading, error, copyPhone, retry, ownerMessage, message } =
        useParkeContext()

    // 복사하면 토스트 메시지가 뜨므로 이를 복사 신호로 쓴다
    const { hintVisible } = useCopyHint(loading, !!message)

    return (
        <div className="text-content w-full px-6 pt-30 preview:pt-6">
            <div className="w-full max-w-[440px] relative mx-auto">
                <CircleGradient />
                {error ? (
                    <div className="relative z-10 flex flex-col items-start">
                        <div className="text-[23px] tracking-wide font-[600]">
                            {error}
                        </div>
                        <div className="text-muted font-medium text-[16px] mt-2">
                            네트워크 상태를 확인한 뒤 다시 시도해주세요.
                        </div>
                        <button
                            type="button"
                            onClick={retry}
                            className="mt-6 px-[20px] py-[10px] text-[16px] font-medium border-[0.5px] border-line rounded-button cursor-pointer select-none active:bg-line"
                        >
                            다시 시도
                        </button>
                    </div>
                ) : (
                    <div className="relative z-10 flex flex-col">
                        {/* 레이블과 번호를 포함한 연락처 영역 전체가 복사 버튼 */}
                        <button
                            type="button"
                            onClick={copyPhone}
                            disabled={loading}
                            aria-label={
                                loading
                                    ? undefined
                                    : `${formatPhone(phone)} 복사`
                            }
                            className="flex w-full flex-col items-start text-left cursor-pointer transition-opacity active:opacity-70 disabled:cursor-default"
                        >
                            <span className="relative text-muted font-intertight font-medium text-[16px]">
                                연락처
                                {!loading && (
                                    <CopyHint
                                        visible={hintVisible}
                                        className="text-[13px]"
                                    />
                                )}
                            </span>
                            {/* 스켈레톤 높이 = 버튼 여백(p-0.5 + py-2 = 20px) + 번호 한 줄(1.5em) */}
                            <Swap
                                loading={loading}
                                className="justify-items-start"
                                skeleton={
                                    <div className="mt-1 text-[length:min(calc(30px*var(--parke-scale)),9.5vw)]">
                                        <Skeleton
                                            width="8em"
                                            height="calc(1.5em + 20px)"
                                        />
                                    </div>
                                }
                            >
                                <span className="relative block p-0.5 text-[length:min(calc(30px*var(--parke-scale)),9.5vw)] whitespace-nowrap mt-1 tracking-wide font-[600] font-number tabular-nums cursor-pointer">
                                    {/* 회전하는 그라데이션을 가운데만 도려낸 테두리(p-0.5) 모양으로 마스킹 - 안쪽은 투명해서 뒤 배경이 비친다 */}
                                    <span
                                        aria-hidden
                                        className="border-ring border-orbit absolute inset-0 p-0.5"
                                    />
                                    <span className="relative block py-2 px-2">
                                        {formatPhone(phone)}
                                    </span>
                                </span>
                            </Swap>
                        </button>
                        <div className="text-muted font-intertight font-medium text-[16px] mt-5">
                            메시지
                        </div>
                        <Swap
                            loading={loading}
                            delayMs={90}
                            className="justify-items-start"
                            skeleton={
                                <div className="mt-1 text-[length:calc(23px*var(--parke-scale))]">
                                    <Skeleton
                                        width="70%"
                                        height="calc(1.5em + 20px)"
                                    />
                                </div>
                            }
                        >
                            <div
                                className={cn(
                                    'relative mr-auto p-0.5 text-[length:calc(23px*var(--parke-scale))] mt-1 tracking-wide font-[600] break-keep',
                                )}
                            >
                                <div className="relative z-10 py-2 px-2">
                                    {ownerMessage}
                                </div>
                            </div>
                        </Swap>
                    </div>
                )}
            </div>
        </div>
    )
}
