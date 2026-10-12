import { useParkeContext } from '@/contexts'
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
                        <div className="text-[length:calc(23px*var(--parke-scale))] tracking-wide font-[600]">
                            {error}
                        </div>
                        <div className="text-muted font-medium text-[length:calc(16px*var(--parke-scale))] mt-2">
                            네트워크 상태를 확인한 뒤 다시 시도해주세요.
                        </div>
                        <button
                            type="button"
                            onClick={retry}
                            className="mt-6 px-[20px] py-[10px] text-[length:calc(16px*var(--parke-scale))] font-medium border-[0.5px] border-line rounded-button cursor-pointer select-none active:bg-line"
                        >
                            다시 시도
                        </button>
                    </div>
                ) : (
                    <div className="relative z-10 flex flex-col">
                        <div className="text-muted font-intertight font-medium text-[length:calc(16px*var(--parke-scale))]">
                            연락처
                        </div>
                        <span className="flex">
                            {loading ? (
                                <Skeleton width={300} height={65} />
                            ) : (
                                <button
                                    type="button"
                                    onClick={copyPhone}
                                    aria-label={`${formatPhone(phone)} 복사`}
                                    className={cn(
                                        'relative mr-auto p-0.5 overflow-hidden text-[length:min(calc(30px*var(--parke-scale)),9.5vw)] whitespace-nowrap mt-1 tracking-wide font-[600] font-number tabular-nums cursor-pointer',
                                        'after:absolute after:top-[-150%] after:left-[-150%] after:w-[400%] after:h-[400%]',
                                        'after:bg-[conic-gradient(transparent_330deg,color-mix(in_srgb,var(--parke-content)_58%,transparent),var(--parke-content))] after:bg-no-repeat after:animate-border',
                                        'before:absolute before:top-[-150%] before:left-[-150%] before:w-[400%] before:h-[400%]',
                                        'before:bg-[conic-gradient(transparent_330deg,color-mix(in_srgb,var(--parke-content)_58%,transparent),var(--parke-content))] before:bg-no-repeat before:animate-border2',
                                    )}
                                >
                                    <div className="relative z-10 py-2 px-2 animate-border-box">
                                        {formatPhone(phone)}
                                    </div>
                                </button>
                            )}
                        </span>
                        <div className="text-muted font-intertight font-medium text-[length:calc(16px*var(--parke-scale))] mt-5">
                            메시지
                        </div>
                        {loading ? (
                            <Skeleton width={300} height={40} />
                        ) : (
                            <div
                                className={cn(
                                    'relative mr-auto p-0.5 text-[length:calc(23px*var(--parke-scale))] mt-1 tracking-wide font-[600] break-keep',
                                )}
                            >
                                <div className="relative z-10 py-2 px-2">
                                    {ownerMessage}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
