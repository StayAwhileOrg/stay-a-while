import {Link} from "react-router-dom";
import {Search} from "../UI/Search.tsx";
import {useAuth} from "../../hooks/auth/useAuth.tsx";

export function Header() {

 const isAuthenticated = useAuth();

    return (
        <header className={"flex items-center justify-between p-4 bg-amber-50 relative"}>
            <Link to={"/"}>LOGO</Link>
            <Search/>
            {isAuthenticated && (
                <Link to={"/admin"}>
                    <div className={"flex gap-4 items-center"}>
                        <span>Username</span>
                    </div>
                </Link>
                )}
        </header>
    )
}

