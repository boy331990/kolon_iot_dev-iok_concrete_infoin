import {useEffect, useState} from "react";

export const useNetwork = onChange => {
    const [status, setStatus] = useState(navigator.onLine || true);
    useEffect(() => {
        const handleChange = () => {
            if (onChange && typeof onChange === "function") {
                onChange(navigator.onLine);
            }
            setStatus(navigator.onLine);
        };
        window.addEventListener("online", handleChange);
        window.addEventListener("offline", handleChange);
        return () => {
            window.removeEventListener("online", handleChange);
            window.removeEventListener("offline", handleChange);
        };
    }, [onChange]);

    return status;
};