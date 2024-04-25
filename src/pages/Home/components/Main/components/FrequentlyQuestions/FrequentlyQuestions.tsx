import { MouseEvent, RefObject, useEffect, useRef, useState } from "react"
import { getPlanMessageManagerByProjectId } from "../../../../../../api/planMessageManager";
import { MdArrowDropDown, MdCheck } from "react-icons/md";

const contents = [
    {
        title: "PERGUNTA 1",
        text: "RESPOSTA 1"
    },
    {
        title: "PERGUNTA 2",
        text: "RESPOSTA 2"
    },
    {
        title: "PERGUNTA 3",
        text: "RESPOSTA 3"
    },
    {
        title: "PERGUNTA 4",
        text: "RESPOSTA 4"
    },
]

const PROJECT_ID_WIPZEE = import.meta.env.PROJECT_ID_WIPZEE;

export function FrequentlyQuestions() {
    const containerDropDown: RefObject<HTMLDivElement> = useRef(null)
    const [displayChat, setDisplayChat] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await getPlanMessageManagerByProjectId(PROJECT_ID_WIPZEE);
            const { available } = response?.data.response;
            if (available) setDisplayChat(available);
            else setDisplayChat(false);
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
                    className="flex flex-col w-full md:w-1/2 gap-4"
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
                                <div className="flex gap-4 w-full justify-between p-3 bg-primary-100 dark:bg-primary-300 rounded-tr-md border border-light dark:border-dark z-20">
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