import Icon from '@mui/material/Icon'
import { ToasterMessage } from '@/components'
import { Skeleton } from '@/screens/parke/components'
import { useParke } from '@/controllers'
import { formatPhone } from '@/helpers'
import AppIcon from '@/assets/app-icon.png'

export default function Main() {
    const { copyPhone, phone, loading, message, error } = useParke()

    return (
        <div className="text-white flex flex-col">
            <div className="flex items-center *:font-phone">
                <div className="w-8 rounded-[5px] overflow-hidden *:block">
                    <img
                        src={AppIcon}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flexitems-center ml-1">
                    <span className="tracking-[0.2em]">PARK</span>
                    <span className="text-blue-primary tracking-[0.2em]">
                        É
                    </span>
                </div>
            </div>

            <div className="flex flex-col">
                <div className=""></div>
            </div>
            <span className="text-[30px] mt-[30px] font-phone font-medium">
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
