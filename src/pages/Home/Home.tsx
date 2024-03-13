import { RefObject, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { SimulatorDevice } from "./components/Main/components/Presentation/components/SimulatorDevice/SimulatorDevice";
import { SimulatorPanel } from "./components/Main/components/Presentation/components/SimulatorPanel/SimulatorPanel";

function Index() {
    const homeRef: RefObject<HTMLDivElement> = useRef(null);
    const [step, setStep] = useState("0");

    useEffect(() => {
        const isDark = localStorage.theme === "dark"
        document.documentElement.classList.toggle("dark", !!isDark);

        const container = homeRef.current;
        container?.addEventListener("scroll", handleControllStepUser);

        return () => container?.removeEventListener("scroll", handleControllStepUser);
    }, [step])


    function handleControllStepUser() {
        const container = homeRef.current;
        if (container) {
            const currentScroll = container.scrollTop;
            let userStep;
            if (currentScroll >= 100 && step === "0") {
                userStep = "1";
                container?.removeEventListener("scroll", handleControllStepUser)
            }
            if (currentScroll >= 150) {
                userStep = "2"
                container?.removeEventListener("scroll", handleControllStepUser)
            }

            if (userStep) {
                setStep(userStep)
            }
        }

    }

    return (
        <div
            ref={homeRef}
            className="w-screen h-screen overflow-x-hidden scroll-smooth dark:bg-dark bg-light dark:text-light text-gray relative"
        >
            <Header />
            <Main />

            <div
                data-displayfirststep={step === "1"}
                className="z-50 w-full h-full flex justify-center items-center absolute top-[100px] data-[displayfirststep=false]:hidden bg-black/50"
            >
                <div className="shadow-md rounded-3xl shadow-white animate-display-screen">
                    <SimulatorDevice />
                </div>
            </div>
            <div
                data-displayfirststep={step === "2"}
                className="z-50 w-full h-full flex justify-center items-center absolute top-[150px] data-[displayfirststep=false]:hidden bg-dark/70"
            >
                <SimulatorPanel />
            </div>
        </div>
    )
}

export default Index;