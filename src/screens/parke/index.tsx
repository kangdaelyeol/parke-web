import Icon from '@mui/material/Icon'
import { ToasterMessage } from '@/components'
import { Skeleton, Header } from '@/screens/parke/components'
import { useParke } from '@/controllers'
import { formatPhone } from '@/helpers'

export default function Parke() {
    const { copyPhone, phone, loading, message, error } = useParke()

    return (
        <div className="text-white flex flex-col bg-[#000000] h-[100vh]">
            <Header />
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
            <div className="mt-[40px] flex gap-[40px]">
                <div
                    onClick={copyPhone}
                    className="flex gap-[10px] bg-[#555] px-[30px] py-[10px] rounded-[10px] cursor-pointer"
                >
                    <span className="font-medium">Copy</span>
                    <Icon
                        style={{
                            color: '#fff',
                        }}
                    >
                        content_copy
                    </Icon>
                </div>
                <a
                    href={phone ? `tel:${phone}` : '#'}
                    className="cursor-pointer gap-[10px] flex bg-[#555] px-[30px] py-[10px] rounded-[10px]"
                >
                    <span className="font-medium">Call</span> <Icon>call</Icon>
                </a>
            </div>
            {message && <ToasterMessage message={message} />}
        </div>
    )
}
