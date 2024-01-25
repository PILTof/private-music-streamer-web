import {Navigate, createBrowserRouter} from 'react-router-dom';
import AuthPage from '../pages/AuthPage/AuthPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import DefaultLayout from '../pages/Layouts/Default/DafaultLayout.jsx'
import Test from '../pages/test/Test';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout></DefaultLayout>,
        children: [
            {
                path: '/',
                element: <Navigate to={'/auth'}></Navigate>
            },
            {
                path: '/test',
                element: <Test></Test>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthPage></AuthPage>
    },
    {
        path: '/admin',
        element: <AdminPage></AdminPage>
    }
])

export default router;