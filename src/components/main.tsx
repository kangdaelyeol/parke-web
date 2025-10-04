import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { db } from '@/db'
import { get, ref } from 'firebase/database'
import Icon from '@mui/material/Icon'
import { ToasterMessageContext } from '@/contexts/toaster-message-context'
import ToasterMessage from '@/components/common/toaster-message'
import Skeleton from '@/components/common/skeleton'

export default function Main() {
    const [loading, setLoading] = useState(true)
    const [phone, setPhone] = useState('')

    const { message, setToasterMessageTimeout } = useContext(
        ToasterMessageContext,
    )

    const [query] = useSearchParams()

    const deviceId = query.get('deviceId') ?? null

    // useEffect(() => {
    //     ;(async () => {
    //         if (!deviceId) return

    //         setLoading(true)
    //         const snap = await get(ref(db, `devices/${deviceId}/phone`))
    //         if (!snap.exists()) {
    //             // if the deviceID doesn't exist
    //         }

    //         setPhone(snap.val())
    //         // API calls - get Phone number from db
    //         setLoading(false)
    //     })()
    // }, [])

    const phoneNumber = '01024130510'

    const insertHyphen = (number: string): string => {
        if (number.length === 11)
            return (
                number.slice(0, 3) +
                '-' +
                number.slice(3, 7) +
                '-' +
                number.slice(7, 11)
            )
        else
            return (
                number.slice(0, 3) +
                '-' +
                number.slice(3, 6) +
                '-' +
                number.slice(6, 10)
            )
    }

    const hyphenInsertedPhoneNumber = insertHyphen(phoneNumber)

    const copyPhone = () => {
        if (!phoneNumber) return
        navigator.clipboard.writeText(phoneNumber)
        setToasterMessageTimeout('Copied!')
    }

    return (
        <div className="text-white flex flex-col items-center">
            <span className="text-[80px] tracking-wider">PARKE</span>
            <span className="text-[30px] mt-[30px]">This is my number</span>
            <span className="text-[40px] mt-[30px]">
                {loading ? (
                    <Skeleton width={300} height={100} />
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
                    href={phoneNumber ? `tel:${phoneNumber}` : '#'}
                    className="cursor-pointer gap-[10px] flex bg-[#555] px-[30px] py-[10px] rounded-[10px]"
                >
                    <span>Call</span> <Icon>call</Icon>
                </a>
            </div>
            {message && <ToasterMessage message={message} />}
        </div>
    )
}
