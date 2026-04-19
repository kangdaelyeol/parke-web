import { useEffect, useState, type PropsWithChildren } from 'react'
import { useParams } from 'react-router-dom'
import { get, ref } from 'firebase/database'
import { db } from '@/db'
import { useToasterMessageContext } from '@/contexts'
import { ParkeContext } from '.'

export const ParkeContextProvider = ({ children }: PropsWithChildren) => {
    const [loading, setLoading] = useState(true)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const params = useParams()

    const { setToasterMessageTimeout, message } = useToasterMessageContext()

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
    }, [deviceId])

    const copyPhone = () => {
        if (!phone) return
        navigator.clipboard.writeText(phone)
        setToasterMessageTimeout('Copied!')
    }

    return (
        <ParkeContext.Provider
            value={{ copyPhone, loading, message, phone, error }}
        >
            {children}
        </ParkeContext.Provider>
    )
}
