import { Skeleton } from '.'
import { useParkeContext } from '@/contexts'
import { formatPhone } from '@/helpers'

export const Main = () => {
    const { phone, loading, error } = useParkeContext()

    return (
        <div>
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
    )
}
