import { useEffect } from "react";

export function useClickOutside(
    refs: React.RefObject<HTMLElement>[],
    callback: () => void
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickedOutsideAll = refs.every(
                (ref) => ref.current && !ref.current.contains(event.target as Node)
            );
            if (clickedOutsideAll) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs, callback]);
}
