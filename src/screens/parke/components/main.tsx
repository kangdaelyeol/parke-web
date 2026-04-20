import { CircleGradient, GradientBox, Skeleton } from '.'
import { useParkeContext } from '@/contexts'
import { formatPhone } from '@/utils'

export const Main = () => {
    const { phone, loading, error } = useParkeContext()

    return (
        <div className="text-[#fafafa] w-full px-6 pt-30">
            <div className="w-full max-w-150 relative">
                <CircleGradient />
                <div className="relative z-10 flex flex-col">
                    <div className="text-[#737373] font-intertight font-medium text-[16px]">
                        차주 연락처
                    </div>
                    <span className="text-[32px] mt-1 font-intertight tracking-wider font-[600] h-[55px]">
                        {loading ? (
                            <Skeleton width={300} height={55} />
                        ) : error ? (
                            error
                        ) : (
                            formatPhone(phone)
                        )}
                    </span>
                    <div className="text-[#737373] font-intertight font-medium text-[16px] mt-5">
                        차주 메시지
                    </div>
                    <span className="text-[23px] mt-1 font-intertight tracking-wide font-[600]">
                        {loading ? (
                            <Skeleton width={300} height={40} />
                        ) : (
                            '전화 주시면 바로 빼드릴게요.'
                        )}
                    </span>
                    <GradientBox />
                </div>
            </div>
        </div>
    )
}
