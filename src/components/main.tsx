import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { db } from '@/db'
import { get, ref } from 'firebase/database'

export default function Main() {
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState('')

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

    return (
        <div className="text-white flex flex-col items-center">
            <span className="text-[80px] ">PARKE</span>
            <span className="text-[30px] mt-[40px]">This is my number</span>
            <span className="text-[40px] mt-[30px]">
                {hyphenInsertedPhoneNumber}
            </span>
            <div className="mt-[30px] flex gap-[40px]">
                <div className="flex bg-[#555] px-[30px] py-[10px] rounded-[10px]">
                    <span>Copy</span> <div className="ml-[10px]">Icon</div>
                </div>
                <a
                    href={`tel:${phoneNumber}`}
                    className="flex bg-[#555] px-[30px] py-[10px] rounded-[10px]"
                >
                    <span>Call</span> <div className="ml-[10px]">Icon</div>
                </a>
            </div>
        </div>
    )
}
