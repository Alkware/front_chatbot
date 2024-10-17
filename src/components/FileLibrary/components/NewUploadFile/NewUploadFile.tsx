import { ChangeEvent, Dispatch, RefObject, SetStateAction, useContext, useEffect, useRef } from "react";
import { RiUpload2Line } from "react-icons/ri";
import { ModalContext } from "../../../../context/ModalContext";
import { PopUp } from "../../../modal/templates/PopUp";
import { FillImageInfo } from "./components/FillImageInfo/FillImageInfo";
import { Image } from "../../../../@types/images.types";
import { MdAdd } from "react-icons/md";
import { FileAccept, ListFilesAccept } from "../../FileLibrary";

interface NewUploadFile {
    name?: string;
    client_id: string;
    acceptFiles?: FileAccept[];
    imagesSelected: Image[] | undefined;
    setImagesSelected: Dispatch<SetStateAction<Image[] | undefined>>;
}

const listFilesAccept: ListFilesAccept = {
    img: [".png", ".jpg", ".jpeg", ".webp"],
    csx: [".csx"],
    pdf: [".pdf"],
    txt: [".txt"]
}

export function NewUploadFile({ name, acceptFiles, client_id, imagesSelected, setImagesSelected }: NewUploadFile) {
    const { setModalContent } = useContext(ModalContext)
    const containerUploadFileRef: RefObject<HTMLDivElement> = useRef(null);
    const loadingRef: RefObject<HTMLLabelElement> = useRef(null);

    useEffect(() => {
        // Adiciona uma transição de opacidade ao conteiner
        const timeout = setTimeout(() => {
            containerUploadFileRef.current?.classList.remove("opacity-0", "opacity-100")
            containerUploadFileRef.current?.classList.add("opacity-100")
            clearTimeout(timeout);
        }, 100);
    }, []);

    // Função responsável por selecionar os arquivos aceitos no input file...
    const handleSelectFilesAccept = () => {
        // Fará uma busca dentro da lista de arquivos aceitos usando a lista do usuário, 
        // caso não tenha lista, será usado como padrão a 'img'...
        const list = acceptFiles?.map(list => listFilesAccept[list]) || listFilesAccept["img"];
        // Returna a lista encontrada em formato string...
        return list?.join()
    }

    // Função responsável por abrir uma nova modal para que o usuário possa preencher a descrição da imagem...
    const handleDisplayModalFillDescriptionImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files?.length) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload = (e) => {
                setModalContent({
                    componentName: "modal_fill_image_info",
                    components: <PopUp blockCloseModalWithClickBackground={true}>
                        <FillImageInfo
                            src={e.target?.result}
                            file={files[0]}
                            client_id={client_id}
                            setFiles={setImagesSelected}
                        />
                    </PopUp>
                })
            }
        }
    }

    return (
        <div
            ref={containerUploadFileRef}
            className="w-full max-w-[600px] min-w-[400px] min-h-[100px] flex justify-center items-center border border-dashed border-white/50 rounded-md transition-opacity opacity-0 px-4 gap-4"
            data-id={name}
        >
            {imagesSelected?.map(file =>
                <div 
                    key={file.id}
                    className="border rounded-full overflow-hidden"
                >
                    <img
                        className="w-14 h-14 object-contain"
                        src={file.url || "https://via.placeholder.com/100"}
                    />
                </div>
            )}

            <label
                ref={loadingRef}
                htmlFor={name}
                data-hasfile={!!imagesSelected?.length}
                className="group w-full data-[hasfile=true]:w-14 data-[hasfile=true]:h-14 relative overflow-hidden border border-light/60 data-[hasfile=false]:border-none rounded-md p-2 cursor-pointer text-center flex justify-center items-center"
            >
                <span
                    className="px-4 text-white rounded-xl font-bold flex flex-col gap-2 justify-center items-center"
                    id="container"
                >
                    <span
                        className="text-xs opacity-80 group-data-[hasfile=true]:hidden"
                    >Faça seu upload aqui</span>
                    {!!imagesSelected?.length ?
                        <MdAdd
                            className="text-3xl font-bold"
                            id="icon-upload"
                        />
                        :
                        <RiUpload2Line
                            className="text-3xl font-bold"
                            id="icon-upload"
                        />
                    }

                </span>

                <input
                    id={name}
                    type="file"
                    className="hidden"
                    accept={handleSelectFilesAccept()}
                    onChange={handleDisplayModalFillDescriptionImage}
                />

            </label>

        </div >
    )
};