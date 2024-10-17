import { useFormContext } from "react-hook-form";
import { FirstMessage } from "./components/FirstMessage/FirstMessage";
import { useEffect, useState } from "react";
import { Link } from "../../../../../@types/Project";
import { LinkMessage } from "./components/LinkMessage/LinkMessage";

export function Messages() {
    const { watch } = useFormContext();
    const [links, setLinks] = useState<Link[]>();
    const [secundaryColor, setSecundaryColor] = useState();
    const [background, setBackground] = useState();

    useEffect(() => {
        const secondColorData = watch("chat_appearance.second_color")
        const backgroundData = watch("chat_appearance.background")
        const links = watch("links");
        setLinks(links)
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
                        (!!links?.length && index === 4) ?
                            <LinkMessage 
                                key={index}
                                links={links}
                            />
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