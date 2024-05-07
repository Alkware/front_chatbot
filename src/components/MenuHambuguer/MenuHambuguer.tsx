import { RefObject, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface MenuHambuguer {
    urlParamName: string,
    className?: string;
}

export function MenuHambuguer({ urlParamName, className }: MenuHambuguer) {
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => 
        handleDisplayMenu(searchParams.get(urlParamName) === "open" ? true : false), 
    [searchParams.get(urlParamName)]);

    const handleClick = () => {
        let isMobileMenu = searchParams.get(urlParamName);

        if (!isMobileMenu) {
            searchParams.append(urlParamName, "open")
            isMobileMenu = "open"
            setSearchParams(searchParams)
        }

        handleDisplayMenu(isMobileMenu === "open" ? false : true);
    }

    const handleDisplayMenu = (isOpen: boolean) => {
        const container = containerRef.current;

        if (container) {
            const tab2 = container.querySelector("span[tabindex='2']");
            const tab1 = container.querySelector("span[tabindex='1']");
            const tab0 = container.querySelector("span[tabindex='0']");

            if (isOpen) {
                tab2?.classList.add("-rotate-45", "-translate-y-[200%]");
                tab1?.classList.add("hidden");
                tab0?.classList.add("rotate-45", "translate-y-full");
                searchParams.set(urlParamName, "open");
            } else {
                tab2?.classList.remove("-rotate-45", "-translate-y-[200%]");
                tab1?.classList.remove("hidden");
                tab0?.classList.remove("rotate-45", "translate-y-full");
                searchParams.set(urlParamName, "close");
            }

            setSearchParams(searchParams)
        }
    }

    return (
        <div
            ref={containerRef}
            className={twMerge("w-24 flex flex-col gap-2 p-4", className)}
            onClick={handleClick}
        >
            <span
                tabIndex={0}
                className="bg-light w-11 h-1 transition-transform duration-500"
            ></span>
            <span
                tabIndex={1}
                className="bg-light w-11 h-1 transition-transform duration-500"
            ></span>
            <span
                tabIndex={2}
                className="bg-light w-11 h-1 transition-transform duration-500"
            ></span>
        </div>
    )
};