import { forwardRef, useRef } from "react";
import { Li } from "../../../../components/li/Li";
import { FcInfo, FcMindMap, FcNews, FcSettings } from "react-icons/fc";

export const ListMenuModalChat = forwardRef(({ }, ref: any) => {
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
        <div className="w-1/4 max-w-[300px] min-w-[200px] h-full border-r-[1px] border-r-zinc-500 flex flex-col justify-between">

            <ul className="w-full flex flex-col">
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
        </div>
    )
});