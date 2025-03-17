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
    RenderAdminDashboard,
    RenderEditCabin,
    RenderManageBookings,
    RenderPostCabin,
} from "./routes";
import {Header, Footer} from "./components/Layout";

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
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <RenderHome />
            },
            {
                path: "/cabin",
                element: <RenderCabin />
            },
            {
                path: "/checkout",
                element: <RenderCheckout />
            },
            {
                path: "/bookingsuccess",
                element: <RenderBookingSuccessful />
            },
            {
                path: "/register",
                element: <RenderRegister />
            },
            {
                path: "/login",
                element: <RenderLogin />
            },
            {
                path: "/admin",
                element: <RenderAdminDashboard />
            },
            {
                path: "/cabin/edit",
                element: <RenderEditCabin />
            },
            {
                path: "/manageBookings",
                element: <RenderManageBookings />
            },
            {
                path: "/cabin/post",
                element: <RenderPostCabin />
            },
        ]
    }
] as RouteObject[]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode> as React.ReactNode
);
