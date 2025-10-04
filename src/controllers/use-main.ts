import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db } from '@/db'
import { get, ref } from 'firebase/database'
import { insertHyphen } from '@/helpers/insert-hyphen'
import { ToasterMessageContext } from '@/contexts/toaster-message-context'

const useMain = () => {
    const [loading, setLoading] = useState(true)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    const { message, setToasterMessageTimeout } = useContext(
        ToasterMessageContext,
    )

    const [query] = useSearchParams()

    const deviceId = query.get('deviceId') ?? null

    useEffect(() => {
        ;(async () => {
            if (!deviceId) {
                setError('Error - Try again plz!')
                setLoading(false)
                return
            }

            setLoading(true)

            const snap = await get(ref(db, `devices/${deviceId}/phone`))

            if (!snap.exists()) {
                setError('Error - Try again plz!')
                setLoading(false)
                return
            }

            setPhone(snap.val())

            // API calls - get Phone number from db
            setLoading(false)
        })()
    }, [])

    const hyphenInsertedPhoneNumber = insertHyphen(phone)

    const copyPhone = () => {
        if (!phone) return
        navigator.clipboard.writeText(phone)
        setToasterMessageTimeout('Copied!')
    }

    return {
        hyphenInsertedPhoneNumber,
        copyPhone,
        loading,
        message,
        phone,
        error,
    }
}

export default useMain
