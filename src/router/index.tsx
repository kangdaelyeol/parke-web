import { createBrowserRouter } from 'react-router-dom'
import BasePage from '@/pages/base-page'
import Main from '@/components/main'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BasePage />,
        children: [
            {
                index: true,
                element: <Main />,
            },
        ],
    },
])
