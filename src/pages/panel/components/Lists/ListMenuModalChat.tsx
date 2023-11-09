import { forwardRef, useRef } from "react";
import { Li } from "../../../../components/Li/Li";

export const ListMenuModalChat = forwardRef(({ }, ref: any) => {
    const activeIndex = useRef()

    const listName = [
        {
            text: "Informações gerais",
            id: "general_information"
        },
        {
            text: "Descrição do produto",
            id: "product_describe"
        },
        {
            text: "Rastreamento/Eventos",
            id: "tracking"
        },
        {
            text: "Configurações do chat",
            id: "chat_settings"
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
        <ul className="w-full flex flex-col">
            {
                listName.map(list =>
                    <Li
                        key={list.id}
                        text={list.text}
                        index={list.id}
                        activeIndex={activeIndex.current}
                        onClick={handleActiveLi}
                    />
                )
            }
        </ul>
    )
});