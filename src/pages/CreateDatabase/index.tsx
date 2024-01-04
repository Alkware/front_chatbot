import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PopOver } from "../../components/modal/templates/PopOver";
import { useNavigate, useParams } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import { getPlanManagementById } from "../../api/planManagement";
import { z } from "zod";
import { DatabaseSchema } from "../../@types/projectZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewDatabase } from "../../api/Prompt";
import { Prompt } from "../../@types/prompt.types";
import { BackHome } from "../CreateChat/components/BackHome";
import { Button } from "../../components/button/Button";
import { Steps } from "../CreateChat/components/Steps";
import { InputTextForm } from "../../components/Forms/Components/InputTextForm";
import { TextareaForm } from "../../components/Forms/Components/TextareaForm";

type ModalCreateDatabaseType = z.infer<typeof DatabaseSchema>

export function CreateDatabase() {
    const { handleSubmit, formState: { errors }, getValues } = useForm<ModalCreateDatabaseType>({
        resolver: zodResolver(DatabaseSchema)
    });
    const { setModalContent } = useContext(ModalContext);
    const formRef: RefObject<HTMLFormElement> = useRef(null);
    const { plan_management_id } = useParams();
    const tabIndex = ["database_information", "prompt", "describe_client",]
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const planManagement = await getPlanManagementById(plan_management_id)
            if (!planManagement) navigate("/panel")
        })()
    }, [])

    const handleCreateDatabase = async (data: any) => {
        try {
            if (!plan_management_id) throw new Error("plan management id is missing!")

            const { prompt, describe_client, prompt_name }: Prompt = data;

            const database = await createNewDatabase({
                prompt_name,
                prompt,
                plan_management_id,
                describe_client,
            });

            if (database && database.status === 201) {
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Database criada com sucesso" />
                })

                const timeout = setTimeout(() => {
                    navigate("/panel")
                    clearTimeout(timeout)
                }, 2000);

            }
        } catch (error) {
            throw new Error("Erro ao tentar criar o projeto")
        }
    }

    const handleNextStep = (isNext: boolean = true) => {

        if (isNext) {
            const { prompt, describe_client, prompt_name } = getValues();
            const errorInputs = { message: "" };

            if (currentIndex === 0 && !prompt_name) errorInputs.message = "Você definir um nome para sua base de dados."
            if (currentIndex === 1 && !prompt) errorInputs.message = "Você precisa criar um prompt."
            if (currentIndex === 2 && !describe_client) errorInputs.message = "Você precisa definir a persona do seu client."


            if (errorInputs.message.length > 0) {
                setModalContent({ isOpenModal: true, components: <PopOver message={errorInputs.message} type="WARNING" /> })
                return
            }

        }

        const form = formRef.current
        const index = isNext ?
            (currentIndex < (tabIndex.length - 1) ? (currentIndex + 1) : (tabIndex.length - 1))
            :
            (currentIndex > 0 ? (currentIndex - 1) : 0);

        const currentContainerIndex = tabIndex[index]

        function addHiddenOnContent() {
            if (form) {
                const divs = [...form.querySelectorAll("div#container")];
                if (divs) {
                    divs.forEach(div => {
                        div.classList.add("hidden")
                    })
                }
            }
        }

        function addFlexCurrentContent() {
            if (form) {
                addHiddenOnContent();
                const divActive = form.querySelector(`div[data-index='${currentContainerIndex}']`);
                if (divActive) {
                    divActive.classList.add("flex")
                    divActive.classList.remove("hidden")
                }
            }
        }

        addFlexCurrentContent();
        setCurrentIndex(index)
    }


    return (
        <div className="w-screen h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center">
            <div className="w-4/5 flex flex-col gap-2 justify-center items-center">

                <BackHome />

                <Steps
                    tabIndex={tabIndex}
                    currentIndex={currentIndex}
                />

                {
                    <div className="flex flex-col gap-12 w-3/4 max-w-[700px]">

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit(handleCreateDatabase)}
                            className="w-full h-full flex flex-col items-center relative px-8"
                        >
                            <div
                                className="w-full flex flex-col my-12"
                                id="container"
                                data-index="database_information"
                            >
                                <InputTextForm
                                    field_name="prompt_name"
                                    title="Digite no nome dessa base de dados"
                                />
                                {errors.prompt_name?.message}
                            </div>

                            <div
                                className="w-full flex-col my-12 hidden"
                                id="container"
                                data-index="prompt"
                            >
                                <TextareaForm
                                    field_name="prompt"
                                    height={300}
                                    title="Escreva seu prompt aqui..."
                                />
                                {errors.prompt?.message}
                            </div>


                            <div
                                className="w-full flex-col hidden"
                                id="container"
                                data-index="describe_client"
                            >
                                <TextareaForm
                                    field_name="describe_client"
                                    height={150}
                                    title="Escreva a persona do seu publico aqui..."
                                />
                                {errors.prompt?.message}
                            </div>



                            {
                                currentIndex === (tabIndex.length - 1) &&
                                <input
                                    type="submit"
                                    value="Criar base de dados"
                                    className="w-full mt-16 bg-dark-color_main cursor-pointer font-bold hover:brightness-110 transition-colors"
                                />
                            }
                        </form>

                        <div className="w-full flex gap-20 justify-center items-center">
                            {
                                currentIndex > 0 &&
                                <span
                                    className="underline cursor-pointer"
                                    onClick={() => handleNextStep(false)}
                                >Voltar</span>
                            }
                            <Button
                                className={`${currentIndex >= (tabIndex.length - 1) ? "hidden" : "block"}`}
                                onClick={() => handleNextStep(true)}
                            >Proximo</Button>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
};