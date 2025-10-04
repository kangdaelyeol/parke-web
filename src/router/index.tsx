import { createBrowserRouter } from 'react-router-dom'
import BasePage from '@/pages/base-page'
import Main from '@/components/main'
import NotFound from '@/components/not-found'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BasePage />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
])
