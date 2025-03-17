import {Link} from "react-router-dom";

export function Header() {
    return(
        <header>
            <Link to="">Home</Link>
            <Link to="/cabin">Cabin</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">register</Link>
            <Link to="/bookingsuccess">BookingSuccess</Link>
        </header>
    )
}