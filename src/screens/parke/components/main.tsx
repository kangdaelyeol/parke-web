import { Skeleton } from '.'
import { useParkeContext } from '@/contexts'
import { formatPhone } from '@/helpers'

export const Main = () => {
    const { phone, loading, error } = useParkeContext()

    return (
        <div className="text-[#fafafa] w-full">
            <div className="w-full max-w-200 px-3 flex flex-col">
                <span className="text-[30px] mt-[30px] font-phone">
                    {loading ? (
                        <Skeleton width={300} height={100} />
                    ) : error ? (
                        error
                    ) : (
                        formatPhone(phone)
                    )}
                </span>
                <span className="text-[20px] mt-2">
                    전화 주시면 바로 빼드릴게요!!
                </span>
            </div>
        </div>
    )
}
