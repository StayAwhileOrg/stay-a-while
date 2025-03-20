import {Link} from "react-router-dom";
import {Search} from "../UI/Search.tsx";


export function Header() {
    return (
        <header className={"flex items-center justify-between p-4 bg-amber-50"}>
            <Link to={"/"}>LOGO</Link>
            <Search/>
            <Link to={"/admin"}>
                <div className={"flex gap-4 items-center"}>
                    <span>Username</span>
                </div>
            </Link>
        </header>
    )
}

