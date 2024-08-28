import { FormProvider, useForm } from "react-hook-form";
import { Container } from "../../../../../../../../components/Container/Container";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { useContext, useEffect } from "react";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { Button } from "../../../../../../../../components/button/Button";
import { FaLock, FaSave } from "react-icons/fa";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import { checkUserIsAvailable, updateClient } from "../../../../../../../../api/client";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";
import { object, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../../../../../components/Form/components/Fields/Input/Input";

const clientSchema = z.object({
    fullname: z.string().min(1, "Digite seu nome completo!").refine(text => { 
        const splitText = text.split(" ");
        if(splitText.length >= 2 && !!splitText[1]) return true;
        return false;
    }, "Vocẽ precisa informar seu nome completo"),
    user: z.string().min(1, "Digite um nome de usuário!").max(25, "Nome de usuário muito longe, informe um menor."),
    email: z.string().email(),
    password: z.string().min(8, "Sua senha precisa ter no minimo 8 caracteres!"),
})

export function ConfigProfile() {
    const { setModalContent } = useContext(ModalContext)
    const { client, setClient } = useContext(ClientContext)
    const formEditUser = useForm({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            fullname: client?.fullname,
            user: client?.user,
            email: client?.email,
            password: "senha-qualquer"
        }
    });
    const { handleSubmit, formState: { errors } } = formEditUser

    useEffect(() => {
        const message = findMessageError(errors);
        if (!!message) {
            setModalContent({
                componentName: "modal_error_message",
                components:
                    <PopOver
                        message={message}
                        type="WARNING"
                        componentName="modal_error_message"
                    />
            })
        }

    }, [errors]);

    const findMessageError = (errors: any) => {
        if (typeof errors === 'object' && object !== null) {

            for (let key in errors) {

                if (key === "message") {
                    return errors[key]
                }
                else {
                    const errorMessage: any = findMessageError(errors[key]);
                    if (errorMessage !== undefined) return errorMessage;
                }

            }
        }
    }


    const handleSaveDataUser = async (data: any) => {
        if(!client) return;
        if (client?.user === data.user || await checkUserIsAvailable(data.user)) {
            const response = await updateClient(client?.id, data);


            if (response?.status === 200) {
                setClient(response.data);
                setModalContent({
                    componentName: "modal_user_success",
                    components:
                        <PopOver
                            componentName="modal_user_success"
                            message="Perfil atualizado com sucesso"
                        />
                })
            }
        } else {
            setModalContent({
                componentName: "modal_error_user",
                components:
                    <PopOver
                        componentName="modal_error_user"
                        message="Usuário informado não está disponível!"
                        type={"WARNING"}
                    />
            })
        }
    }

    const handleChangePassword = () => {

        setModalContent({
            componentName: "modal_show_password",
            components:
                <PopUp>
                    <FormProvider {...formEditUser}>
                        <ChangePassword />
                    </FormProvider>
                </PopUp>
        })
    }

    const handleChangeEmail = () => {
        setModalContent({
            componentName: "modal_show_email",
            components:
                <PopOver
                    componentName="modal_show_email"
                    message="Ainda não é possível atualizar o e-mail, para mais informações entre em contato com o suporte."
                    type="WARNING"
                />
        })
    }

    return (
        <Container title="Configurações">
            <FormProvider {...formEditUser}>
                <form
                    onSubmit={handleSubmit(handleSaveDataUser)}
                    className="w-full md:w-2/3 mx-auto p-4 px-8 flex flex-col gap-6"
                >

                    <Root.Container className="w-full flex flex-col md:flex-row items-center gap-4">
                        <Input
                            name="fullname"
                            title="Nome completo"
                        />

                        <Input
                            name="user"
                            title="Usuário"
                        />
                    </Root.Container>

                    <Root.Container
                        className="flex flex-col md:flex-row gap-4 justify-center items-center"
                    >
                        <Root.Container >
                            <Input
                                type="email"
                                name="email"
                                title="Informe seu e-mail"
                                disabled={true}
                            />
                        </Root.Container>

                        <Button
                            type="button"
                            customClass="min-w-[200px] flex justify-center items-center gap-2"
                            onClick={handleChangeEmail}
                        >
                            Alterar e-mail
                            <FaLock />
                        </Button>
                    </Root.Container>

                    <Root.Container
                        className="flex flex-col md:flex-row gap-4 justify-center items-center"
                    >
                        <Root.Container >
                            <Input
                                type="password"
                                name="password"
                                title="Sua senha"
                                disabled={true}
                            />
                        </Root.Container>

                        <Button
                            type="button"
                            customClass="min-w-[200px] flex justify-center items-center gap-2"
                            onClick={handleChangePassword}
                        >
                            Alterar senha
                            <FaLock />
                        </Button>
                    </Root.Container>


                    <Button customClass="flex gap-2 mt-8">Salvar <FaSave /></Button>
                </form>
            </FormProvider>
        </Container>
    )
};