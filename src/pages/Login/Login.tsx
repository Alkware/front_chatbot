import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticateClient, loginClient } from "../../api/client";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { Header } from "../Home/components/Header/Header";
import { Root } from "../../components/Form/FormRoot";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../../components/modal/templates/PopOver";
import { loading } from "../../functions/loading";
import { saveGuest } from "../../api/guest.api";

const createClientFormSchema = z.object({
    email: z.string().min(1, "E-mail não pode estar vazio.").email("O e-mail é obrigatório.").toLowerCase(),
    password: z.string().min(1, "Sua senha não pode estar vazia."),
})

type createClientFormTypes = z.infer<typeof createClientFormSchema>


function Login() {
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();
    const [access, setAccess] = useState<boolean>();
    const containerFormRef: RefObject<HTMLDivElement> = useRef(null);
    const formLogin = useForm<createClientFormTypes>({
        resolver: zodResolver(createClientFormSchema)
    });

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)

            //verifica se o usuário já está authenticado, se estiver ele já vai direto para o painel
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token)
            if (clientIsLogged) window.location.href = "/panel"
            else setAccess(true)

            // Salva o convidado no banco de dados...
            saveGuest();
        })();
    }, [])

    const handleLogin = async (data: any) => {
        // Adiciona loading no botão
        const button = containerFormRef.current?.querySelector('[data-loading]');
        loading(button, true)

        // Verifica os dados do cliente
        const client = await loginClient(data)

        if (client) {
            const { token } = client.data
            localStorage.setItem("token", token);
            loading(button, false)
            window.location.href = "/panel"
        } else {
            loading(button, false);
            setModalContent({
                componentName: "modal_error_authenticate",
                components: <PopOver
                    componentName="modal_error_authenticate"
                    message="E-mail ou senha incorreto!"
                    type="WARNING"
                />
            })
        }
    }

    return (
        access &&
        <div className="w-screen min-h-screen flex flex-col justify-start items-center dark:bg-dark bg-light relative">
            <Header />

            <div className="w-full h-full flex gap-4 flex-col justify-center items-center relative p-4 mt-[75px] md:mt-[100px]">
                <div className="w-[95%] md:w-4/5 flex flex-col sm:flex-row items-center rounded-xl">

                    <div className="w-full nvxs:w-4/5 sm:w-3/5 py-4 flex flex-col justify-start items-center bg-primary-50 dark:bg-primary-200 rounded-xl">
                        <h1 className="text-xl md:text-2xl text-light text-center font-bold">Acesse nossa plataforma</h1>

                        <div
                            ref={containerFormRef}
                            className="w-full flex flex-col text-light px-4"
                        >
                            <Root.Form
                                form={formLogin}
                                onSubmit={formLogin.handleSubmit(handleLogin)}
                                hiddenPreviewButton={true}
                                titleButtonSend="Entrar"
                            >
                                <Root.Step index={0}>
                                    <Root.Input
                                        name="email"
                                        title="Digite seu e-mail de acesso"
                                    />
                                    <Root.Input
                                        name="password"
                                        title="Digite sua senha"
                                        type="password"
                                    />

                                </Root.Step>
                            </Root.Form>

                            <div className="w-full flex flex-col justify-evenly items-center ">
                                <a
                                    className="underline cursor-pointer"
                                    onClick={() => navigate("/forgot-password")}
                                >Esqueci minha senha</a>

                                <div className="w-full flex gap-2 items-center my-4">
                                    <div className="w-full h-1 bg-gradient-to-r from-transparent to-primary-100 rounded-xl"></div>
                                    <span className="font-bold text-sm">OU</span>
                                    <div className="w-full h-1 bg-gradient-to-r from-primary-100 to-transparent rounded-xl"></div>
                                </div>
                                <a
                                    className="underline cursor-pointer"
                                    onClick={() => navigate("/register")}
                                >Cadastre-se</a>


                            </div>
                        </div>

                    </div>
                    <div
                        className="w-1/2"
                    >
                        <img
                            src="https://i.ibb.co/sq5xWh0/Mobile-login-pana.png"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>



            </div>
        </div>
    )
}

export default Login;  