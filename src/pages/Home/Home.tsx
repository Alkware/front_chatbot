import { RefObject, useEffect, useRef } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";
import { saveGuest } from "../../api/guest.api";

export function Home() {
    const homeRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const isDark = localStorage.theme === "dark"
        document.documentElement.classList.toggle("dark", !!isDark);

        // Salva o convidado no banco de dados...
        saveGuest();
    }, [])

    return (
        <div
            ref={homeRef}
            className="w-screen dark:bg-dark bg-light dark:text-light text-primary-100 relative flex flex-col justify-center items-center"
        >
            <Header />
            <Main />
            <Footer />
        </div>
    )
}
