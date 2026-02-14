import { useEffect, useState } from "react";

const breakPoints = {
    640: "sm",
    768: "md",
    1024: "lg",
    1260: "xl",
    1536: "2xl"
};

export const isSmall = (breakPoints: string): boolean => {
    return breakPoints === 'sm';
}

export const isMedium = (breakPoints: string): boolean => {
    return breakPoints === 'md';
}

export const isLarge = (breakPoints: string): boolean => {
    return breakPoints === 'lg';
}

export const isXLarge = (breakPoints: string): boolean => {
    return breakPoints === 'xl';
}

export const is2XLarge = (breakPoints: string): boolean => {
    return breakPoints === '2xl';
}

export const userBreakingPoint = () => {
    const [breakPoint, setBreakPoint] = useState("");
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        if (windowSize.width <= 640) {
            setBreakPoint(breakPoints[640]);
        } else if (windowSize.width <= 768) {
            setBreakPoint(breakPoints[768]);
        } else if (windowSize.width <= 1024) {
            setBreakPoint(breakPoints[1024]);
        } else if (windowSize.width <= 1280) {
            setBreakPoint(breakPoints[1260]);
        } else {
            setBreakPoint(breakPoints[1536]);
        }
        return ()=> window.removeEventListener("resize",handleResize)
    },[windowSize.width])

    return breakPoint;
};
