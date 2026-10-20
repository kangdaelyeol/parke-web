import { useSearchParams } from 'react-router-dom'
import { ParkeContextProvider, useParkeContext } from '@/contexts'
import { ToasterMessage } from '@/components'
import { Main, Header, Footer } from '@/screens/parke/components'
import { DraftA, DraftB, DraftC, DraftSwitcher } from '@/screens/parke/drafts'

// 임시 시안 - ?v=a|b|c 로 확인, 시안 확정 후 삭제
const DRAFTS: Record<string, () => React.JSX.Element> = {
    a: DraftA,
    b: DraftB,
    c: DraftC,
}

// 복사 피드백을 화면 안에서 직접 보여주는 시안
const INLINE_COPY_FEEDBACK = ['a', 'b', 'c']

const ParkeContent = () => {
    const { message } = useParkeContext()
    const [searchParams] = useSearchParams()
    const version = searchParams.get('v')
    const Draft = version ? DRAFTS[version] : undefined

    return (
        <>
            <div key={version ?? 'current'} className="draft-page">
                {Draft ? (
                    <Draft />
                ) : (
                    <div className="fixed bg-surface h-dvh w-screen">
                        <Header />
                        <Main />
                        <Footer />
                    </div>
                )}
            </div>
            {(import.meta.env.DEV || version) && <DraftSwitcher />}
            {message && !INLINE_COPY_FEEDBACK.includes(version ?? '') && (
                <ToasterMessage message={message} />
            )}
        </>
    )
}

export default function Parke() {
    return (
        <ParkeContextProvider>
            <ParkeContent />
        </ParkeContextProvider>
    )
}
