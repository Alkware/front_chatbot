import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { authenticateClient, registerClient } from "../../api/client";
import { useContext, useEffect } from "react";
import { Header } from "../Home/components/Header/Header";
import { Root } from "../../components/Form/FormRoot";
import { saveGuest } from "../../api/guest.api";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../../components/modal/templates/PopOver";
import { Input } from "../../components/Form/components/Fields/Input/Input";
import { FormCheckBox } from "../../components/Form/components/Fields/FormCheckBox";

const createClientFormSchema = z.object({
    email: z.string().min(1, "E-mail não pode estar vazio.").email("O e-mail é obrigatório.").toLowerCase(),
    password: z.string().min(6, "Crie uma senha forte com no minimo 6 caracteres"),
    confirm_policies: z.boolean().refine((value) => value === true, { message: "Você precisa concordar com nossos termos de uso, politicas de privacidade e politicas de cookies." }),
    fullname: z.string().min(1, "Seu nome não pode estar vazio.").refine((input) => {
        const words = input.trim().split(" ");
        return words.length >= 2
    }, { message: "Digite seu nome completo" }).transform(name =>
        name.trim().split(" ")
            .map(word => word[0]
                .toLocaleUpperCase()
                .concat(word.substring(1))
            ).join(" ")
    ),
});

type CreateUserFormData = z.infer<typeof createClientFormSchema>;


function Register() {
    const navigate = useNavigate();
    const { setModalContent } = useContext(ModalContext);
    const formRegister = useForm<CreateUserFormData>({
        resolver: zodResolver(createClientFormSchema)
    });

    useEffect(() => {
        (async () => {
            // define o thema da página de register
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark);

            //verifica se o usuário já está authenticado, se estiver ele já vai direto para o painel
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token);
            (clientIsLogged && navigate("/panel"));

            // Salva o convidado no banco de dados...
            saveGuest();
        })();
    }, [])

    async function createUser(data: any) {
        const isOriginMarketing = localStorage?.origin;
        isOriginMarketing && (data.origin = isOriginMarketing);
        const clientCreated = await registerClient(data);

        if (clientCreated && clientCreated.status === 201) {
            const token = clientCreated.data
            localStorage.setItem("token", token)
            navigate("/panel")
        } else {
            setModalContent({
                componentName: "modal_failed_create_account",
                components: 
                <PopOver 
                    componentName="modal_failed_create_account"
                    message="Erro ao tentar criar a conta"
                    type="WARNING"
                />
            })
        }
    }

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center items-center dark:bg-dark bg-light relative">
            <Header />

            <div className="w-full h-full flex gap-4 flex-col justify-center items-center relative p-4 mt-[75px] md:mt-[100px]">


                <div className="w-[95%] md:w-4/5 flex flex-col sm:flex-row items-center rounded-xl">

                    <div
                        className="w-1/2"
                    >
                        <img
                            src="https://i.ibb.co/sq5xWh0/Mobile-login-pana.png"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="w-full nvxs:w-4/5 sm:w-3/5 py-4 flex flex-col justify-start items-center gap-4 bg-primary-200 rounded-xl">
                        <h1 className="text-xl md:text-2xl text-light text-center font-bold">Registre em nossa plataforma</h1>

                        <div className="w-full flex flex-col text-light px-4">
                            <Root.Form
                                form={formRegister}
                                onSubmit={formRegister.handleSubmit(createUser)}
                                hiddenPreviewButton={true}
                                titleButtonSend="Criar conta"
                            >
                                <Root.Step index={0}>
                                    <Input
                                        name="fullname"
                                        title="Digite seu nome completo"
                                    />
                                    <Input
                                        name="email"
                                        title="Digite um e-mail válido"
                                    />

                                </Root.Step>

                                <Root.Step index={1}>
                                    <Input
                                        name="password"
                                        title="Crie uma nova senha de acesso"
                                        type="password"
                                    />

                                    <Input
                                        name="confirm_password"
                                        title="Confirme sua senha de acesso"
                                        type="password"
                                    />

                                    <FormCheckBox
                                        name="confirm_policies"
                                        title={`Confirme que você leu as <a class="underline text-blue-300" href="/polices" target="blank">Politicas de privacidade</a>, <a class="underline text-blue-300" href="/cookies" target="blank">Politicas de cookies</a>, <a class="underline text-blue-300" href="/terms" target="blank">termos de uso</a>. com o entendimento das politicas, você estará autorizado a criar uma conta em nossa plataforma. `}
                                    />

                                </Root.Step>
                            </Root.Form>

                            <div className="w-full flex flex-col justify-evenly items-center ">
                                <div className="w-full flex gap-2 items-center mb-8">
                                    <div className="w-full h-1 bg-gradient-to-r from-transparent to-primary-100 rounded-xl"></div>
                                    <span className="font-bold text-sm">OU</span>
                                    <div className="w-full h-1 bg-gradient-to-r from-primary-100 to-transparent rounded-xl"></div>
                                </div>
                                <a
                                    className="underline cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >Já possui uma conta?</a>

                            </div>
                        </div>

                    </div>

                </div>



            </div>
        </div>
    )
}

export default Register;