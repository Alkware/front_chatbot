import { Messages } from "./components/Messages/Messages";
import { HeaderSimulator } from "./components/HeaderSimulator/HeaderSimulator";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { CHAT_ICONS_MODELS } from "../../../variables/variables";

interface SimulatorChat {
    active: boolean | undefined,
}

export function SimulatorChat({ active }: SimulatorChat) {
    const { watch } = useFormContext();
    const [chatIconIndex, setChatIconIndex] = useState();
    const [iconText, setIconText] = useState();
    const [primaryColor, setPrimaryColor] = useState();

    useEffect(() => {
        const iconIndex = watch("step_3.chat_appearance.chat_icon")
        const primaryColor = watch("step_3.chat_appearance.primary_color")
        const text = watch("step_3.chat_appearance.icon_text")

        setChatIconIndex(iconIndex)
        setIconText(text)
        setPrimaryColor(primaryColor)
    }, [watch()])

    return (
        (active) &&
        <div className="flex flex-col ">
            <div className="w-1/4 min-w-[300px] max-h-[500px] min-h-[350px] overflow-y-auto relative border border-white/20 rounded-xl">

                <HeaderSimulator />

                <Messages />
            </div>

            <div className="flex justify-end w-full p-4">
                {
                    CHAT_ICONS_MODELS.map(model =>
                        model.id === chatIconIndex
                        &&
                        <div className="flex gap-2 justify-center items-end" key={model.id}>
                            <p className="bg-white text-center text-zinc-800 rounded-md px-2">
                                {iconText}
                            </p>
                            <model.Icon
                                className="text-5xl cursor-pointer"
                                style={{ fill: primaryColor }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
};