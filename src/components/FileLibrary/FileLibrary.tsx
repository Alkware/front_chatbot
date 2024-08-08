import { Title } from "../Title/Title";
import { MyLibrary } from "./components/MyLibrary/MyLibrary";
import { Button } from "../button/Button";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../modal/templates/PopOver";
import { NewUploadFile } from "./components/NewUploadFile/NewUploadFile";
import { Image } from "../../@types/images.types";
import { UseFormRegister } from "react-hook-form";


export type FileAccept = "img" | "csx" | "txt" | "pdf"

export interface ListFilesAccept {
    img: Array<".png" | ".jpg" | ".jpeg" | ".webp">;
    csx: Array<".csx">;
    txt: Array<".txt">;
    pdf: Array<".pdf">;
}
interface FileLibrary {
    name: string
    client_id: string;
    acceptFiles?: FileAccept[];
    limitSelect?: number;
    setFiles?: Dispatch<SetStateAction<Image[] | undefined>>
    register?: UseFormRegister<any>
}

export function FileLibrary({ name, client_id, acceptFiles, limitSelect, setFiles, register }: FileLibrary) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const [imagesSelected, setImagesSelected] = useState<Image[]>();
    const [newUploadIsActive, setNewUploadIsActive] = useState(true);

    useEffect(() => {
        if (limitSelect && imagesSelected) {
            if (imagesSelected?.length > limitSelect) {
                setModalContent({
                    componentName: "modal_limit_image",
                    components:
                        <PopOver
                            componentName="modal_limit_image"
                            message={`Não é possivel selecionar mais do que ${limitSelect} arquivos.`}
                            type="WARNING"
                        />
                });
                imagesSelected.pop()
                setImagesSelected(imagesSelected);
            }
        }

    }, [imagesSelected])

    // Função responsável por devolver os arquivos que foram selecionados...
    const handleSelectFiles = async () => {
        (setFiles && setFiles(values => values ? imagesSelected ? [...values, ...imagesSelected] : values : imagesSelected));
        (register && (
            imagesSelected?.forEach((img, index) => register(`${name}.${index}`, { value: img.id }))
        ));

        clearModal(null, { clearAll: true });
    }

    return (
        <div className="w-full h-full flex flex-col items-center min-w-[400px] bg-dark overflow-hidden rounded-md">
            {/* TABS  */}
            <div className="flex w-full">
                <Title
                    data-active={newUploadIsActive}
                    className="w-1/2 p-1 cursor-pointer data-[active=false]:bg-primary-200 md:text-lg"
                    onClick={() => setNewUploadIsActive(true)}
                >Novo arquivo</Title>
                <Title
                    data-active={!newUploadIsActive}
                    className="w-1/2 p-1 cursor-pointer data-[active=false]:bg-primary-200 md:text-lg"
                    onClick={() => setNewUploadIsActive(false)}
                >Minha biblioteca</Title>
            </div>

            <div className="flex flex-col items-center p-4 gap-4">
                {newUploadIsActive ?
                    /* CONTAINER NOVO UPLOAD DE ARQUIVO */
                    <NewUploadFile
                        name="images"
                        client_id={client_id}
                        acceptFiles={acceptFiles}
                        imagesSelected={imagesSelected}
                        setImagesSelected={setImagesSelected}
                    />
                    :
                    /* CONTAINER MINHA BIBLIOTECA */
                    <MyLibrary
                        client_id={client_id}
                        imagesSelected={imagesSelected}
                        setImagesSelected={setImagesSelected}
                    />
                }


                <Button
                    onClick={handleSelectFiles}
                >Selecionar {!!imagesSelected?.length ? imagesSelected.length : ""}</Button>
            </div>
        </div>
    )
};