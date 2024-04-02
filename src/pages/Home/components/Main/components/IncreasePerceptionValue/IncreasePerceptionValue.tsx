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
            if(scrollTop > 300) {
                const sectionTop = section?.getBoundingClientRect().height || 0;
                console.log(sectionTop)
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
            <div className="w-full h-full flex flex-col justify-center items-center gap-32">

                <div className="flex flex-col items-center ">
                    <h1 className="text-5xl font-bold py-4">Por que a wipzee vai aumentar suas vendas?</h1>
                    <h2 className="text-2xl opacity-80">Não somos mais um desses chatbots convencionais e queremos  mostrar o por que</h2>
                </div>

                <div
                    ref={containerDropDown}
                    className="w-4/5 h-1/2 flex flex-col flex-wrap gap-8 p-4 "
                >
                    {
                        contents.map((content, index) =>
                            <div
                                key={content.title}
                                data-isactive={index === 0 ? true : false}
                                data-index={index}
                                onClick={handleClickDropDown}
                                className="w-2/5 data-[isactive=true]:h-auto h-1/4 group flex flex-col cursor-pointer rounded-md relative overflow-hidden"
                                style={{ order: index }}
                            >
                                <div className="flex gap-4 w-full justify-between p-3 bg-primary-300 rounded-md border border-primary-100 z-20">
                                    <MdCheck className="bg-primary-100 rounded-full p-1 text-xl fill-primary-300" />
                                    <span className="font-bold text-xl">{content.title}</span>
                                    <MdArrowDropDown className="text-2xl fill-primary-100" />
                                </div>
                                <div className="p-2 group-data-[isactive=false]:hidden animate-down-and-display bg-primary-300 z-10">
                                    <p className="text-center text-lg">
                                        {content.text}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
};