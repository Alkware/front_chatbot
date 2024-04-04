import { MouseEvent, RefObject, useEffect, useRef } from "react";
import { MdArrowDropDown, MdCheck } from "react-icons/md"

const contents = [
    {
        title: "Análise de métricas com IA",
        text: "Com nosso completo sistema de analise de métricas, rastreamos todos as ações que seu cliente fará dentro do chat e com  um único clique nossa Inteligência artificial fará toda analise dos dados e dará recomendações essenciais para aprimorar a qualidade do seu atendimento e aumentar a satisfação do seu cliente."
    },
    {
        title: "Chat 100% personalizável",
        text: "Deixe o seu chat com a cara da sua marca! Personalize de forma simples e rápida todos os aspectos do seu chat como desejar. Chega de  usar soluções convencionais que não combinam com seu site e ainda trás uma experiencia ruim para os seus clientes."
    },
    {
        title: "Link inteligente",
        text: "Através da nossa poderosa ferramenta integrada a uma inteligência artificial treinada para atender, deixe os seus clientes terem uma experiência igual ou superior do atendimento humanizado. Com a nossa IA, você tem atendimento disponível 24 horas e 7 dias por semana para atender de forma rápida e eficiente os seu cliente sem a necessidade de atendentes humanos. Não deixe os seus clientes esperando. Com a WIPZEE você não perde a venda e o seu cliente não fica esperando alguém estar disponível par atendê-lo!"
    },
    {
        title: "Atendimento humanizado",
        text: "Atenda seus clientes em qualquer lugar através do nosso sistema dinâmico de links inteligentes. Crie e compartilhe o link do seu chat de forma simples em qualquer site, redes sociais, grupos e até mesmo dentro do whatsapp. Onde for que o seu cliente precisar de atendimento, a Wipzee estará lá com você! "
    },
]

export function IncreasePerceptionValue() {
    const containerDropDown: RefObject<HTMLDivElement> = useRef(null)

    useEffect(() => {
        const handleScrollPage = () => {
            const section = document.body.querySelector("#increase-perception-value");
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > 300) {
                const sectionTop = section?.getBoundingClientRect().height || 0;
                window.scrollTo({ behavior: "smooth", top: sectionTop })
                window.removeEventListener("scroll", handleScrollPage)
            }
        }

        window?.addEventListener("scroll", handleScrollPage);

        return () => window.removeEventListener("scroll", handleScrollPage)
    }, [])


    const handleClickDropDown = (e: MouseEvent<HTMLDivElement>) => {
        const currentIndex = e.currentTarget.dataset.index;

        if (currentIndex == "2") e.currentTarget.style.order = "4"


        const contents: NodeListOf<HTMLDivElement> | undefined = containerDropDown.current?.querySelectorAll("div[data-isactive]");
        contents?.forEach((content) => content.dataset.isactive = "false");
        const content = e.currentTarget;
        content.dataset.isactive = "true";
    }


    return (
        <section
            id="increase-perception-value"
            className="w-screen h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-black to-dark"
        >
            <div className="w-full h-full flex flex-col justify-center items-center gap-8 md:gap-0">

                <div className="w-full md:h-1/4 flex flex-col items-center z-10">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold py-4">Por que a wipzee vai aumentar suas vendas?</h1>
                    <h2 className="w-4/5 md:w-auto text-base md:text-lg lg:text-xl opacity-80">Não somos mais um desses chatbots convencionais e queremos  mostrar o por que</h2>
                </div>

                <div
                    ref={containerDropDown}
                    className="w-4/5 md:w-[90%] h-3/4 my-8 md:my-0 flex flex-col justify-start items-center flex-nowrap md:flex-wrap gap-4"
                >
                    {
                        contents.map((content, index) =>
                            <div
                                key={content.title}
                                data-isactive={index === 0 ? true : false}
                                data-index={index}
                                onClick={handleClickDropDown}
                                className="w-full md:w-[48%] data-[isactive=true]:h-auto h-auto md:h-1/4 group flex flex-col cursor-pointer rounded-md relative overflow-hidden"
                                style={{ order: index }}
                            >
                                <div className="flex gap-4 w-full justify-between p-3 bg-primary-300 rounded-md border border-primary-100 z-20">
                                    <MdCheck className="bg-primary-100 rounded-full p-1 text-xl fill-primary-300" />
                                    <span className="font-medium text-base md:text-lg lg:text-xl">{content.title}</span>
                                    <MdArrowDropDown className="text-2xl fill-primary-100" />
                                </div>
                                <div className="p-2 group-data-[isactive=false]:hidden animate-down-and-display bg-primary-300 z-10">
                                    <p className="text-center text-base lg:text-lg opacity-80">
                                        {content.text}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="w-[50vw] h-[40vw] absolute top-0 left-0 -z-0 flex justify-start items-center gap-2 -translate-y-1/3">
                <div className="w-full h-full radial-gradient flex gap-2 justify-center items-center">
                    {
                        Array.from({ length: 12 }).map((_, index) =>
                            index === 6 ?
                                <div
                                    key={index}
                                    className="w-[60vw] h-screen absolute top-1/2 left-2/3 border-t-2 border-r-2 border-primary-100/15 rounded-xl overflow-hidden"
                                >
                                    <div className="w-[2vw] rounded-full h-[2px] bg-gradient-to-r from-transparent to-primary-100/80 animate-light-running"></div>
                                </div>
                                :
                                index % 2 ?
                                    <div
                                        key={index}
                                        className="w-full h-[1px] absolute top-1/3 opacity-50 bg-gradient-to-r from-transparent via-primary-100/50 to-transparent"
                                        style={{ translate: `0 ${index * 25}px` }}
                                    ></div>
                                    :
                                    <div
                                        key={index}
                                        className="w-[1px] h-full absolute left-1/3 opacity-50 bg-gradient-to-b from-transparent via-primary-100/50 to-transparent"
                                        style={{ translate: `${index * 25}px 0` }}
                                    ></div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}