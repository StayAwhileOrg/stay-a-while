import {Link} from "react-router-dom";
import {Search} from "../UI/Search.tsx";
import {useState, useEffect, useRef} from "react";
import {useLogout} from "../../hooks/api/auth/logout.tsx";
import {useClickOutside} from "../../hooks/useClickOutside/useClickOutside.tsx";

export function Header() {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(userDropdownRef, () => setDropdownVisible(false));

    useEffect(() => {
        document.body.style.overflow = dropdownVisible ? "hidden" : "visible";
    }, [dropdownVisible]);

    const logout = useLogout();

    return (
        <header className={"flex flex-col px-6"}>
            <div className={"flex items-center justify-between p-4 bg-white relative"}>
                <Link to={"/"}>
                    <img src="/src/assets/Logo.png" alt="Stay A While Logo"/>
                </Link>
                <Search/>
                {isAuthenticated ? (
                    <div className={"flex gap-2 items-center relative"}>
                        <button onClick={() => setDropdownVisible(!dropdownVisible)}
                                className="flex items-center gap-2 cursor-pointer">
                            <img className={"w-10 h-10 object-center rounded-full"} src={user.imgUrl}
                                 alt="Image Avatar"/>
                            <span>{user.firstName}</span>
                        </button>
                        {dropdownVisible && (
                            <div ref={userDropdownRef}
                                className={"absolute text-sm right-0 z-10 p-5 top-full mt-2 dropdown bg-white border border-[#2D4B4880] shadow-md rounded flex flex-col gap-4 w-[200px] items-center"}>
                                <Link to={"/admin/"}>
                                    <button
                                        className="w-[110px] cursor-pointer flex justify-center text-left p-2 bg-white hover:bg-gray-100 border border-[#2D4B4880]">Profile
                                        Page
                                    </button>
                                </Link>
                                <Link to={"/manageBookings"}>
                                    <button
                                        className="w-[110px] cursor-pointer flex justify-center text-left p-2 bg-white hover:bg-gray-100 border border-[#2D4B4880]">My
                                        Bookings
                                    </button>
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        window.location.href = "/";
                                    }}
                                    className="flex w-[110px] justify-center items-center cursor-pointer text-left p-2 bg-white hover:bg-gray-100 border border-[#2D4B4880]">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login">
                        <button
                            className="bg-[#2D4B48] text-white px-4 py-2 rounded hover:bg-[#3f6461] transition-colors">
                            Login
                        </button>
                    </Link>
                )}
            </div>
            <div className={"w-full h-[1px] bg-[#2D4B4860]"}></div>
        </header>
    )
}

