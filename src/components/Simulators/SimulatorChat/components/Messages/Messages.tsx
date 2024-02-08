import { useFormContext } from "react-hook-form";
import { FirstMessage } from "./components/FirstMessage/FirstMessage";
import { useEffect, useState } from "react";
import { Call_to_action } from "../../../../../@types/Project";
import { useSearchParams } from "react-router-dom";
import { CTA_NAME_URL } from "../../../../../variables/variables";

export function Messages() {
    const { watch } = useFormContext();
    const [buttons, setButtons] = useState<Call_to_action[]>();
    const [ params ] = useSearchParams();
    const currentCTA = Number(params.get(CTA_NAME_URL)) || 0;

    useEffect(() => {
        const buttons = watch("step_1.call_to_action");
        setButtons(buttons)
    }, [watch()])

    return (
        Array.from({ length: 5 }).map((_, index, self) => {

            return index % 2 == 0 ?
                (!!buttons?.length && !!buttons[currentCTA]?.button_text && index === 4) ?
                    <div
                        key={index}
                        data-isbutton={!!buttons?.length}
                        className="w-3/4 h-auto bg-green-600 rounded-lg self-start my-3 flex flex-col justify-center"
                    >
                        <span
                            className="p-1 px-2"
                        >
                            Aqui está o link, basta clicar sobre ele.</span>
                        <a
                            href={buttons[currentCTA].button_link}
                            target="_blank"
                            className="w-full p-1 text-center underline border-t border-white/40"
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
                        "w-3/4 h-[12px] data-[isfirstmsg='true']:h-auto data-[islastmsg='true']:h-auto data-[isfirstmsg='true']:bg-green-600 bg-zinc-300 data-[isfirstmsg='true']:py-1 text-light rounded-lg my-3 p-3 flex items-center"
                    >
                        {index === 0 ? <FirstMessage /> : ""}
                    </div>
                :
                <div
                    key={index}
                    className="w-3/4 h-[12px] bg-zinc-300 rounded-lg p-3 self-end"
                ></div >
        }


        )
    )
};