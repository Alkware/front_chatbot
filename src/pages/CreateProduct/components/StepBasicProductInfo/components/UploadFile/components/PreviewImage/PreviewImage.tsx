import { Dispatch, SetStateAction } from "react"
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";
import { Image } from "../../../../../../../../@types/images.types";

interface PreviewImage {
    images: Image[] | undefined,
    setImages: Dispatch<SetStateAction<Image[] | undefined>>
}

export function PreviewImage({ images, setImages }: PreviewImage) {

    // Função responsável por remover a imagem da lista de selecionados...
    const handleDeleteImage = (img: Image) => {
        const removeImg = images?.filter(imageInfo => imageInfo.image.id !== img.image.id);
        setImages(removeImg)
    }

    return (
        !!images?.length ?
            <div className="w-full flex justify-start items-end gap-2 border border-dashed border-white/50 p-2 rounded-lg ">
                {images.map((img, index) =>
                    index < 5 &&
                    <TipContainer
                        tip="Imagem principal do produto"
                        display={index === 0}
                    >
                        <div
                            data-isfirst={index === 0}
                            className="w-12 h-12 data-[isfirst=true]:w-14 data-[isfirst=true]:h-14  data-[isfirst=true]:border-primary-100 overflow-hidden border border-white/80 rounded-full relative group"
                        >
                            <div
                                className="w-full h-full hidden absolute left-0 bg-dark/70 group-hover:grid place-items-center cursor-pointer"
                                onClick={() => handleDeleteImage(img)}
                            >
                                <span className="text-xl font-medium">X</span>
                            </div>
                            <img
                                src={img.image.url}
                                alt="Imagem carregada pela usuário"
                            />
                        </div>
                    </TipContainer>
                )}
            </div>
            :
            <div className="w-20 h-20 bg-[url(https://i.ibb.co/6gFGb2q/wipzee-logo-1-removebg-preview.png)] bg-no-repeat bg-cover bg-opacity-15 filter grayscale"></div>
    )
};