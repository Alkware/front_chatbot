import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";

function Index() {

    useEffect(()=>{
        const isDark = localStorage.theme === "dark"
        document.documentElement.classList.toggle("dark", !!isDark)
    }, [])

    return (
        <div
            className="w-screen h-screen overflow-x-hidden scroll-smooth dark:bg-dark bg-light dark:text-light text-gray"
        >
            <Header />
            <Main />
        </div>
    )
}

export default Index;