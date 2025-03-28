import {Link} from "react-router-dom";
import {Search} from "../UI/Search.tsx";
import {useState, useEffect, useRef} from "react";
import {UserAvatar} from "../UI/UserAvatar.tsx";
import {CiSearch} from "react-icons/ci";

export function Header() {
    const token = localStorage.getItem("token");
    const isAuthenticated: boolean = !!token;
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        document.body.style.overflow = dropdownVisible || searchVisible ? "hidden" : "visible";
    }, [dropdownVisible, searchVisible]);

    return (
        <header className={"flex flex-col lg:px-6 relative"}>
            <div className={"flex items-center justify-between px-4 bg-white relative"}>
                <Link to={"/"}>
                    <img src="/src/assets/Logo.png" alt="Stay A While Logo"/>
                </Link>
                <div className={"flex items-center gap-6"}>
                    {/* Search toggle button (mobile only) */}
                    <button
                        onClick={() => setSearchVisible(prev => !prev)}
                        type="button"
                        className={"bg-[#2D4B48] border-2 border-[#2D4B4880] rounded-full p-2 cursor-pointer px-2 lg:hidden"}>
                        <CiSearch className={"h-[22px] w-[22px] text-white bg-transparent"}/>
                    </button>

                    {/* Search bar (always visible on lg+, conditionally visible on mobile) */}
                    <div className={`absolute top-full lg:relative ${searchVisible ? 'block' : 'hidden'} lg:block`}>
                        <Search onClose={() => setSearchVisible(false)}/>
                    </div>

                    {/* User avatar or login button */}
                    {isAuthenticated ? (
                        <UserAvatar
                            user={user}
                            dropdownVisible={dropdownVisible}
                            setDropdownVisible={setDropdownVisible}
                        />
                    ) : (
                        <Link to="/login">
                            <button
                                className="bg-[#2D4B48] text-white px-4 py-2 rounded-full hover:bg-[#3f6461]">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
            <div className={"w-full h-[1px] bg-[#2D4B4860]"}></div>
        </header>
    )
}