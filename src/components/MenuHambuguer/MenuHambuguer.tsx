import { RefObject, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom";
import { MOBILE_MENU } from "../../variables/variables";
import { twMerge } from "tailwind-merge";

interface MenuHambuguer {
    className?: string;
}

export function MenuHambuguer({ className }: MenuHambuguer) {
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => 
        handleDisplayMenu(searchParams.get(MOBILE_MENU.URL_NAME) === MOBILE_MENU.DEFAULT_VALUES.OPEN ? true : false), 
    [searchParams.get(MOBILE_MENU.URL_NAME)]);

    const handleClick = () => {
        let isMobileMenu = searchParams.get(MOBILE_MENU.URL_NAME);

        if (!isMobileMenu) {
            searchParams.append(MOBILE_MENU.URL_NAME, MOBILE_MENU.DEFAULT_VALUES.OPEN)
            isMobileMenu = MOBILE_MENU.DEFAULT_VALUES.OPEN
            setSearchParams(searchParams)
        }

        handleDisplayMenu(isMobileMenu === MOBILE_MENU.DEFAULT_VALUES.OPEN ? false : true);
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
                searchParams.set(MOBILE_MENU.URL_NAME, MOBILE_MENU.DEFAULT_VALUES.OPEN);
            } else {
                tab2?.classList.remove("-rotate-45", "-translate-y-[200%]");
                tab1?.classList.remove("hidden");
                tab0?.classList.remove("rotate-45", "translate-y-full");
                searchParams.set(MOBILE_MENU.URL_NAME, MOBILE_MENU.DEFAULT_VALUES.CLOSE);
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