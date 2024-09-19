import { MdSave } from "react-icons/md";
import { Button } from "../../../../../button/Button";
import { SubTitle } from "../../../../../SubTitle/SubTitle";
import { TextArea } from "../../../../../Form/components/Fields/TextArea/TextArea";
import { uploadImage } from "../../../../../../api/images";
import { FieldValues, useForm } from "react-hook-form";
import { Dispatch, RefObject, SetStateAction, useContext, useRef } from "react";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopOver } from "../../../../../modal/templates/PopOver";
import { loading } from "../../../../../../functions/loading";
import { Image } from "../../../../../../@types/images.types";

interface FillImageInfo {
    client_id: string;
    src: string | ArrayBuffer | null | undefined;
    file: File;
    setFiles: Dispatch<SetStateAction<Image[] | undefined>>
}

export function FillImageInfo({ src, file, client_id, setFiles }: FillImageInfo) {
    const transformSrcImage = src as string;
    const { setModalContent, clearModal } = useContext(ModalContext)
    const form = useForm();
    const containerFormRef: RefObject<HTMLFormElement> = useRef(null);
    const MIN_CHARACTERS = 40;

    // Função responsável por fazer o upload do arquivo no servidor e salvar as informações no banco de dados...
    const handleSaveImage = async ({ description }: FieldValues) => {
        const button = containerFormRef.current?.querySelector("button");
        loading(button, true)

        // Verifica se existe client id e se a descrição possui pelo menos ${MIN_CHARACTERES}.
        if (!client_id || !description) {
            if (!client_id) console.error("Client id is missing!")
            if (!description || description.length < MIN_CHARACTERS) {
                setModalContent({
                    componentName: "modal_missing_description",
                    components: <PopOver
                        componentName="modal_missing_description"
                        message={`A descrição da imagem precisa ter no mínimo ${MIN_CHARACTERS} caracteres.`}
                        type="WARNING"
                    />
                })
            }
            loading(button, false)
            return;
        }

        // Faz o upload da imagem...
        const response = await uploadImage(file, {
            client_id,
            description,
        });

        loading(button, false)

        // Verifica se o upload foi feito com sucesso...
        if (!response) {
            setModalContent({
                componentName: "modal_failed_save_img",
                components: <PopOver
                    componentName="modal_failed_save_img"
                    message="Não foi possível salvar sua imagem, tente outra imagem ou entre em contato com o suporte"
                    type="ERROR"
                    functionAfterComplete={() => clearModal(null, { clearAll: true })}
                />
            })
            return;
        };

        setFiles(values => values ? [...values, response] : [response ]);
        clearModal(null, { clearLast: true })
    }

    return (
        <div className="w-full max-w-[400px] flex flex-col justify-center items-center gap-6 p-4">
            <img
                src={transformSrcImage}
                alt="Imagem que acabou de ser feito o upload"
                className="w-20 h-20 object-cover rounded-full border-2 border-white"
            />

            <form
                ref={containerFormRef}
                className="space-y-6"
                onSubmit={form.handleSubmit(handleSaveImage)}
            >
                <SubTitle className="oapcity-70 text-sm">
                    Faça uma descrição detalhada dessa imagem para que a inteligência artificial possa interpleta-la.
                </SubTitle>

                <TextArea
                    name="description"
                    title="Descrição da imagem"
                    minText={MIN_CHARACTERS}
                    formContext={form}
                />
                <Button><MdSave /> Salvar</Button>
            </form>

        </div>
    )
};