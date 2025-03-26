

export function useLogout() {
    return () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
    };
}