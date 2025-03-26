import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/");
    };
}