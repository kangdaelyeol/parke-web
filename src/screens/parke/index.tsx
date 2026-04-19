import { ParkeContextProvider, useParkeContext } from '@/contexts'
import { ToasterMessage } from '@/components'
import { Main, Header, Footer } from '@/screens/parke/components'

const ParkeContent = () => {
    const { message } = useParkeContext()

    return (
        <>
            <div className="bg-black min-h-screen">
                <Header />
                <Main />
                <Footer />
            </div>
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
