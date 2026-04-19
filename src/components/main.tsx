import Icon from '@mui/material/Icon'
import ToasterMessage from '@/components/common/toaster-message'
import Skeleton from '@/components/common/skeleton'
import useMain from '@/controllers/use-main'
import { formatPhone } from '@/helpers'
import AppIcon from '@/assets/app-icon.png'

export default function Main() {
    const { copyPhone, phone, loading, message, error } = useMain()

    return (
        <div className="text-white flex flex-col items-center">
            <img src={AppIcon} className="w-[70px] rounded-[20px]" />
            <div className="flex mt-[15px]">
                <span className="text-[30px] tracking-[0.2em]">PARK</span>
                <span className="text-[30px] text-blue-primary tracking-[0.2em]">
                    É
                </span>
            </div>
            <div className="text-[13px] text-black-deep">
                Smart Parking Solution
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
            <span className="text-[30px]">전화 주시면 바로 빼드릴게요!!</span>
            <div className="mt-[40px] flex gap-[40px]">
                <div
                    onClick={copyPhone}
                    className="flex gap-[10px] bg-[#555] px-[30px] py-[10px] rounded-[10px] cursor-pointer"
                >
                    <span>Copy</span>
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
                    <span>Call</span> <Icon>call</Icon>
                </a>
            </div>
            {message && <ToasterMessage message={message} />}
        </div>
    )
}
