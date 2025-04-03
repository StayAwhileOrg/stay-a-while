import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider, Outlet, RouteObject} from "react-router-dom";
import {
    RenderHome,
    RenderCabin,
    RenderCheckout,
    RenderBookingSuccessful,
    RenderRegister,
    RenderLogin,
    RenderProfile,
    RenderEditCabin,
    RenderManageBookings,
    RenderPostCabin,
} from "./routes";
import {Header, Footer} from "./components/Layout";
import {FilterResults} from "./components/UI/filterResults.tsx";

const Layout = () => (
    <>
      <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </>
)

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <RenderHome />,
            },
            {
                path: '/cabin/:id',
                element: <RenderCabin />,
            },
            {
                path: '/checkout',
                element: <RenderCheckout />,
            },
            {
                path: '/bookingsuccess',
                element: <RenderBookingSuccessful />,
            },
            {
                path: '/register',
                element: <RenderRegister />,
            },
            {
                path: '/login',
                element: <RenderLogin />,
            },
            {
                path: '/profile',
                element: <RenderProfile />,
            },
            {
                path: '/cabin/edit/:id',
                element: <RenderEditCabin />,
            },
            {
                path: "/manageBookings/:bookingId",
                element: <RenderManageBookings />
            },
            {
                path: '/cabin/post',
                element: <RenderPostCabin />,
            },
            {
                path: '/filterResults',
                element: <FilterResults />,
            }
        ],
    },
] as RouteObject[]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode> as React.ReactNode
);
