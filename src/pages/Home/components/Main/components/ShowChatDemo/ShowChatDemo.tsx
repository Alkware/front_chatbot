import { Button } from "../../../../../../components/button/Button";
import { SimulatorMobile } from "./components/SimulatorMobile/SimuladorMobile"

export function ChatDemo() {
    return (
        <div className="w-screen h-screen flex justify-evenly">
            <div className="w-1/2 flex flex-col gap-4 justify-start items-center">
                <h2 className="text-5xl font-bold my-8">Conheça nosso chat</h2>
                <h3 className="w-2/3 text-2xl text-center">Conheça nossos planos e faça agora o seu cadastro pelo chat. É super rápido!</h3>
                <Button customClass="my-8 uppercase">Crie seu chat agora mesmo</Button>
            </div>
            <div className="w-1/2 flex flex-col gap-4 justify-start items-center">
                <SimulatorMobile />
            </div>
        </div>
    )
};