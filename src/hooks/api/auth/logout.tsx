import { useCallback } from "react";

export function useLogout(): () => void {
    return useCallback(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
    }, []);
}
