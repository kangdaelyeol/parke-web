import { useParkeContext } from '@/contexts'
import { Copy, Phone } from '@/illustration'

export const Footer = () => {
    const { copyPhone, phone } = useParkeContext()
    return (
        <div className="absolute bottom-5 px-6 w-full">
            <div className="max-w-[440px] mx-auto flex gap-[20px] text-[18px] text-white *:select-none">
                <div onClick={copyPhone} className={buttonStyle}>
                    <Copy size={20} />
                    <span className="font-medium">복사</span>
                </div>
                <a href={phone ? `tel:${phone}` : '#'} className={buttonStyle}>
                    <Phone size={20} />{' '}
                    <span className="font-medium">전화</span>
                </a>
            </div>
        </div>
    )
}

const buttonStyle =
    'flex justify-center items-center grow gap-[10px] border-[0.5px] border-[#ffffff30] px-[30px] py-[14px] rounded-[10px] cursor-pointer active:bg-[#ffffff30]'
