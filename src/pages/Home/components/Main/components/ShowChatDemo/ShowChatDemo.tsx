import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../components/button/Button";
import { SimulatorMobile } from "./components/SimulatorMobile/SimuladorMobile"

export function ChatDemo() {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen flex justify-evenly relative bg-[url(https://i.ibb.co/BLbZyYV/wepik-modern-ia-20240403185919-NJt-W.png)] bg-left bg-contain bg-no-repeat">
            
            <div className="w-1/2 flex flex-col gap-4 items-center ">
                <h2 className="text-6xl font-bold my-8">Conheça nosso chat</h2>
                <h3 className="w-4/5 opacity-80 text-2xl text-center">
                    Utilizamos uma linguagem natural humanizada para trazer confiança e segurança ao seu cliente. então
                    conheça nossos planos e faça agora o seu cadastro pelo chat. É super rápido!
                </h3>
                <Button
                    customClass="my-8 uppercase text-xl neon-effect-hover"
                    onClick={() => navigate("/register")}
                >
                    Crie seu chat agora mesmo
                </Button>
            </div>
            <div className="w-1/2 flex flex-col gap-4 justify-start items-center translate-y-[5vw]">
                <SimulatorMobile />
            </div>
        </div>
    )
};