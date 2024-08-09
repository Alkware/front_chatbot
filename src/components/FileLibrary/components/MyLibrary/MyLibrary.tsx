import { Dispatch, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { deleteImageById, getImagesById } from "../../../../api/images";
import { MdDelete } from "react-icons/md";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../modal/templates/PopOver";
import { Confirm } from "../../../modal/templates/Confirm";
import { PopUp } from "../../../modal/templates/PopUp";
import { Loading } from "../../../Loading/Loading";
import { Image } from "../../../../@types/images.types";
import { SubTitle } from "../../../SubTitle/SubTitle";
import { FaRegSadTear } from "react-icons/fa";

interface MyLibrary {
    client_id: string;
    imagesSelected: Image[] | undefined;
    setImagesSelected: Dispatch<SetStateAction<Image[] | undefined>>;
}

export function MyLibrary({ client_id, imagesSelected, setImagesSelected }: MyLibrary) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const containerMyLibraryRef: RefObject<HTMLDivElement> = useRef(null);
    const [images, setImages] = useState<Image[]>();

    // useEffect para buscar as imagens no banco e adicionar transition nos containers...
    useEffect(() => {
        (async () => {
            // Adiciona uma transição de opacidade ao conteiner...
            const timeout = setTimeout(() => {
                containerMyLibraryRef.current?.classList.remove("opacity-0", "opacity-100")
                containerMyLibraryRef.current?.classList.add("opacity-100")
                clearTimeout(timeout);
            }, 100);

            // Busca todas as imagens que pertence a esse client id...
            const images = await getImagesById(client_id);
            images && setImages(images)
        })();
    }, []);

    /**
     * Função repsonsável por deixar selecionado uma imagem...
     */
    const handleSelectedImage = (image: Image) => {
        const existingImageId = imagesSelected?.find(img => img.id === image.id);

        if (existingImageId) {
            const filteredImages = imagesSelected?.filter(img => img.id !== image.id);
            setImagesSelected(filteredImages)
        } else setImagesSelected(values => values?.length ? [...values, image] : [image]);
    }

    /**
     * Função responsável por deletar uma imagem no banco de dados...
     */
    const handleDeleteImage = (id: string) => {

        async function confirmDeleteImage() {
            const response = await deleteImageById(id);
            if (response) {
                setModalContent({
                    componentName: "modal_success_delete_image",
                    components: <PopOver
                        componentName="modal_success_delete_image"
                        message="Imagem excluida com sucesso!"
                    />
                })
                setImages(values => values?.filter(img => img.id !== id))
                clearModal("modal_confirm_delete_image")
            }
        }


        setModalContent({
            componentName: "modal_confirm_delete_image",
            components: <PopUp>
                <Confirm
                    title="Deseja realmente excluir essa imagem?"
                    subTitle="Caso, você exclu-a não poderá mais recuperar"
                    confirmFunction={confirmDeleteImage}
                    cancelFuntion={() => clearModal("modal_confirm_delete_image")}
                />
            </PopUp>
        })

    }

    return (
        <div
            className="w-full max-w-[600px] space-y-4 transition-opacity opacity-0"
            ref={containerMyLibraryRef}
        >
            {!images ?
                <Loading
                    width="50px"
                    textSize="text-xs md:text-sm"
                />
                :
                <div className="w-full  min-w-[400px] min-h-[100px] flex gap-4 flex-wrap p-4 border border-dashed border-white/60 rounded-md">
                    {
                        !images.length ?
                        <div className="flex gap-2 justify-center items-center">
                        <SubTitle>Biblioteca vazia</SubTitle>
                        <FaRegSadTear />
                        </div>
                            :
                            images.map(img =>
                                <div
                                    data-isselected={!!imagesSelected?.find(image => image.id === img.id)}
                                    className="w-16 h-16 border-2 cursor-pointer rounded-md hover:scale-125 transition-transform group data-[isselected=true]:scale-110 data-[isselected=true]:border-primary-100 "
                                >
                                    <MdDelete
                                        className="absolute z-50 -top-2 -right-2 group-hover:block hidden bg-red-200 fill-red-500 rounded-full group-data-[isselected=true]:hidden"
                                        onClick={() => handleDeleteImage(img.id)}
                                    />
                                    <img
                                        src={img.url}
                                        alt="Imagem da bibliotecado do usuário"
                                        className="w-full h-full object-cover opacity-50 group-data-[isselected=true]:opacity-100"
                                        onClick={() => handleSelectedImage(img)}
                                    />
                                </div>
                            )}
                </div>
            }
        </div>
    )
};