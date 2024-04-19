import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticateClient, changePasswordClient, loginClientFirstAccess } from "../../api/client";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Header } from "../Home/components/Header/Header";
import { Root } from "../../components/Form/FormRoot";
import { ModalContext } from "../../context/ModalContext";
import { PopUp } from "../../components/modal/templates/PopUp";
import { Button } from "../../components/button/Button";
import { PopOver } from "../../components/modal/templates/PopOver";


const createClientFormSchema = z.object({
    email: z.string().min(1, "E-mail não pode estar vazio.").email("O e-mail é obrigatório.").toLowerCase(),
    cpf_cnpj: z.string().min(1, "Cpf ou cnpj não pode estar vazio"),
})

type createClientFormTypes = z.infer<typeof createClientFormSchema>

export function FirstAccess() {
    const navigate = useNavigate();
    const { setModalContent } = useContext(ModalContext)
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

            const createPassowordAndRedirectToPanel = async (event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const containerInputs: any = event.currentTarget;
                if (!containerInputs) return;

                const password = containerInputs.querySelector("input[name=password]").value;
                const confirm = containerInputs.querySelector("input[name=confirm]").value;


                if (password.length > 6) {
                    if (password === confirm) {
                        const clientIsLogged = token && await authenticateClient(token)
                        const response = await changePasswordClient({
                            client_id: clientIsLogged.data.client.id,
                            current_password: "wipzee",
                            new_password: confirm
                        });

                        if (response?.status === 200) {
                            setModalContent({
                                componentName: "modal_show_success_password",
                                components:
                                    <PopOver
                                        componentName="modal_show_success_password"
                                        message="Senha criada com sucesso!"
                                        functionAfterComplete={()=>{
                                            localStorage.setItem("token", token);
                                            navigate("/panel");
                                        }}
                                    />
                            })
                        }
                    } else setModalContent({
                        componentName: "modal_pass_not_equal",
                        components:
                            <PopOver
                                componentName="modal_pass_not_equal"
                                message="Sua senha não é igual, confirme e tente novamente"
                                type="WARNING"
                            />
                    })
                } else setModalContent({
                    componentName: "modal_pass_is_small",
                    components:
                        <PopOver
                            componentName="modal_pass_is_small"
                            message="Sua senha é muito fraca, digite uma mais forte."
                            type="WARNING"
                        />
                })


            }

            setModalContent({
                componentName: "modal_create_password",
                components:
                    <PopUp>
                        <h2 className="text-center text-xl font-bold mb-8">Crie uma nova senha:</h2>
                        <form onSubmit={createPassowordAndRedirectToPanel}>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Digite sua nova senha"
                                />
                                <input
                                    type="password"
                                    name="confirm"
                                    placeholder="Confirme sua senha"
                                />
                            </div>
                            <Button
                                customClass="mx-auto mt-8"
                            >Criar senha</Button>
                        </form>
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
        <div className="w-screen h-screen flex flex-col items-center dark:bg-dark bg-light dark:text-light text-gray">

            <Header />

            <div className="w-full h-full flex items-center justify-center">

                <div className="w-full max-w-[480px] border border-primary-100 rounded-2xl flex flex-col items-center relative p-4 gap-2">
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
