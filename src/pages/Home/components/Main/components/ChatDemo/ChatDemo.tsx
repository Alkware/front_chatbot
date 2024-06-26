import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../components/button/Button";
import { SimulatorMobile } from "./components/SimulatorMobile/SimuladorMobile"

export function ChatDemo() {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-auto md:h-screen py-12 md:py-0 flex flex-col md:flex-wrap justify-between md:justify-evenly relative bg-[url(https://i.ibb.co/SrdsDsS/wepik-bg-wipzee-202404241829339-YTV.png)] dark:bg-[url(https://i.ibb.co/YZnmH7q/wepik-bg-wipzee-20240424183105l58e.png)] bg-left bg-cover bg-no-repeat">

            <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col gap-4 items-center ">

                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold my-2 md:my-4 lg:my-8">Conheça nosso chat</h2>

                <h3 className="w-full px-4 lg:w-4/5 text-base md:text-xl lg:text-2xl opacity-80 text-center">
                    Utilizamos uma linguagem natural humanizada para trazer confiança e segurança ao seu cliente. então
                    conheça nossos planos e faça agora o seu cadastro pelo chat. É super rápido!
                </h3>
                <Button
                    customClass="my-4 md:my-8 uppercase text-base md:text-xl neon-effect-hover"
                    onClick={() => navigate("/register")}
                >
                    Crie seu chat agora mesmo
                </Button>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-4 justify-start items-center">
                <div className="w-[280px] h-[450px] md:w-[320px] md:h-[530px] lg:w-[340px] lg:h-[600px] xl:w-[370px] xl:h-[650px]">
                    <SimulatorMobile 
                        size={window.innerWidth > 768 ? "BIG" : "SMALL"}
                    />
                </div>
                
            </div>
        </div>
    )
};