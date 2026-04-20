import { useParkeContext } from '@/contexts'
import { Copy, Phone } from '@/illustration'

export const Footer = () => {
    const { copyPhone, phone } = useParkeContext()
    return (
        <div className="absolute bottom-5 w-screen px-4 flex gap-[40px] text-white">
            <div onClick={copyPhone} className={buttonStyle}>
                <Copy size={20} />
                <span className="font-medium">Copy</span>
            </div>
            <a href={phone ? `tel:${phone}` : '#'} className={buttonStyle}>
                <Phone size={20} /> <span className="font-medium">Call</span>
            </a>
        </div>
    )
}

const buttonStyle =
    'flex justify-center items-center grow gap-[10px] border-[0.5px] border-[#ffffff30] px-[30px] py-[14px] rounded-[10px] cursor-pointer active:bg-[#ffffff30]'
