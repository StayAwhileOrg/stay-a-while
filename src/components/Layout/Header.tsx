import {Link} from "react-router-dom";
import {Search} from "../UI/Search.tsx";
import {useAuth} from "../../hooks/auth/useAuth.tsx";
import {useState, useEffect} from "react";

export function Header() {
    const [isVisible, setIsVisible] = useState(false);

    const isAuthenticated = useAuth();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        document.body.style.overflow = isVisible ? "hidden" : "visible";
    }, [isVisible]);



    return (
        <header className={"flex flex-col px-6"}>
            <div className={"flex items-center justify-between p-4 bg-white relative"}>
                <Link to={"/"}>
                    <img src="/src/assets/Logo.png" alt="Stay A While Logo"/>
                </Link>
                <Search/>
                {isAuthenticated && (
                    <div className={"flex gap-2 items-center relative"}>
                        <button  onClick={() => setIsVisible(!isVisible)}
                                 className="flex items-center gap-2 cursor-pointer">
                            <img className={"w-10 h-10 object-center rounded-full"} src={user.imgUrl} alt="Image Avatar"/>
                            <span>{user.firstName}</span>
                        </button>
                        {isVisible && (
                            <div className={"absolute text-sm right-0 z-10 p-5 top-full mt-2 dropdown bg-white border border-[#2D4B4880] shadow-md rounded flex flex-col gap-4 w-[200px] items-center"}>
                                <Link to={"/admin/"}>
                                    <button className="w-[110px] cursor-pointer flex justify-center text-left p-2 bg-white hover:bg-gray-100 border border-[#2D4B4880]">Profile Page</button>
                                </Link>
                                <Link to={"/manageBookings"}>
                                    <button className="w-[110px] cursor-pointer flex justify-center text-left p-2 bg-white hover:bg-gray-100 border border-[#2D4B4880]">My Bookings</button>
                                </Link>
                                <button className="flex w-[110px] justify-center items-center cursor-pointer text-left p-2 bg-white hover:bg-gray-100 border border-[#2D4B4880]">Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={"w-full h-[1px] bg-[#2D4B4860]"}></div>
        </header>
    )
}

