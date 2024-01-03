import { Dispatch, SetStateAction, forwardRef, useRef } from "react";
import { Li } from "../../../../../../../../../../../../components/li/Li";
import { FcInfo, FcMindMap, FcNews, FcSettings } from "react-icons/fc";
import { Project } from "../../../../../../../../../../../../@types/Project";
import { ButtonsModal } from "../../../../../../../../../../../../components/Forms/ChatForm/components/ButtonsModal";

interface ListMenuModalChat{
    project: Project
    setNewProject: Dispatch<SetStateAction<Project>>
}

export const ListMenuModalChat = forwardRef(({ project, setNewProject }: ListMenuModalChat, ref: any) => {
    const activeIndex = useRef()

    const listName = [
        {
            text: "Informações gerais",
            id: "general_information",
            icon: <FcInfo />
        },
        {
            text: "Descrição do produto",
            id: "product_describe",
            icon: <FcNews />
        },
        {
            text: "Rastreamento/Eventos",
            id: "tracking",
            icon: <FcMindMap />
        },
        {
            text: "Configurações do chat",
            id: "chat_settings",
            icon: <FcSettings />
        },
    ]

    const handleActiveLi = ({ target }: any) => {
        const form = ref?.current


        function defineCurrentIndex() {
            const index = target.dataset.index
            activeIndex.current = index;
        }

        function addHiddenOnContent() {
            const divs = [...form.querySelectorAll("div#container")];
            if (divs) {
                divs.forEach(div => {
                    div.classList.add("hidden")
                })
            }
        }

        function addFlexCurrentContent() {
            defineCurrentIndex();
            addHiddenOnContent();
            const divActive = form.querySelector(`div[data-index='${activeIndex.current}']`);
            if (divActive) {
                divActive.classList.add("flex")
                divActive.classList.remove("hidden")
            }
        }


        addFlexCurrentContent();
    }


    return (
        <div className="w-1/4 h-full max-w-[300px] min-w-[250px] flex flex-col justify-between items-center  ">

            <ul className="w-full flex flex-col uppercase">
                {
                    listName.map(list =>
                        <Li
                            key={list.id}
                            text={list.text}
                            icon={list.icon}
                            index={list.id}
                            onClick={handleActiveLi}
                        />
                    )
                }
            </ul>

            <ButtonsModal
                project={project}
                setNewProject={setNewProject}
            />

        </div>
    )
});