import { useContext, useEffect } from "react";
import { SimulatorDevice } from "./components/SimulatorCellPhone/SimulatorDevice";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";

export function Presentation() {
    const { setModalContent, clearModal } = useContext(ModalContext);

    useEffect(() => {
        window.addEventListener("wheel", handleFirstScrollUser);

        return () => window.removeEventListener("wheel", handleFirstScrollUser)
    }, [])

    const handleFirstScrollUser = () => {
        setModalContent({
            componentName: "modal_show_simulator_mobile",
            components:
                <PopUp noBackground={true} >
                    <div
                        className="w-screen h-[105vh] flex justify-center items-center bg-black/70"
                        onWheel={handleScrollSimulator}
                    >
                        <SimulatorDevice />
                    </div>
                </PopUp>
        })
        window.removeEventListener("wheel", handleFirstScrollUser)
    }


    const handleScrollSimulator = () => {
        clearModal("modal_show_simulator_mobile")


        setModalContent({
            componentName: "modal_show_simulator_desktop",
            components:
                <PopUp noBackground={true} >
                    <div
                        className="w-screen h-[105vh] flex flex-col gap-4 justify-center items-center bg-black/70"
                        onWheel={()=> { clearModal(null, { clearAll: true }); window.location.href = "#price" }}
                    >
                        <h2 className="uppercase font-bold text-2xl">Veja como é fácil criar um chat na wipzee</h2>
                        <SimulatorDevice isDesktop={true} />
                    </div>
                </PopUp>
        })
    }

    return (
        <section
            id="home"
            className="w-screen h-screen flex flex-col items-center"
        >
            <div className="w-full h-full flex absolute">
                <div className="w-[90vw] h-[80vw] absolute -z-0 -top-[40vw] left-1/2 -translate-x-1/2 bg-gradient-to-b from-primary-100 from-[50%] to-dark to-[95%] rounded-full "> </div>
            </div>

            <div className="w-[80vw] h-full flex flex-col items-center mt-[120px] z-10 space-y-6">
                <h1 className="w-2/3 text-3xl font-bold text-center uppercase ">
                    Automação Completa do Seu Site Com Inteligência Artificial Para Aumentar Suas Vendas e Reduzir Reclamações
                </h1>
                <h2
                    className="text-xl opacity-80"
                >
                    Atendimento rápido e personalizado 24/7. Conheça o poder do chabot da WIPZEE!
                </h2>

                <div className="w-3/5 flex justify-center">
                    <SimulatorDevice />
                </div>

            </div>
        </section>
    )
};