import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticateClient, loginClient, loginClientFirstAccess } from "../../api/client";
import { useEffect, useState } from "react";
import { Header } from "../Home/components/Header/Header";
import { Root } from "../../components/Form/FormRoot";


const createClientFormSchema = z.object({
    email: z.string().min(1, "E-mail não pode estar vazio.").email("O e-mail é obrigatório.").toLowerCase(),
    password: z.string().min(1, "Sua senha não pode estar vazia."),
})

type createClientFormTypes = z.infer<typeof createClientFormSchema>

function FirstAccess() {
    const navigate = useNavigate();
    const [access, setAccess] = useState<boolean>();
    const formLogin = useForm<createClientFormTypes>({
        resolver: zodResolver(createClientFormSchema)
    })
    const { register, handleSubmit, formState: { errors } } = formLogin;

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
        console.log(data)
        const client = await loginClientFirstAccess(data)
        console.log(client)

        if (client) {
            const { token } = client.data
            localStorage.setItem("token", token);
            navigate("/panel")
        } else {
            alert("email ou senha estão incorretos")
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
                    >
                        <Root.Step
                            index={0}
                        >
                            <Root.Input
                                name="email"
                                title="Digite seu e-mal:"
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

export default FirstAccess;  