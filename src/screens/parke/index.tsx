import { useSearchParams } from 'react-router-dom'
import { ParkeContextProvider, useParkeContext } from '@/contexts'
import { ToasterMessage } from '@/components'
import { Main, Header, Footer } from '@/screens/parke/components'
import { DraftB, DraftC, DraftD, DraftSwitcher } from '@/screens/parke/drafts'

// 레이아웃 - card/{id}/layout 값으로 고른다. A는 기본 화면, ?v=a|b|c|d 로 덮어써서 확인할 수 있다
const DRAFTS: Partial<Record<string, () => React.JSX.Element>> = {
    b: DraftB,
    c: DraftC,
    d: DraftD,
}

// 복사 피드백을 화면 안에서 직접 보여주는 시안
const INLINE_COPY_FEEDBACK = ['b', 'c', 'd']

const ParkeContent = () => {
    const { message, layout, preview, loading } = useParkeContext()
    const [searchParams] = useSearchParams()
    const version = searchParams.get('v') ?? layout
    const Draft = DRAFTS[version]

    // 레이아웃은 카드 데이터와 함께 오므로, 정해지기 전에는 다른 레이아웃이 잠깐 보이지 않도록 배경만 칠한다
    if (loading && !searchParams.has('v')) {
        return <div className="fixed inset-0 bg-surface" />
    }

    return (
        <>
            <div key={Draft ? version : 'a'} className="draft-page">
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
            {!preview && (import.meta.env.DEV || searchParams.has('v')) && (
                <DraftSwitcher />
            )}
            {message && !INLINE_COPY_FEEDBACK.includes(version) && (
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
