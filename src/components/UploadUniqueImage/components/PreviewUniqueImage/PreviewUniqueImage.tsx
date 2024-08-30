import { Dispatch, SetStateAction } from "react"
import { Image } from "../../../../@types/images.types";
import { UseFormReturn } from "react-hook-form";

interface PreviewUniqueImage {
    image: Image | undefined;
    name?: string;
    formContext?: UseFormReturn<any>
    setImages: Dispatch<SetStateAction<Image[] | undefined>>
}

export function PreviewUniqueImage({ name, formContext, image, setImages }: PreviewUniqueImage) {

    // Função responsável por remover a imagem da lista de selecionados...
    const handleDeleteImage = () => {
        setImages([]);
        formContext && (formContext.unregister(name))
    }


    return (
        !!image ?
            <div
                className="w-20 h-20 overflow-hidden border border-white/80 rounded-full relative group"
            >
                <div
                    className="w-full h-full hidden absolute left-0 bg-dark/70 group-hover:grid place-items-center cursor-pointer"
                    onClick={handleDeleteImage}
                >
                    <span className="text-xl font-medium">X</span>
                </div>
                <img
                    src={image?.url || "https://via.placeholder.com/100"}
                    alt="Imagem carregada pela usuário"
                />
            </div>
            :
            <div className="w-20 h-20 bg-[url(https://i.ibb.co/6gFGb2q/wipzee-logo-1-removebg-preview.png)] bg-no-repeat bg-cover bg-opacity-15 filter grayscale"></div>
    )
};