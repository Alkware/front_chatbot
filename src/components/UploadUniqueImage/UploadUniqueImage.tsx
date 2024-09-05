import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { PreviewUniqueImage } from "./components/PreviewUniqueImage/PreviewUniqueImage";
import { UseFormReturn } from "react-hook-form";
import { FileLibrary } from "../FileLibrary/FileLibrary";
import { Image } from "../../@types/images.types";
import { ModalContext } from "../../context/ModalContext";
import { PopUp } from "../modal/templates/PopUp";
import { Button } from "../button/Button";

interface UploadUniqueFile {
    name: string
    client_id: string | undefined;
    formContext?: UseFormReturn
    imageDefault?: Image[]
}

export function UploadUniqueFile({ client_id, formContext, imageDefault, name }: UploadUniqueFile) {
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [images, setImages] = useState<Image[]>();
    const { setModalContent } = useContext(ModalContext);

    useEffect(() => {
        if (imageDefault) setImages(imageDefault);
    }, [])

    useEffect(() => {
        // Caso seja solicitados os arquivos selecionados em um formState (register).
        if (formContext?.register) {
            images?.forEach(() => formContext.unregister(name))
            images?.forEach((img) => img && formContext.register(name, { value: img.id }))
        };
    }, [images])

    const handleSelectFile = () => {
        if (!client_id) {
            console.error("Client id is missing!");
            return;
        };
        setModalContent({
            componentName: "modal_display_library",
            components: <PopUp>
                <FileLibrary
                    name={name}
                    client_id={client_id}
                    limitSelect={1}
                    setFiles={setImages}
                />
            </PopUp>
        })
    }

    return (
        <div
            ref={containerRef}
            className="w-full mx-auto max-w-[350px] p-4 flex flex-col gap-4 justify-center items-center border border-dashed border-primary-100 bg-zinc-600/40 rounded-md"
        >
            <PreviewUniqueImage
                name={name}
                image={images && images[0]}
                setImages={setImages}
                formContext={formContext}
            />

            {!images?.length &&
                <Button
                    type="button"
                    onClick={handleSelectFile}
                >
                    <FaCamera />
                    Escolher imagem
                </Button>
            }

        </div>

    )
};