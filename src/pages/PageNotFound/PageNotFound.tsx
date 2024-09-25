import { Header } from "../Home/components/Header/Header";
import errorImg from "../../assests/404-error.svg";
import { useEffect } from "react";
import { setThemePage } from "../../functions/setThemePage";

interface PageNotFound { }

export function PageNotFound({ }: PageNotFound) {

    useEffect(()=>{
        setThemePage();
    },[])

    return (
        <div className="w-screen h-screen grid place-items-center bg-light dark:bg-dark">
            <Header />
            <div className="space-y-4">
                <img src={errorImg} alt="Página não encontrada" />
                <h2 className="text-3xl text-dark dark:text-light">Página não encontrada.</h2>
            </div>
        </div>
    )
};