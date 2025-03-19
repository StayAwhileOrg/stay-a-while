import {Link} from "react-router-dom";
import {Search} from "../UI/Search.tsx";


export function Header() {
    return (
        <header className={"flex items-center justify-between p-4 bg-[#A1B19E30]"}>
            <div>LOGO</div>
            <Search/>
            <div className={"flex gap-4 items-center"}>
                <span>User name</span>
                <img className={"bg-amber-600 rounded-full w-8 h-8"} src="" alt=""/>
            </div>
        </header>
    )
}

