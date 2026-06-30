import { useParkeContext } from '@/contexts'
import { formatPhone, cn } from '@/utils'
import { CircleGradient, Skeleton } from '.'

export const Main = () => {
    const { phone, loading, error } = useParkeContext()

    return (
        <div className="text-[#fafafa] w-full px-6 pt-30">
            <div className="w-full max-w-[440px] relative mx-auto">
                <CircleGradient />
                <div className="relative z-10 flex flex-col">
                    <div className="text-[#737373] font-intertight font-medium text-[16px]">
                        연락처
                    </div>
                    <span className="flex">
                        {loading ? (
                            <Skeleton width={300} height={55} />
                        ) : error ? (
                            error
                        ) : (
                            <div
                                className={cn(
                                    'relative mr-auto p-0.5 overflow-hidden text-[23px] mt-1 tracking-wide font-[600] h-[55px]',
                                    'after:absolute after:top-[-150%] after:left-[-150%] after:w-[400%] after:h-[400%]',
                                    'after:bg-[conic-gradient(transparent_330deg,#ffffff95,#fff)] after:bg-no-repeat after:animate-border',
                                    'before:absolute before:top-[-150%] before:left-[-150%] before:w-[400%] before:h-[400%]',
                                    'before:bg-[conic-gradient(transparent_330deg,#ffffff95,#fff)] before:bg-no-repeat before:animate-border2',
                                )}
                            >
                                <div className="relative z-10 py-2 px-2 animate-border-box">
                                    {formatPhone(phone)}
                                </div>
                            </div>
                        )}
                    </span>
                    <div className="text-[#737373] font-intertight font-medium text-[16px] mt-5">
                        메시지
                    </div>
                    {loading ? (
                        <Skeleton width={300} height={40} />
                    ) : (
                        <div
                            className={cn(
                                'relative mr-auto p-0.5 text-[23px] mt-1 tracking-wide font-[600] h-[55px]',
                            )}
                        >
                            <div className="relative z-10 py-2 px-2">
                                전화주시면 바로 빼드릴게요.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
