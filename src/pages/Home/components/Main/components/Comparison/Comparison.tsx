import { MdCheck, MdClose } from "react-icons/md";

const otherSolutions = [
    "Cobra para usar um chatbot engessado",
    "Difícil configuração",
    "Utiliza fluxos tediosos de mensagens",
    "Difícil integração com sites",
    "Não resolvem questões complexas e distintas",
    "Não podem ser personalizável",
    "Cliente percebe claramente que é um robô",
    "Muitos precisam ser integrado com whatsapp",
];

const wipzee = [
    "Assitente gratuita",
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
        <div className="w-screen h-auto md:min-h-screen py-12 flex flex-col gap-8 items-center relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl p-8 font-bold">Compare e escolha</h2>

            <div className="flex flex-col md:flex-row gap-8 items-center">

                <div className="w-[90%] md:w-auto order-2 md:order-1 flex flex-col items-center cursor-not-allowed border border-red-800/50 rounded-lg bg-red-500/10 gap-2 p-4 opacity-70 animate-pulse">
                    <h3 className="text-2xl font-medium">Outras Soluções</h3>
                    <p className="text-center md:text-left opacity-70">Soluções incompletas e ineficazes do mercado</p>
                    <div className="flex flex-col gap-4 my-4">
                        {
                            otherSolutions.map((text, index) =>
                                <div
                                    data-iszero={index === 0}
                                    key={text}
                                    className="flex items-center gap-2 data-[iszero=true]:font-bold data-[iszero=true]:underline"
                                >
                                    <MdClose className="text-xl fill-red-500" />
                                    <span className="text-lg">{text}</span>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="w-[90%] md:w-auto order-1 md:order-2 flex flex-col items-center cursor-pointer border border-primary-100/50 rounded-lg bg-primary-100/10 gap-2 p-4 shadow-md shadow-primary-100/40 hover:scale-110 transition-transform decoration-neutral-100">
                    <h3 className="text-2xl font-medium">Wipzee</h3>
                    <p className="opacity-70 text-center md:text-left">Assistente eficaz utilizando inteligência artifical</p>
                    <div className="flex flex-col gap-4 my-4">
                        {
                            wipzee.map((text, index) =>
                                <div
                                    data-iszero={index === 0}
                                    key={text}
                                    className="flex items-center gap-4 data-[iszero=true]:font-bold data-[iszero=true]:underline"
                                >
                                    <MdCheck className="text-xl fill-primary-100" />
                                    <span className="text-lg">{text}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="w-[50vw] h-[100vh] absolute -top-1/4 left-0 md:left-1/2 -z-0 flex justify-start items-center gap-2 -translate-x-1/2">

                <div className="w-full h-full flex gap-2 justify-center items-center">
                    {
                        Array.from({ length: 6 }).map((_, index) =>
                            <div
                                key={index}
                                className="w-[1px] h-full absolute left-1/4 bg-gradient-to-b from-transparent via-primary-100/10 to-transparent"
                                style={{ translate: `${index * 75}px 0` }}
                            >
                                {
                                    index % 2 === 0 ?
                                        <div className="w-1 h-1 rounded-full -translate-x-1/2 bg-primary-100 neon-effect absolute top-0 animate-light-running-down opacity-30"></div>
                                        :
                                        <div className="w-1 h-1 rounded-full -translate-x-1/2 bg-primary-100 neon-effect absolute top-0 animate-light-running-down-forwards opacity-30"></div>

                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};