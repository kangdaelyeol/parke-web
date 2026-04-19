import { createBrowserRouter } from 'react-router-dom'
import BasePage from '@/pages/base-page'
import Parke from '@/screens/parke'
import NotFound from '@/screens/not-found'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BasePage />,
        children: [
            {
                path: 'parke/:id',
                element: <Parke />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
])
