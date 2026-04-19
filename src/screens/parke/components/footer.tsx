import { useParkeContext } from '@/contexts'
import { Icon } from '@mui/material'

export const Footer = () => {
    const { copyPhone, phone } = useParkeContext()
    return (
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
    )
}
