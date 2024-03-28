import imgRobo from "../../../../../../assests/robo-home.svg"
import { Button } from "../../../../../../components/button/Button"
import { FaStar } from "react-icons/fa6"


export function Presentation() {
    return (
        <section
            id="home"
            className="w-screen h-screen flex flex-col items-center justify-center"
        >
            <div className="w-full px-4 max-w-[1300px] flex gap-4 items-center">

                <div className="w-1/2 flex flex-col gap-4 items-center px-4 z-10">
                    <h1 className="w-full text-4xl lg:text-5xl font-bold uppercase font-sans animate-jump-screen">
                        Transforme seu <br />atendimento
                    </h1>
                    <div className="w-full flex gap-2 items-center">
                        <h2
                            className="text-2xl xl:text-3xl"
                        >
                            Venda mais com um
                        </h2>
                        <span className="text-xl xl:text-3xl lg:text-2xl bg-red-500 font-bold rounded-md animate-jump-screen">único link inteligente</span>
                    </div>
                    <h3
                        className="text-lg lg:text-xl opacity-70 animate-display-screen"
                    >Descubra a solução ideal para otimizar suas vendas e reduzir reclamações, de forma simples e eficiente com o uso da inteligênia artificial.</h3>

                    <Button
                        customClass="neon-effect w-full rounded-sm text-xl font-bold my-8 uppercase"
                    >Crie seu link agora</Button>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center pt-12 relative z-10">
                    <img
                        src={imgRobo}
                        alt=""
                        className="w-full h-full cover"
                    />
                </div>
            </div>
            <div className="max-w-[1000px] w-full flex flex-col absolute bottom-[10vw]">
                {
                    Array.from({ length: 8 }).map((_, indexContainer) =>
                        <div
                            className="w-full flex"
                            style={{ paddingLeft: `${(indexContainer) * 4}vw`, justifyContent: `${indexContainer < 2 ? "space-between" : indexContainer < 4 ? "space-evenly" : "space-around"}` }}
                        >
                            {
                                Array.from({ length: 4 }).map((_, index) =>
                                    indexContainer % 2 ?
                                        <FaStar
                                            data-animate={index === 0 ? 1 : index}
                                            className="fill-primary-100 text-sm data-[animate='1']:animate-rising-10 data-[animate='2']:animate-rising-14 data-[animate='3']:animate-rising-18 z-0 opacity-15"
                                        />
                                        :
                                        <FaStar
                                            data-animate={index === 0 ? 1 : index}
                                            className="fill-primary-100 text-sm data-[animate='1']:animate-rising-reverse-10 data-[animate='2']:animate-rising-reverse-14 data-[animate='3']:animate-rising-reverse-18 z-0 opacity-15"
                                            style={{ margin: `0 ${index}px` }}
                                        />

                                )
                            }
                        </div>
                    )
                }
            </div>
        </section>
    )
};