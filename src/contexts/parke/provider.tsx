import { useEffect, useState, type PropsWithChildren } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { get, ref } from 'firebase/database'
import { db } from '@/db'
import { parseTheme } from '@/themes'
import { useToasterMessageContext } from '@/contexts'
import { ParkeContext } from '.'

export const ParkeContextProvider = ({ children }: PropsWithChildren) => {
    const [loading, setLoading] = useState(true)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [retryCount, setRetryCount] = useState(0)
    const [dbTheme, setDbTheme] = useState<unknown>(null)
    const params = useParams()
    const [searchParams] = useSearchParams()

    const { setToasterMessageTimeout, message } = useToasterMessageContext()

    const deviceId = params.id

    // 개발 환경에서는 ?theme=light 로 미리보기
    const previewTheme = import.meta.env.DEV ? searchParams.get('theme') : null
    const theme = parseTheme(previewTheme ?? dbTheme)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        return () => {
            delete document.documentElement.dataset.theme
        }
    }, [theme])

    useEffect(() => {
        ;(async () => {
            if (!deviceId) {
                setError('연락처를 찾을 수 없어요.')
                setLoading(false)
                return
            }

            setLoading(true)
            setError('')

            try {
                const [snap, themeSnap] = await Promise.all([
                    get(ref(db, `card/${deviceId}/phone`)),
                    get(ref(db, `card/${deviceId}/theme`)).catch(() => null),
                ])

                setDbTheme(themeSnap?.val() ?? null)

                if (!snap.exists()) {
                    // setError('Error - Try again plz!')
                    setPhone('01024130510')
                    setLoading(false)
                    return
                }

                setPhone(snap.val())
            } catch {
                setError('연락처를 불러오지 못했어요.')
            }

            // API calls - get Phone number from db
            setLoading(false)
        })()
    }, [deviceId, retryCount])

    const copyPhone = () => {
        if (!phone) return
        navigator.clipboard.writeText(phone)
        setToasterMessageTimeout('전화번호가 복사되었습니다.')
    }

    const retry = () => setRetryCount((count) => count + 1)

    return (
        <ParkeContext.Provider
            value={{
                copyPhone,
                retry,
                loading,
                message,
                phone,
                error,
                theme,
            }}
        >
            {children}
        </ParkeContext.Provider>
    )
}
