import { MdCheck, MdClose } from "react-icons/md";
import { Button } from "../../../../../../components/button/Button";

const otherSolutions = [
    "Difícil configuração",
    "Utiliza fluxos tediosos de mensagens",
    "Difícil integração com sites",
    "Não resolvem questões complexas e distintas",
    "Não podem ser personalizável",
    "Cliente percebe claramente que é um robô",
    "Muitos precisam ser integrado com whatsapp",
];

const wipzee = [
    "Fácil configuração",
    "Utiliza inteligência artificial",
    "Integração rápida e fácil em qualquer site",
    "Resolve questões complexas e distintas",
    "Personalize o chat de acordo com a sua marca",
    "Atendimento humanizado",
    "Funciona sem integração com o whatsapp",
];

export function Comparison() {
    return (
        <div className="w-screen h-screen flex flex-col gap-8 items-center">
            <h2 className="text-5xl p-8">Compare e escolha</h2>
            <div className="flex gap-8">
                <div className="flex flex-col items-center cursor-not-allowed border border-red-800/50 rounded-lg bg-red-500/10 gap-2 p-4 opacity-70 animate-pulse">
                    <h3 className="text-2xl font-medium">Outras Soluções</h3>
                    <p className="opacity-70">Soluções incompletas e ineficazes do mercado</p>
                    <div className="flex flex-col gap-4 my-4">
                        {
                            otherSolutions.map(text =>
                                <div className="flex items-center gap-2">
                                    <MdClose className="text-xl fill-red-500" />
                                    <span className="text-lg">{text}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center cursor-pointer border border-primary-100/50 rounded-lg bg-primary-100/10 gap-2 p-4 shadow-md shadow-primary-100/40 hover:scale-110 transition-transform decoration-neutral-100">
                    <h3 className="text-2xl font-medium">Wipzee</h3>
                    <p className="opacity-70">Assistente eficaz utilizando inteligência artifical</p>
                    <div className="flex flex-col gap-4 my-4">
                        {
                            wipzee.map(text =>
                                <div className="flex items-center gap-4">
                                    <MdCheck className="text-xl fill-primary-100" />
                                    <span className="text-lg">{text}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <Button customClass="my-8">Escolher a wipzee</Button>
        </div>
    )
};