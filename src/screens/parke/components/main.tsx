import { useParkeContext } from '@/contexts'
import { Swap } from '@/components'
import { formatPhone, cn } from '@/utils'
import { CircleGradient, Skeleton } from '.'

export const Main = () => {
    const { phone, loading, error, copyPhone, retry, ownerMessage } =
        useParkeContext()

    return (
        <div className="text-content w-full px-6 pt-30">
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
                        <div className="text-muted font-intertight font-medium text-[16px]">
                            연락처
                        </div>
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
                            <button
                                type="button"
                                onClick={copyPhone}
                                aria-label={`${formatPhone(phone)} 복사`}
                                className="relative mr-auto p-0.5 text-[length:min(calc(30px*var(--parke-scale)),9.5vw)] whitespace-nowrap mt-1 tracking-wide font-[600] font-number tabular-nums cursor-pointer"
                            >
                                {/* 회전하는 그라데이션을 가운데만 도려낸 테두리(p-0.5) 모양으로 마스킹 - 안쪽은 투명해서 뒤 배경이 비친다 */}
                                <span
                                    aria-hidden
                                    className={cn(
                                        'border-ring absolute inset-0 overflow-hidden p-0.5',
                                        'after:absolute after:top-[-150%] after:left-[-150%] after:w-[400%] after:h-[400%]',
                                        'after:bg-[conic-gradient(transparent_330deg,color-mix(in_srgb,var(--parke-content)_58%,transparent),var(--parke-content))] after:bg-no-repeat after:animate-border',
                                        'before:absolute before:top-[-150%] before:left-[-150%] before:w-[400%] before:h-[400%]',
                                        'before:bg-[conic-gradient(transparent_330deg,color-mix(in_srgb,var(--parke-content)_58%,transparent),var(--parke-content))] before:bg-no-repeat before:animate-border2',
                                    )}
                                />
                                <div className="relative py-2 px-2">
                                    {formatPhone(phone)}
                                </div>
                            </button>
                        </Swap>
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
