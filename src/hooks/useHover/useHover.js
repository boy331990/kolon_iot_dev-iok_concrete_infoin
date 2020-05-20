import {useEffect, useRef} from "react";

export const useHover = onHover => {
    const element = useRef();
    useEffect(() => {
        const addEventListener = () => {
            element.current.addEventListener("mouseenter", onHover);
            return () => {
                element.current.removeEventListener("mouseenter", onHover);
            };
        }
        if (element.current) {
            addEventListener();
        }
    }, [onHover]);

    return element;
};