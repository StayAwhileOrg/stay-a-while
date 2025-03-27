import { useRef } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside/useClickOutside.tsx";
import { useLogout } from "../../hooks/api/auth/logout.tsx";

interface UserAvatarProps {
    user: {
        imgUrl: string;
        firstName: string;
    };
    dropdownVisible: boolean;
    setDropdownVisible: (visible: boolean) => void;
}

export function UserAvatar({ user, dropdownVisible, setDropdownVisible }: UserAvatarProps) {
    const userDropdownRef = useRef<HTMLDivElement | null>(null);
    const logout = useLogout();

    useClickOutside(userDropdownRef, () => setDropdownVisible(false));

    return (
        <div className={"flex gap-2 items-center relative"}>
            <button onClick={() => setDropdownVisible(!dropdownVisible)}
                    className="flex items-center gap-2 cursor-pointer">
                <span>{user.firstName}</span>
                <img className={"w-10 h-10 rounded-full object-cover"} src={user.imgUrl}
                     alt="Image Avatar"/>
            </button>

            {dropdownVisible && (
                <div ref={userDropdownRef}
                     className={"absolute text-sm right-0 z-10 p-5 top-full mt-2 dropdown bg-white border border-[#2D4B4880] shadow-md rounded flex flex-col gap-4 w-[200px] items-center"}>
                    <Link to={"/profile/"}>
                        <button
                            className="w-[110px] cursor-pointer flex justify-center text-left p-2 bg-white hover:bg-gray-100 border border-[#2D4B4880]">
                            Profile Page
                        </button>
                    </Link>
                    <Link to={"/manageBookings"}>
                        <button
                            className="w-[110px] cursor-pointer flex justify-center text-left p-2 bg-white hover:bg-gray-100 border border-[#2D4B4880]">
                            My Bookings
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
    );
}
