import { useFormContext } from "react-hook-form";
import { FirstMessage } from "./components/FirstMessage/FirstMessage";
import { useEffect, useState } from "react";
import { Call_to_action } from "../../../../../@types/Project";
import { useSearchParams } from "react-router-dom";
import { CTA_NAME_URL } from "../../../../../variables/variables";

export function Messages() {
    const { watch } = useFormContext();
    const [buttons, setButtons] = useState<Call_to_action[]>();
    const [params] = useSearchParams();
    const currentCTA = Number(params.get(CTA_NAME_URL)) || 0;
    const [secundaryColor, setSecundaryColor] = useState();
    const [background, setBackground] = useState();

    useEffect(() => {
        const secondColorData = watch("step_3.chat_appearance.second_color")
        const backgroundData = watch("step_3.chat_appearance.background")
        const buttons = watch("step_1.call_to_action");
        setButtons(buttons)
        setSecundaryColor(secondColorData)
        setBackground(backgroundData)
    }, [watch()])

    return (
        <div
            className="w-full flex flex-col gap-1 py-4 px-2 rounded-b-xl"
            style={{ background }}
        >
            {
                Array.from({ length: 5 }).map((_, index, self) => {

                    return index % 2 == 0 ?
                        (!!buttons?.length && !!buttons[currentCTA]?.button_text && index === 4) ?
                            <div
                                key={index}
                                data-isbutton={!!buttons?.length}
                                className="w-3/4 h-auto bg-white text-dark rounded-lg self-start my-3 flex flex-col justify-center"
                            >
                                <span
                                    className="p-1 px-2"
                                >
                                    Aqui está o link, basta clicar sobre ele.</span>
                                <a
                                    href={buttons[currentCTA].button_link}
                                    target="_blank"
                                    className="w-full p-1 text-center underline text-blue-500 border-t border-blue-500/40"
                                >
                                    {buttons[currentCTA].button_text}
                                </a>
                            </div >
                            :
                            <div
                                key={index}
                                data-isfirstmsg={index === 0}
                                data-islastmsg={index === (self.length - 1)}
                                className=
                                "break-words w-3/4 min-h-[20px] data-[islastmsg='true']:h-auto data-[isfirstmsg='true']:py-1 data-[isfirstmsg=true]:bg-white bg-zinc-300 text-dark rounded-lg my-3 p-3 flex items-center"
                            >
                                {index === 0 ? <FirstMessage /> : <p></p>}
                            </div>
                        :
                        <div
                            key={index}
                            className="w-3/4 h-6 bg-primary-100/80 rounded-lg self-end flex justify-end"
                            style={{ background: `${secundaryColor}` }}
                        >
                        </div >
                })
            }
        </div>
    )
};