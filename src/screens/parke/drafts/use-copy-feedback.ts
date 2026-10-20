import { useEffect, useRef, useState } from 'react'

const DEFAULT_DURATION = 1600

// 복사 직후 잠시 "복사됨" 상태를 유지한다
export const useCopyFeedback = (
    copy: () => void,
    disabled: boolean,
    duration = DEFAULT_DURATION,
) => {
    const [copied, setCopied] = useState(false)
    const timerId = useRef<number | null>(null)

    useEffect(
        () => () => {
            if (timerId.current) clearTimeout(timerId.current)
        },
        [],
    )

    const handleCopy = () => {
        if (disabled) return
        copy()
        navigator.vibrate?.(10)
        setCopied(true)
        if (timerId.current) clearTimeout(timerId.current)
        timerId.current = window.setTimeout(() => setCopied(false), duration)
    }

    return { copied, handleCopy }
}
