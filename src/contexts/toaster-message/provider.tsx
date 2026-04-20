import { useRef, useState, type PropsWithChildren } from 'react'
import { ToasterMessageContext } from '.'

export const ToasterMessageProvider = ({ children }: PropsWithChildren) => {
    const [message, setMessage] = useState('')
    const timerId = useRef<number | null>(null)

    const setToasterMessageTimeout = (message: string) => {
        if (timerId?.current) return

        timerId.current = setTimeout(() => {
            setMessage('')
            timerId.current = null
        }, 1500)

        setMessage(message)
    }

    return (
        <ToasterMessageContext.Provider
            value={{ message, setToasterMessageTimeout }}
        >
            {children}
        </ToasterMessageContext.Provider>
    )
}
