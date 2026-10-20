import {
    useEffect,
    useLayoutEffect,
    useState,
    type PropsWithChildren,
} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { get, ref } from 'firebase/database'
import { db } from '@/db'
import { getOnAccent, parseCustom, parseTheme } from '@/themes'
import { useToasterMessageContext } from '@/contexts'
import { ParkeContext } from '.'

const DEFAULT_OWNER_MESSAGE = '전화주시면 바로 빼드릴게요.'

export const ParkeContextProvider = ({ children }: PropsWithChildren) => {
    const [loading, setLoading] = useState(true)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [retryCount, setRetryCount] = useState(0)
    const [dbTheme, setDbTheme] = useState<unknown>(null)
    const [dbCustom, setDbCustom] = useState<unknown>(null)
    const params = useParams()
    const [searchParams] = useSearchParams()

    const { setToasterMessageTimeout, message } = useToasterMessageContext()

    const deviceId = params.id

    // 개발 환경에서는 ?theme=light&accent=ff5500&scale=1.2&message=... 로 미리보기
    const preview = import.meta.env.DEV ? searchParams : null
    const previewAccent = preview?.get('accent')
    const previewScale = preview?.get('scale')

    const theme = parseTheme(preview?.get('theme') ?? dbTheme)
    const {
        accent,
        scale,
        message: customMessage,
    } = parseCustom({
        ...(typeof dbCustom === 'object' ? dbCustom : null),
        ...(previewAccent && { accent: `#${previewAccent}` }),
        ...(previewScale && { scale: Number(previewScale) }),
        ...(preview?.get('message') && { message: preview.get('message') }),
    })

    // 테마·배율은 화면을 그리기 전에 적용한다 - 데이터가 그려진 뒤 한 프레임 늦게 바뀌면 크기와 색이 튀어 보인다
    useLayoutEffect(() => {
        document.documentElement.dataset.theme = theme
        return () => {
            delete document.documentElement.dataset.theme
        }
    }, [theme])

    useLayoutEffect(() => {
        const { style } = document.documentElement

        style.setProperty('--parke-scale', String(scale))
        if (accent) {
            style.setProperty('--parke-accent', accent)
            style.setProperty('--parke-on-accent', getOnAccent(accent))
        }

        return () => {
            style.removeProperty('--parke-scale')
            style.removeProperty('--parke-accent')
            style.removeProperty('--parke-on-accent')
        }
    }, [accent, scale])

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
                const [snap, themeSnap, customSnap] = await Promise.all([
                    get(ref(db, `card/${deviceId}/phone`)),
                    get(ref(db, `card/${deviceId}/theme`)).catch(() => null),
                    get(ref(db, `card/${deviceId}/custom`)).catch(() => null),
                ])

                console.log(snap, themeSnap, customSnap)

                setDbTheme(themeSnap?.val() ?? null)
                setDbCustom(customSnap?.val() ?? null)

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
                ownerMessage: customMessage ?? DEFAULT_OWNER_MESSAGE,
            }}
        >
            {children}
        </ParkeContext.Provider>
    )
}
