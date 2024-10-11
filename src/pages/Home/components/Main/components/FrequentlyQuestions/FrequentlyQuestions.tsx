import { MouseEvent, RefObject, useEffect, useRef, useState } from "react"
import { getMessageManagerByProjectId } from "../../../../../../api/messageManager";
import { MdArrowDropDown, MdCheck } from "react-icons/md";

const contents = [
    {
        title: "O que é a Wipzee?",
        text: "A Wipzee é uma plataforma que oferece um chat inteligente baseado em inteligência artificial para empresas. Esse chat é projetado para fornecer suporte aos produtos dos clientes de forma eficiente e humanizada."
    },
    {
        title: "Qual a vantagem de utilizar a Wipzee no meu site?",
        text: "A vantagem de utilizar a Wipzee no seu site é que ela oferece um chat inteligente que utiliza inteligência artificial para interagir com os usuários em qualquer horário e em qualquer dia da semana de forma natural e eficiente. Além disso, a plataforma oferece análise de métricas para otimizar o atendimento e aumentar a satisfação do cliente."
    },
    {
        title: "Se eu precisar de ajuda terei algum suporte?",
        text: "Claro, nossa plataforma possui uma infraestrutura completa dedicada a esclarecer todas as suas dúvidas."
    },
    {
        title: "O chat da Wipzee precisa de um número ou WhatsApp para funcionar?",
        text: "Não, o chat da Wipzee não precisa de um número de telefone ou WhatsApp para funcionar. Ele é uma solução independente que pode ser integrada facilmente em qualquer site."
    },
    {
        title: "Por que o chat da Wipzee é melhor que os chatbots convencionais?",
        text: "O chat da Wipzee é melhor que os chatbots convencionais porque é projetado para interagir de forma natural, humanizada e eficiente com os usuários. Além disso, oferece uma análise de métricas detalhada para otimizar o atendimento e resolver questões complexas dos clientes."
    },
]

const PROJECT_ID_WIPZEE = import.meta.env.PROJECT_ID_WIPZEE;

export function FrequentlyQuestions() {
    const containerDropDown: RefObject<HTMLDivElement> = useRef(null)
    const [displayChat, setDisplayChat] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await getMessageManagerByProjectId(PROJECT_ID_WIPZEE);
            if(response){
                const { available } = response?.data.response;
                if (available) setDisplayChat(available);
                else setDisplayChat(false);
            }
        })()
    }, [])

    const handleClickDropDown = (e: MouseEvent<HTMLDivElement>) => {
        const contents: NodeListOf<HTMLDivElement> | undefined = containerDropDown.current?.querySelectorAll("div[data-isactive]");
        contents?.forEach((content) => content.dataset.isactive = "false");
        const content = e.currentTarget;
        content.dataset.isactive = "true";
    }

    return (
        <div className="w-screen h-auto md:min-h-screen py-12 flex flex-col gap-8 justify-center items-center mt-12">
            <div className="w-auto flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold">Ainda Possui Alguma Dúvida?</h2>
                <h3 className="text-lg md:text-2xl text-center">
                    Veja as dúvidas frequentes dos nossos clientes
                </h3>
            </div>
            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-8">

                <div
                    ref={containerDropDown}
                    className="flex flex-col w-full md:w-3/4 gap-4"
                >
                    {
                        contents.map((content, index) =>
                            <div
                                key={content.title}
                                data-isactive={index === 0 ? true : false}
                                data-index={index}
                                onClick={handleClickDropDown}
                                className="w-full data-[isactive=true]:h-auto h-auto group flex flex-col cursor-pointer rounded-md relative overflow-hidden"
                                style={{ order: index }}
                            >
                                <div className="flex gap-4 w-full justify-between items-center p-3 bg-primary-100 dark:bg-primary-300 rounded-tr-md border border-light dark:border-dark z-20">
                                    <MdCheck className="bg-light dark:bg-primary-100 rounded-full p-1 text-xl fill-primary-300" />
                                    <span className="font-medium text-base md:text-lg lg:text-xl text-light ">{content.title}</span>
                                    <MdArrowDropDown className="text-2xl fill-light dark:fill-primary-100" />
                                </div>
                                <div className="p-2 group-data-[isactive=false]:hidden animate-down-and-display bg-primary-100 dark:bg-primary-300 z-10">
                                    <p className="text-center text-base lg:text-lg opacity-80 text-light ">
                                        {content.text}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>

                {
                    displayChat &&
                    <div className="w-full lg:w-1/2 my-8 lg:my-0 flex flex-col items-center gap-4">
                        <h3 className="text-lg md:text-2xl text-center">
                            Converse agora com nosso chat!
                        </h3>
                        <div
                            className="w-[90vw] h-[150vw] lg:w-[30vw] lg:h-[40vw] rounded-lg overflow-hidden"
                            id="wipzee-chat"
                        ></div>
                    </div>
                }
            </div>
        </div>
    )
};