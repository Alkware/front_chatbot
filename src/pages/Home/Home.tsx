import { RefObject, useEffect, useRef } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";

function Index() {
    const homeRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const isDark = localStorage.theme === "dark"
        document.documentElement.classList.toggle("dark", !!isDark);
    }, [])

    return (
        <div
            ref={homeRef}
            className="w-screen h-screen overflow-x-hidden scroll-smooth dark:bg-black bg-light dark:text-light text-gray relative flex justify-center"
        >
            <div className="w-full h-full absolute top-0 left-0  bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover -z-1"></div>
            <Header />
            <Main />
        </div>
    )
}

export default Index;