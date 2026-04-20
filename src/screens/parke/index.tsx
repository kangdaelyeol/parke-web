import { ParkeContextProvider, useParkeContext } from '@/contexts'
import { ToasterMessage } from '@/components'
import { Main, Header, Footer } from '@/screens/parke/components'

const ParkeContent = () => {
    const { message } = useParkeContext()

    return (
        <>
            <div className="fixed bg-black h-dvh w-screen">
                <Header />
                <Main />
                <Footer />
            </div>
            <ToasterMessage message={'전화번호가 복사되었습니다.'} />
            {message && <ToasterMessage message={message} />}
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
