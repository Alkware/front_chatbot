import { SimulatorDevice } from "./components/SimulatorDevice/SimulatorDevice";
export function Presentation() {
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