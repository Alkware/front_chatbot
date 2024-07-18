import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../components/button/Button";
import { SimulatorMobile } from "./components/SimulatorMobile/SimuladorMobile"

export function ChatDemo() {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-auto md:h-screen py-12 md:py-0 flex flex-col md:flex-wrap justify-between md:justify-evenly relative bg-[url(https://i.ibb.co/SrdsDsS/wepik-bg-wipzee-202404241829339-YTV.png)] dark:bg-[url(https://i.ibb.co/YZnmH7q/wepik-bg-wipzee-20240424183105l58e.png)] bg-left bg-cover bg-no-repeat">

            <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col gap-4 items-center ">

                <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-center font-bold mx-4 md:my-2 lg:my-4">
                    Tenha no seu atendimento uma <br /> assistente 24 horas
                </h2>

                <h3 className="w-full px-4 lg:w-4/5 text-base md:text-lg lg:text-xl opacity-80 text-center">
                    Com o nosso chat da Wipzee, você consegue tirar as dúvidas do seus clientes <strong>NA HORA</strong>.
                    Nossa tecnologia possui capacidade para fornecer respostas precisas de maneira personalizada e humanizada
                    aos seus clientes, elevando assim o nível de experiência e satisfação com a sua marca. Faça agora seu cadastro
                    e começa a vender mais, é rápido e <strong>você não paga nada!</strong>
                </h3>
                <Button
                    customClass="my-4 md:my-8 uppercase text-base md:text-xl neon-effect-hover"
                    onClick={() => navigate("/register")}
                >
                    Crie seu chat agora mesmo
                </Button>
            </div>

            <div className="w-full h-full md:w-1/2 flex flex-col gap-4 justify-center items-center">
                <div className="w-[30vw] h-[45vw] max-w-[300px] max-h-[450px]">
                    <SimulatorMobile />
                </div>
            </div>
        </div>
    )
};