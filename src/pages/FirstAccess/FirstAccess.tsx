import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticateClient, changePasswordClient, loginClientFirstAccess } from "../../api/client";
import { useContext, useEffect, useState } from "react";
import { Header } from "../Home/components/Header/Header";
import { Root } from "../../components/Form/FormRoot";
import { ModalContext } from "../../context/ModalContext";
import { PopUp } from "../../components/modal/templates/PopUp";
import { Button } from "../../components/button/Button";
import { PopOver } from "../../components/modal/templates/PopOver";
import { loading } from "../../functions/loading";
import { InputPassword } from "../Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/ConfigProfile/components/ChangePassword/components/InputPassword/InputPassword";


const createClientFormSchema = z.object({
    email: z.string().min(1, "E-mail não pode estar vazio.").email("O e-mail é obrigatório.").toLowerCase(),
    cpf_cnpj: z.string().min(1, "Cpf ou cnpj não pode estar vazio"),
})

type createClientFormTypes = z.infer<typeof createClientFormSchema>

export function FirstAccess() {
    const navigate = useNavigate();
    const { setModalContent, clearModal } = useContext(ModalContext)
    const [access, setAccess] = useState<boolean>();
    const formLogin = useForm<createClientFormTypes>({
        resolver: zodResolver(createClientFormSchema)
    })

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)

            //verifica se o usuário já está authenticado, se estiver ele já vai direto para o painel
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token)
            if (clientIsLogged) navigate("/panel")
            else setAccess(true)
        })();
    }, [])

    const handleLogin = async (data: any) => {
        const client = await loginClientFirstAccess(data)

        if (client?.status === 200) {
            const { token } = client.data

            // Cria nova senha para o cliente e redireciona para o painel...
            const createPassowordAndRedirectToPanel = async (event: any) => {
                // Busca o componente form...
                const containerForm = event.target || event.currentTarget;
                if (!containerForm) return;

                // Adiciona loading ao botão submit...
                loading(containerForm.querySelector("button"), true);

                // Previne o comportamento padrão do form...
                event.preventDefault();

                // Extrai a nova senha do usuário...
                const password = containerForm.querySelector("input[name=password]").value;
                const confirm = containerForm.querySelector("input[name=confirm]").value;

                // Verifica se ela é maior que 6 caracteres
                if (password.length > 6) {
                    // Verifica se ela é igual a confirmação de senha...
                    if (password === confirm) {
                        // Faz o login do cliente com os dados atuais...
                        const clientIsLogged = token && await authenticateClient(token);

                        // Muda a senha do usuário. (Só funciona para novos usuários, por isso a atual senha é 'wipzee')...
                        const response = await changePasswordClient({
                            client_id: clientIsLogged.data.client.id,
                            current_password: "wipzee",
                            new_password: confirm
                        });

                        // Informa o usuário que a senha foi alterada com sucesso...
                        if (response?.status === 200) {
                            setModalContent({
                                componentName: "modal_show_success_password",
                                components:
                                    <PopOver
                                        componentName="modal_show_success_password"
                                        message="Senha criada com sucesso!"
                                        functionAfterComplete={() => {
                                            localStorage.setItem("token", token);
                                            navigate("/panel");
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
                                    message='Sua senha já foi criada, tente redefini-la em "Esqueci minha senha"'
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

                clearModal("modal_create_password")


                loading(event.currentTarget.querySelector("button"), false);
            }

            setModalContent({
                componentName: "modal_create_password",
                components:
                    <PopUp>
                        <div className="p-4">
                            <h2 className="text-center text-xl font-bold mb-8">Crie uma nova senha:</h2>
                            <form onSubmit={createPassowordAndRedirectToPanel}>
                                <div className="flex flex-col gap-4">
                                    <InputPassword
                                        name="password"
                                    />
                                    <InputPassword
                                        name="confirm"
                                    />
                                </div>
                                <Button
                                    customClass="mx-auto mt-8"
                                >Criar senha</Button>
                            </form>
                        </div>
                    </PopUp>
            })


        } else {
            setModalContent({
                componentName: "modal_error_first_access",
                components:
                    <PopOver
                        componentName="modal_error_first_access"
                        message="E-mail ou cpf/cnpj inválidos!"
                        type="WARNING"
                    />
            })
        }

    }

    return (
        access &&
        <div className="w-screen min-h-screen  flex flex-col items-center justify-center bg-[url(https://i.ibb.co/2vrnfCz/Untitled-design-8.png)] dark:bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover overflow-hidden">

            <Header />

            <div className="w-full h-full flex items-center justify-center">

                <div className="w-full max-w-[480px] border border-primary-100 text-primary-100 backdrop-blur-md dark:text-light rounded-2xl flex flex-col items-center relative p-4 gap-2">
                    <h1 className="text-2xl font-bold">Faça seu primeiro acesso!</h1>
                    <h3 className="opacity-80 text-center">Use o mesmo e-mail e cpf/cnpj que você utilizou para fazer o pagamento do plano.</h3>

                    <Root.Form
                        form={formLogin}
                        onSubmit={handleLogin}
                        hiddenPreviewButton={true}
                    >
                        <Root.Step
                            index={0}
                        >
                            <Root.Input
                                name="email"
                                title="Digite seu e-mail:"
                            />
                            <Root.Input
                                name="cpf_cnpj"
                                title="Digite seu cpf ou cnpj:"
                            />
                        </Root.Step>
                    </Root.Form>
                </div>

            </div>
        </div>
    )
}
