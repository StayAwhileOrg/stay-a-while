import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/api/auth/logout.tsx";

import {MdClose} from "react-icons/md";

interface UserAvatarProps {
    user: {
        imgUrl: string;
        firstName: string;
    };
    dropdownVisible: boolean;
    setDropdownVisible: (visible: boolean) => void;
    onClose: () => void;
}

export function UserAvatar({ user, dropdownVisible, setDropdownVisible, onClose }: UserAvatarProps) {
   const userDropdownRef = useRef<HTMLDivElement | null>(null);
    const logout = useLogout();
    const handleClose = () => setDropdownVisible(false);

    return (
        <div className={"relative"}>
            <div className={"flex gap-2 items-center"}>
                <button onClick={() => setDropdownVisible(!dropdownVisible)}
                        className="flex items-center gap-2 cursor-pointer">
                    <span>{user.firstName}</span>
                    <img className={"w-10 h-10 rounded-full object-cover"} src={user.imgUrl}
                         alt="Image Avatar"/>
                </button>
            </div>
            {dropdownVisible && (
                <div
                     className={"bg-[#E2E7E1] text-sm right-0 z-20 p-5 pt-20 top-18 lg:top-24 h-screen w-screen fixed mt-2 dropdown shadow-md flex flex-col gap-4 items-center lg:w-fit lg:px-20 lg:py-20"}>
                    <button
                        onClick={handleClose}
                        className={"absolute right-0 top-0 m-6 bg-[#2D4B48] text-lg text-white border-2 border-[#2D4B4880] rounded-full p-2 cursor-pointer hover:bg-white hover:text-[#2D4B48]"}>
                        <MdClose/>
                    </button>
                    <Link to={"/profile/"}>
                        <button
                            className="w-[110px] cursor-pointer flex justify-center text-left hover:bg-gray-100 bg-white border-2 border-[#2D4B4880] rounded-full p-2 px-2 text-[#2D4B48]">
                            Profile Page
                        </button>
                    </Link>
                    <Link to={"/manageBookings"}>
                        <button
                            className="w-[110px] cursor-pointer flex justify-center text-left p-2 bg-white border-2 border-[#2D4B4880] rounded-full px-2 text-[#2D4B48] hover:bg-gray-100">
                            My Bookings
                        </button>
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                            window.location.href = "/";
                        }}
                        className="flex w-[110px] justify-center items-center cursor-pointer text-left p-2 bg-[#2D4B48] text-white rounded-full hover:bg-gray-100 border border-[#2D4B48] hover:text-[#2D4B48] hover:border-2 hover:border-[#2D4B4880]">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
