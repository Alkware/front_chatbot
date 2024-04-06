import imgRobo from "../../../../../../assests/robo-home.svg"
import { Button } from "../../../../../../components/button/Button"
// import smileFace from "../../../../../../assests/ballon-conversation.svg"
import { useNavigate } from "react-router-dom"
import { FaAsterisk } from "react-icons/fa"


export function Presentation() {
    const navigate = useNavigate();

    return (
        <section
            id="home"
            className="w-full h-auto md:h-screen flex flex-col items-center justify-center relative bg-[url(https://i.ibb.co/2vrnfCz/Untitled-design-8.png)] dark:bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover"
        >
            <div className="w-full h-full max-w-[1300px] flex flex-col justify-start items-center md:flex-row gap-4">

                <div className="w-full md:w-3/5 h-1/2 md:h-full md:mt-0 mt-[100px] flex flex-col justify-center gap-4 md:pl-6 lg:pl-8 z-20 leave-page-left ">

                    <h1 className="px-2 w-full text-center md:text-left text-lg lg:text-xl xl:text-3xl font-bold uppercase font-sans animate-jump-screen">
                        Transforme seu atendimento e venda mais com o
                        <br className="2xs:hidden" />
                        <span className="ml-1 px-2 bg-red-500 text-white font-bold rounded-md animate-jump-screen">nosso chat inteligente</span>
                    </h1>

                    <h2
                        className="text-center md:text-left text-base max-2xs:text-sm xl:text-xl opacity-70 animate-display-screen text-primary-200 dark:text-light"
                    >Descubra a solução ideal para otimizar suas vendas e reduzir reclamações, de forma simples e eficiente com o uso da inteligênia artificial.
                    </h2>
                    <h3
                        className="text-center md:text-left text-sm lg:text-base xl:text-xl opacity-70 animate-display-screen uppercase font-semibold text-primary-200 dark:text-light"
                    >
                        Simplifique seu negócio com o link inteligente da wipzee!
                    </h3>

                    <Button
                        customClass="neon-effect-hover mx-auto text-base md:text-lg lg:text-xl font-bold my-0 md:my-8 uppercase"
                        onClick={() => navigate("/register")}
                    >Crie seu link agora</Button>
                </div>

                <div className="w-full h-2/5 md:w-2/5 flex justify-center items-start md:items-center md:justify-center pt-0 md:pt-12 relative z-10 leave-page-right ">
                    <img
                        src={imgRobo}
                        alt=""
                        className="w-full h-full object-contain"
                    />
                </div>

            </div>

            <div className="w-[80vw] flex flex-col absolute bottom-[10vw]">
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

            {/* <div
                className="w-[70px] absolute bottom-2 lg:bottom-10 right-8 z-50 cursor-pointer leave-page-right "
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
            </div> */}
        </section>
    )
}