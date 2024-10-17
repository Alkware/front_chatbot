import { useContext, useEffect } from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/Form/components/Fields/Input/Input";
import { useForm } from "react-hook-form";
import { changePasswordClient, recoverPassword } from "../../api/client";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../../components/modal/templates/PopOver";
import { PopUp } from "../../components/modal/templates/PopUp";
import { ModalChangePassword } from "./ModalChangePassword/ModalChangePassword";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Client } from "../../@types/Client.types";
import { Header } from "../Home/components/Header/Header";

interface ForgotPassword { }

export function ForgotPassword({ }: ForgotPassword) {
    const form = useForm();
    const { setModalContent, clearModal } = useContext(ModalContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            // Gerencia o thema dark e light
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark);
        })();
    }, []);


    // Função para recuperar a senha...
    const handleRecoverPassword = async (data: any) => {
        const responseRecover: AxiosResponse<Client> | void = await recoverPassword(data);

        if (!responseRecover) {
            setModalContent({
                componentName: "modal_error_recover_password",
                components: <PopOver
                    componentName="modal_error_recover_password"
                    message="Informações incorretas, verifique seus dados e tente novamente."
                    type="WARNING"
                />
            })
            return;
        }


        // Cria nova senha para o cliente e redireciona para o painel...
        const createPassowordAndRedirectToPanel = async (data: any) => {
            // Extrai a nova senha do usuário...
            const { password, confirm } = data;

            // Verifica se ela é maior que 6 caracteres
            if (password.length > 6) {
                // Verifica se ela é igual a confirmação de senha...
                if (password === confirm) {
                    // Muda a senha do usuário. (Só funciona para novos usuários, por isso a atual senha é 'wipzee')...
                    const response = await changePasswordClient({
                        client_id: responseRecover.data.id,
                        new_password: confirm
                    });

                    // Informa o usuário que a senha foi alterada com sucesso...
                    if (response?.status === 200) {
                        setModalContent({
                            componentName: "modal_show_success_password",
                            components:
                                <PopOver
                                    componentName="modal_show_success_password"
                                    message="Senha recuperada com sucesso!"
                                    functionAfterComplete={() => {
                                        navigate("/login");
                                    }}
                                />
                        })
                        //Informa que a senha não foi alterada...
                    } else setModalContent({
                        componentName: "modal_show_failed_password",
                        components:
                            <PopOver
                                componentName="modal_show_failed_password"
                                type="WARNING"
                                message='Falha ao tentar recuperar sua senha, entre em contato com o suporte'
                            />
                    })
                    // Informa que as senhas não são iguais...
                } else setModalContent({
                    componentName: "modal_pass_not_equal",
                    components:
                        <PopOver
                            componentName="modal_pass_not_equal"
                            message="Sua senha não é igual, confirme e tente novamente"
                            type="WARNING"
                        />
                })
                // Informa que  a senha é fraca...
            } else setModalContent({
                componentName: "modal_pass_is_small",
                components:
                    <PopOver
                        componentName="modal_pass_is_small"
                        message="Sua senha é muito fraca, digite uma mais forte."
                        type="WARNING"
                    />
            })

            // Fecha o modal de criar nova senha...
            clearModal("modal_create_password")
        }


        // Abre o modal para criar nova senha...
        setModalContent({
            componentName: "modal_create_password",
            components:
                <PopUp>
                    <ModalChangePassword 
                        onSubmit={createPassowordAndRedirectToPanel}
                    />
                </PopUp>
        })
    }

    return (
        <div
            className="w-screen min-h-screen flex flex-col items-center justify-center relative bg-[url(https://i.ibb.co/2vrnfCz/Untitled-design-8.png)] dark:bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover"
        >
            <Header />
            
            <div className="max-w-[95vw] md:max-w-[60vw] bg-primary-50 dark:bg-primary-200 text-dark dark:text-light flex flex-col items-center gap-4 p-4 rounded-md">
                <h2 className="text-xl md:text-2xl">Esqueceu sua senha?</h2>
                <p className="text-center">Não se preocupe, vamos ajudar recuperar sua senha</p>
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={form.handleSubmit(handleRecoverPassword)}
                >
                    <Input
                        name="fullname"
                        title="Digite seu nome completo"
                        formContext={form}
                    />
                    <Input
                        name="email"
                        title="Digite o e-mail da sua conta"
                        formContext={form}
                    />
                    <Input
                        name="cpf_cnpj"
                        title="Digite o seu cpf ou cnpj"
                        formContext={form}

                    />
                    <Button
                        customClass="mt-8"
                    >Recuperar senha</Button>
                </form>
            </div>
        </div>
    )
};