import { MdAlarm, MdBattery50, MdSignalCellular3Bar } from "react-icons/md";

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

                    <div className="w-1/2 border-[20px] border-dark rounded-[2rem] bg-dark  mt-12">
                        <div className="w-full h-full bg-zinc-800 rounded-2xl overflow-hidden flex flex-col">
                            <div className="w-full flex justify-around ">
                                <div className="flex w-1/4 px-4 p-1">
                                    <MdAlarm className="text-xl fill-light" />
                                </div>
                                <div className="w-1/2 h-[30px] bg-dark rounded-b-2xl flex justify-evenly items-center gap-4">
                                    <div className="w-1/5 h-1/3 rounded-2xl bg-zinc-600"></div>
                                    <div className="w-1/12 h-1/3 rounded-2xl bg-zinc-600"></div>
                                </div>
                                <div className="w-1/4 flex gap-2 justify-end px-4 p-1">
                                    <MdSignalCellular3Bar className="text-xl fill-light" />
                                    <MdBattery50 className="text-xl fill-light" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <div className="w-full h-[70px] bg-primary-100 flex gap-4 items-center px-4">
                                    <img
                                        src="https://i.ibb.co/fDrW4c8/liange.jpg"
                                        alt="foto de mulher para suporte"
                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="font-bold text-lg">Suporte rápido e inteligente</h2>
                                        <span className="text-sm opacity-80">Digitando...</span>
                                    </div>
                                </div>
                                <div className="w-full h-[450px] bg-primary-200 bg-primary-100/70">

                                </div>
                                <div className="w-full h-[100px] bg-primary-100/80"></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
};