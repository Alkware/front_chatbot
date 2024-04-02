import imgRobo from "../../../../../../assests/robo-home.svg"
import { Button } from "../../../../../../components/button/Button"
import smileFace from "../../../../../../assests/ballon-conversation.svg"
import { useNavigate } from "react-router-dom"
import { FaAsterisk } from "react-icons/fa"


export function Presentation() {
    const navigate = useNavigate();

    return (
        <section
            id="home"
            className="w-full h-screen flex flex-col items-center justify-center relative bg-[url(https://i.ibb.co/2vrnfCz/Untitled-design-8.png)] dark:bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover"
        >
            <div className="w-full px-4 max-w-[1300px] flex gap-4 items-center">

                <div className="w-3/5 flex flex-col gap-4 px-4 z-10 leave-page-left ">

                    <h1 className="w-full text-2xl lg:text-3xl font-bold uppercase font-sans animate-jump-screen">
                        Transforme seu atendimento e <br /> venda mais com o
                        <span className="ml-1 px-2 bg-red-500 text-white font-bold rounded-md animate-jump-screen">nosso chat inteligente</span>
                    </h1>

                    <h2
                        className="text-lg lg:text-xl opacity-70 animate-display-screen text-primary-200 dark:text-light"
                    >Descubra a solução ideal para otimizar suas vendas e reduzir reclamações, de forma simples e eficiente com o uso da inteligênia artificial.
                    </h2>


                    <h3
                        className="text-lg lg:text-xl opacity-70 animate-display-screen uppercase font-medium text-primary-200 dark:text-light"
                    >
                        Simplifique seu negócio com o link inteligente da wipzee!
                    </h3>

                    <Button
                        customClass="neon-effect w-full rounded-sm text-xl font-bold my-8 uppercase"
                        onClick={() => navigate("/create-first-link")}
                    >Crie seu link agora</Button>
                </div>
                <div className="w-2/5 flex flex-col items-center justify-center pt-12 relative z-10 leave-page-right ">
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
                            key={indexContainer}
                            style={{ paddingLeft: `${(indexContainer) * 4}vw`, justifyContent: `${indexContainer < 2 ? "space-between" : indexContainer < 4 ? "space-evenly" : "space-around"}` }}
                        >
                            {
                                Array.from({ length: 4 }).map((_, index) =>
                                    indexContainer % 2 ?
                                        <FaAsterisk
                                            key={index}
                                            data-animate={index === 0 ? 1 : index}
                                            className="fill-primary-100 text-sm data-[animate='1']:animate-rising-10 data-[animate='2']:animate-rising-14 data-[animate='3']:animate-rising-18 z-0 opacity-15"
                                        />
                                        :
                                        <FaAsterisk
                                            key={index}
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
            <div
                className="w-[70px] absolute bottom-10 right-10 z-50 cursor-pointer leave-page-right "
                onClick={() => window.open("https://wa.link/m6ozgl")}
            >
                <span
                    className="absolute w-[150px] -translate-x-1/4 -top-[25px] font-bold"
                >Precisa de ajuda?</span>
                <img
                    src={smileFace}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    )
}