import { useSearchParams } from 'react-router-dom'
import { ParkeContextProvider, useParkeContext } from '@/contexts'
import { ToasterMessage } from '@/components'
import {
    DraftA,
    DraftB,
    DraftC,
    DraftD,
    DraftSwitcher,
} from '@/screens/parke/drafts'

// 레이아웃 - card/{id}/layout 값으로 고른다 (없거나 모르는 값이면 A)
const DRAFTS: Partial<Record<string, () => React.JSX.Element>> = {
    a: DraftA,
    b: DraftB,
    c: DraftC,
    d: DraftD,
}

// 복사 피드백을 화면 안에서 직접 보여주는 시안
const INLINE_COPY_FEEDBACK = ['b', 'c', 'd']

const ParkeContent = () => {
    const { message, layout, preview, loading } = useParkeContext()
    const [searchParams] = useSearchParams()
    // 개발 서버에서만 ?v=a|b|c|d 로 레이아웃을 덮어써서 디자인을 비교한다 (배포 빌드에서는 무시)
    const devLayout = import.meta.env.DEV ? searchParams.get('v') : null
    const version = devLayout ?? layout
    const Draft = DRAFTS[version] ?? DraftA

    // 레이아웃은 카드 데이터와 함께 오므로, 정해지기 전에는 다른 레이아웃이 잠깐 보이지 않도록 배경만 칠한다
    if (loading && !devLayout) {
        return <div className="fixed inset-0 bg-surface" />
    }

    return (
        <>
            <div key={version} className="draft-page">
                <Draft />
            </div>
            {/* 디자인 비교용 A~D 전환 버튼 - 개발 서버 전용 (배포 빌드에서는 코드째 빠진다) */}
            {import.meta.env.DEV && !preview && <DraftSwitcher />}
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
