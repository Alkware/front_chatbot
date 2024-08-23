import { InputHTMLAttributes, RefObject, useContext, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { PreviewImage } from "./components/PreviewImage/PreviewImage";
import { ModalContext } from "../../../../../../context/ModalContext";
import { FileAccept, FileLibrary } from "../../../../../../components/FileLibrary/FileLibrary";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";
import { Button } from "../../../../../../components/button/Button";
import { Image } from "../../../../../../@types/images.types";
import { UseFormReturn } from "react-hook-form";

interface UploadFile extends InputHTMLAttributes<HTMLInputElement> {
    client_id: string | undefined;
    acceptFiles?: FileAccept[]
    limitSelect?: number;
    formContext?: UseFormReturn
    imagesDefault?: Image[]
}

export function UploadFile({  acceptFiles, limitSelect, client_id, formContext, imagesDefault }: UploadFile) {
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [images, setImages] = useState<Image[]>();
    const { setModalContent } = useContext(ModalContext);

    useEffect(()=>{
        if(imagesDefault) setImages(imagesDefault);
    },[])

    const handleSelectFile = () => {
        if (!client_id) {
            console.error("Client id is missing!");
            return;
        };
        setModalContent({
            componentName: "modal_display_library",
            components: <PopUp>
                <FileLibrary
                    name="images"
                    client_id={client_id}
                    limitSelect={limitSelect}
                    setFiles={setImages}
                    formContext={formContext}
                />
            </PopUp>
        })
    }

    return (
        <div
            ref={containerRef}
            className="w-full mx-auto max-w-[350px] p-4 flex flex-col gap-4 justify-center items-center border border-dashed border-primary-100 bg-zinc-600/40 rounded-md"
        >
            <PreviewImage
                images={images}
                setImages={setImages}
            />

            <Button
                type="button"
                onClick={handleSelectFile}
            >
                <FaCamera />
                {images?.length ?
                    "Adicionar mais"
                    :
                    `Escolher ${acceptFiles?.length === 1 && acceptFiles[0] === "img" ? "imagem" : "arquivo"}`
                }
            </Button>

        </div>

    )
};