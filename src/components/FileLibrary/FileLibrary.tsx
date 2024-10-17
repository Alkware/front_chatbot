import { Text } from "../Text/Text";
import { MyLibrary } from "./components/MyLibrary/MyLibrary";
import { Button } from "../button/Button";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../modal/templates/PopOver";
import { NewUploadFile } from "./components/NewUploadFile/NewUploadFile";
import { Image } from "../../@types/images.types";
import { FaImages, FaUpload } from "react-icons/fa";

export type FileAccept = "img" | "csx" | "txt" | "pdf"

export interface ListFilesAccept {
    img: Array<".png" | ".jpg" | ".jpeg" | ".webp">;
    csx: Array<".csx">;
    txt: Array<".txt">;
    pdf: Array<".pdf">;
}
interface FileLibrary {
    name?: string
    client_id: string;
    acceptFiles?: FileAccept[];
    limitSelect?: number;
    setFiles?: Dispatch<SetStateAction<Image[] | undefined>>
    onAction?: (logo_id: string[])=> void;
}

export function FileLibrary({ name, client_id, acceptFiles, limitSelect, setFiles, onAction }: FileLibrary) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const [imagesSelected, setImagesSelected] = useState<Image[]>();
    const [newUploadIsActive, setNewUploadIsActive] = useState<boolean>();

    /**
     * USEEFFECT VERIFICA SE O USUÁRIO JÁ ESTOUROU O LIMITE DE ARQUIVOS PERMITIDOS PARA A SELEÇÃO.
     */
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

    /**
     * FUNÇÃO RESPONSÁVEL POR DEVOLVER OS ARQUIVOS SELECIONADOS AO ELEMENTO PAI ATRAVÉS DE UM SETSTATE OU REGISTER.
     */
    const handleSelectFiles = async () => {
        // Verifica se o usuário selecionou alguma imagem.
        if (!imagesSelected) {
            setModalContent({
                componentName: "modal_empty_images",
                components: <PopOver componentName="modal_empty_images" message="Você ainda não selecionou nenhuma imagem" type="WARNING" />
            });
            return;
        }

        // Caso seja solicitado os arquivos selecionados em um setState...
        (setFiles &&
            setFiles(values => {
                // Verifica se tem valores dentro do Files...
                if (values) {
                    // Elimina os arquivos que já contem dentro das imagens selecionadas e dos valores dentro de setFiles...
                    const filteredImagensSelected = imagesSelected.filter(img => !values?.find(value => value?.id === img?.id));
                    // Verifica se tem um limite de seleção e se a quantidade de arquivos dentro do values está dentro desse limite...
                    if (limitSelect && values.length < limitSelect) {
                        // Caso já tenha arquivos dentro de 'values', será necessário remover alguns arquivos selecionados,
                        // caso não haja espaço dentro do 'values'
                        const images = filteredImagensSelected?.filter((img, index) => index < (limitSelect - values.length) && img);
                        // Verifica se ainda tem arquivos dentro de images
                        if (images?.length) {
                            // Cria um alerta ao usuário caso tenha sido removido alguns arquivos....
                            if (filteredImagensSelected.length > (limitSelect - values.length)) {
                                setModalContent({
                                    componentName: "modal_max_limit",
                                    components:
                                        <PopOver
                                            componentName="modal_max_limit"
                                            message={`Você já selecionou ${values?.length} imagens, removeremos algumas imagens para que não exceda o limite de ${limitSelect} imagens. `}
                                            type="WARNING"
                                        />
                                });
                            }
                            return [...values, ...images];
                        } else return values;
                    } else return [...values, ...filteredImagensSelected]
                } else return imagesSelected;
            })
        );

        // Uma função para executar algum comando após a seleção da imagem
        (onAction && onAction(imagesSelected.map(img => img.id)))

        clearModal(null, { clearLast: true });
    }

    return (
        <div className="w-[60vw] h-[50vh] min-w-[400px] max-w-[600px] max-h-[500px] flex flex-col items-center bg-dark overflow-hidden rounded-md">
            {/* TABS  */}
            <div className="flex w-full">
                <Text.h2
                    data-active={!!newUploadIsActive}
                    className="w-1/2 p-1 cursor-pointer data-[active=false]:bg-primary-200 md:text-lg"
                    onClick={() => setNewUploadIsActive(true)}
                ><FaUpload /> Novo arquivo</Text.h2>
                <Text.h2
                    data-active={!newUploadIsActive}
                    className="w-1/2 p-1 cursor-pointer data-[active=false]:bg-primary-200 md:text-lg"
                    onClick={() => setNewUploadIsActive(false)}
                ><FaImages /> Minha biblioteca</Text.h2>
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
                {!!newUploadIsActive ?
                    /* CONTAINER NOVO UPLOAD DE ARQUIVO */
                    <NewUploadFile
                        name={name}
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