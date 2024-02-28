import { FormProvider, useForm } from "react-hook-form";
import { Container } from "../../../../../../../../components/Container/Container";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { useContext } from "react";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { Button } from "../../../../../../../../components/button/Button";
import { FaLock, FaSave } from "react-icons/fa";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import { checkUserIsAvailable, updateClient } from "../../../../../../../../api/client";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";

export function ConfigProfile() {
    const { setModalContent } = useContext(ModalContext)
    const { client, setClient } = useContext(ClientContext)
    const formEditUser = useForm({
        defaultValues: {
            fullname: client?.fullname,
            user: client?.user,
            cpf_cnpj: client?.cpf_cnpj,
            email: client?.email,
            password: "senha-qualquer"
        }
    });
    const { handleSubmit } = formEditUser

    const handleSaveDataUser = async (data: any) => {
        if (client?.user === data.user || await checkUserIsAvailable(data.user)) {
            data.client_id = client?.id;
            const response = await updateClient(data);


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
                    className="w-2/3 mx-auto p-4 px-8 flex flex-col gap-6"
                >

                    <Root.Container className="flex items-center gap-4">
                        <Root.Input
                            name="fullname"
                            title="Nome completo"
                        />

                        <Root.Input
                            name="user"
                            title="Usuário"
                        />
                    </Root.Container>

                    <Root.Input
                        name="cpf_cnpj"
                        title="CNPJ ou CPF"
                    />

                    <Root.Container
                        className="flex gap-4 justify-center items-center"
                    >
                        <Root.Container >
                            <Root.Input
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
                        className="flex gap-4 justify-center items-center"
                    >
                        <Root.Container >
                            <Root.Input
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