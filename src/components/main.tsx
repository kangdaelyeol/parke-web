import Icon from '@mui/material/Icon'
import ToasterMessage from '@/components/common/toaster-message'
import Skeleton from '@/components/common/skeleton'
import useMain from '@/controllers/use-main'

export default function Main() {
    const {
        hyphenInsertedPhoneNumber,
        copyPhone,
        phone,
        loading,
        message,
        error,
    } = useMain()

    return (
        <div className="text-white flex flex-col items-center">
            <span className="text-[80px] tracking-wider">PARKE</span>
            <span className="text-[30px] mt-[30px]">This is my number</span>
            <span className="text-[40px] mt-[30px]">
                {loading ? (
                    <Skeleton width={300} height={100} />
                ) : error ? (
                    error
                ) : (
                    hyphenInsertedPhoneNumber
                )}
            </span>
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
