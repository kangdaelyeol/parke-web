import { useEffect, useState } from 'react'

const HINT_DURATION = 6000

// 복사 안내는 잠시 보여준 뒤 스스로 사라진다 - 한 번 복사하면 바로 닫힘
export const useCopyHint = (loading: boolean, copied: boolean) => {
    const [dismissed, setDismissed] = useState(false)

    useEffect(() => {
        if (loading) return
        const timerId = setTimeout(() => setDismissed(true), HINT_DURATION)
        return () => clearTimeout(timerId)
    }, [loading])

    useEffect(() => {
        if (copied) setDismissed(true)
    }, [copied])

    return { hintVisible: !dismissed }
}
