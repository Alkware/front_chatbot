import { RefObject, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatabaseSchema, z } from "../../../../../../../../../../@types/projectZodSchema";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { updateDatabase } from "../../../../../../../../../../api/Prompt";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { InputTextForm } from "../../../../../../../../../../components/Forms/Components/InputTextForm";
import { TextareaForm } from "../../../../../../../../../../components/Forms/Components/TextareaForm";



type ModalCreateDatabaseType = z.infer<typeof DatabaseSchema>

export function ModalEditDatabase({ prompt }: { prompt: Prompt }) {
    const { handleSubmit } = useForm<ModalCreateDatabaseType>({
        resolver: zodResolver(DatabaseSchema),
        defaultValues:{
            describe_client: prompt.describe_client,
            prompt: prompt.prompt,
            prompt_name: prompt.prompt_name
        }
    });
    const { setModalContent } = useContext(ModalContext)
    const formRef: RefObject<HTMLFormElement> = useRef(null);


    const handleUpdateDatabase = async (data: any) => {
        if (data) {
            const projectUpdate = await updateDatabase(data, prompt.id)
            if (projectUpdate && projectUpdate.status === 200) {
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Database atualizado com sucesso" />
                })
            }
        }
    }

    const handleExitModal = () => {
        setModalContent({
            isOpenModal: false
        })
    }

    return (
        <div className="w-[70vw] h-[60vh] overflow-auto text-light ">
            <div className="w-full h-full">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit(handleUpdateDatabase)}
                    className="w-full flex flex-col items-center relative px-8"
                >
                    <div
                        className="w-full flex flex-col my-12"
                        id="container"
                        data-index="database_information"
                    >
                        <InputTextForm
                            field_name="prompt_name"
                            title="Digite o nome dessa base de dados"
                        />
                    </div>

                    <div
                        className="w-full flex-col my-12"
                        id="container"
                        data-index="prompt"
                    >
                        <TextareaForm
                            field_name="prompt"
                            height={300}
                            title="Escreva seu prompt aqui..."
                        />
                    </div>


                    <div
                        className="w-full flex-col"
                        id="container"
                        data-index="describe_client"
                    >
                        <TextareaForm
                            field_name="describe_client"
                            height={150}
                            title="Escreva a persona do seu publico aqui..."
                        />
                    </div>

                    <input className="cursor-pointer" type="submit" value="salvar" />
                </form>

                <div className="w-full flex mt-4 justify-center items-center">
                    <span
                        className="underline cursor-pointer"
                        onClick={handleExitModal}
                    >Sair</span>
                </div>
            </div>
        </div>
    )
};