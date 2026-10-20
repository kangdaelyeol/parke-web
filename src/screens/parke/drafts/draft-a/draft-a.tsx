// 레이아웃 A - 기본 화면: 번호 테두리를 도는 빛, 은은한 배경 글로우
import './draft-a.css'
import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'

export const DraftA = () => (
    <div className="fixed bg-surface h-dvh w-screen">
        <Header />
        <Main />
        <Footer />
    </div>
)
