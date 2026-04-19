import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/db'
import { get, ref } from 'firebase/database'
import { ToasterMessageContext } from '@/contexts/toaster-message-context'

export const useParke = () => {
    const [loading, setLoading] = useState(true)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const params = useParams()

    const { message, setToasterMessageTimeout } = useContext(
        ToasterMessageContext,
    )

    const deviceId = params.id

    useEffect(() => {
        ;(async () => {
            if (!deviceId) {
                setError('Error - Try again plz!')
                setLoading(false)
                return
            }

            setLoading(true)

            const snap = await get(ref(db, `card/${deviceId}/phone`))

            if (!snap.exists()) {
                // setError('Error - Try again plz!')
                setPhone('01024130510')
                setLoading(false)
                return
            }

            setPhone(snap.val())

            // API calls - get Phone number from db
            setLoading(false)
        })()
    }, [])

    const copyPhone = () => {
        if (!phone) return
        navigator.clipboard.writeText(phone)
        setToasterMessageTimeout('Copied!')
    }

    return {
        copyPhone,
        loading,
        message,
        phone,
        error,
    }
}
