import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider, Outlet, RouteObject} from "react-router-dom";
import {RenderHome, RenderListing, RenderCheckout, RenderBookingSuccessful, RenderRegister, RenderLogin} from "./routes";
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
                path: "/listing",
                element: <RenderListing />
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
        ]
    }
] as RouteObject[]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode> as React.ReactNode
);
