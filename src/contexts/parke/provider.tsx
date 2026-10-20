import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { get, ref } from 'firebase/database'
import { db } from '@/db'
import { getOnAccent, parseCustom, parseLayout, parseTheme } from '@/themes'
import {
    isPreviewMode,
    mergeCards,
    readCardQuery,
    usePreviewMessageCard,
    type RawCard,
} from '@/preview'
import { useToasterMessageContext } from '@/contexts'
import { ParkeContext } from '.'

const DEFAULT_OWNER_MESSAGE = '전화주시면 바로 빼드릴게요.'

export const ParkeContextProvider = ({ children }: PropsWithChildren) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [retryCount, setRetryCount] = useState(0)
    const [dbCard, setDbCard] = useState<RawCard | null>(null)
    const params = useParams()
    const [searchParams] = useSearchParams()

    const { setToasterMessageTimeout, message } = useToasterMessageContext()

    const deviceId = params.id

    // 값의 우선순위: DB < 쿼리 < 앱이 보낸 미리보기 메시지
    // 쿼리는 미리보기 모드에서, 그리고 개발 중 확인용으로 쓴다 (?theme=light&accent=ff5500 ...)
    const preview = isPreviewMode(searchParams)
    const queryCard = useMemo(
        () =>
            preview || import.meta.env.DEV ? readCardQuery(searchParams) : null,
        [preview, searchParams],
    )
    const messageCard = usePreviewMessageCard()
    const card = mergeCards(dbCard, queryCard, preview ? messageCard : null)

    const phone =
        typeof card.phone === 'string' || typeof card.phone === 'number'
            ? String(card.phone)
            : ''
    const title = typeof card.title === 'string' ? card.title : ''
    const theme = parseTheme(card.theme)
    const layout = parseLayout(card.layout)
    const {
        accent,
        scale,
        message: customMessage,
    } = parseCustom({
        // 예전 스키마는 메시지가 최상위에 있다
        message: card.message,
        ...(typeof card.custom === 'object' ? card.custom : null),
    })

    useLayoutEffect(() => {
        document.documentElement.toggleAttribute('data-preview', preview)
        return () => document.documentElement.removeAttribute('data-preview')
    }, [preview])

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
            // 미리보기는 앱이 넘겨준 값만으로 그린다 (DB 를 읽지 않음)
            if (preview) {
                setLoading(false)
                return
            }

            if (!deviceId) {
                setError('연락처를 찾을 수 없어요.')
                setLoading(false)
                return
            }

            setLoading(true)
            setError('')

            try {
                const snap = await get(ref(db, `card/${deviceId}`))

                console.log(snap)

                if (!snap.exists()) {
                    // setError('Error - Try again plz!')
                    setDbCard({ phone: '01024130510' })
                    setLoading(false)
                    return
                }

                setDbCard(snap.val())
            } catch {
                setError('연락처를 불러오지 못했어요.')
            }

            // API calls - get Phone number from db
            setLoading(false)
        })()
    }, [deviceId, retryCount, preview])

    const copyPhone = () => {
        if (!phone || preview) return
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
                layout,
                title,
                ownerMessage: customMessage ?? DEFAULT_OWNER_MESSAGE,
                preview,
            }}
        >
            {children}
        </ParkeContext.Provider>
    )
}
