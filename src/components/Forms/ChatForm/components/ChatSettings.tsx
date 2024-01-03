import { RefObject, useRef } from "react";
import { InputTextForm } from "../../Components/InputTextForm";
import { Project } from "../../../../@types/Project";

interface ChatSettings {
    project: Project
}

export function ChatSettings({ project }: ChatSettings) {
    const spanSlugRef: RefObject<HTMLSpanElement> = useRef(null);

    const handleUpdateSlugValue = (e: any) => {
        if (e.code === "Enter") e.preventDefault();
        if (spanSlugRef.current) {
            const value = e.target.value
            value && (spanSlugRef.current.textContent = value)
        }
    }

    return (
        <div
            className="w-full hidden flex-col justify-center items-center"
            data-index="chat_settings"
            id="container"
        >
            <h2 className="w-full text-2xl p-4 text-center ">Configurações do chat</h2>

            <div className="w-full flex flex-col gap-4">
                {
                    project &&
                    <>
                        <div className="flex flex-col">
                            <InputTextForm
                                field_name="slug"
                                title="Digite a slug que ficará visivél na url:"
                                onKeyDown={handleUpdateSlugValue}
                            />
                        </div>
                        <div className="flex flex-col">
                            <p>sua slug ficará assim: </p>
                            <p className="text-zinc-300/80">
                                https://chat.wipzee.com/{project?.slug?.split("-")[0]}-
                                <span ref={spanSlugRef}></span>
                            </p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
};