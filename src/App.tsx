import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { ToasterMessageProvider } from '@/contexts/toaster-message-context'

export default function App() {
    return (
        <ToasterMessageProvider>
            <RouterProvider router={router} />
        </ToasterMessageProvider>
    )
}
