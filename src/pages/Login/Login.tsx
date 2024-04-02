import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticateClient, loginClient } from "../../api/client";
import { useEffect, useState } from "react";
import { Header } from "../Home/components/Header/Header";


const createClientFormSchema = z.object({
    email: z.string().min(1, "E-mail não pode estar vazio.").email("O e-mail é obrigatório.").toLowerCase(),
    password: z.string().min(1, "Sua senha não pode estar vazia."),
})

type createClientFormTypes = z.infer<typeof createClientFormSchema>

function Login() {
    const navigate = useNavigate();
    const [access, setAccess] = useState<boolean>();
    const { register, handleSubmit, formState: { errors } } = useForm<createClientFormTypes>({
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
        const client = await loginClient(data)

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
                    <h1>Faça seu login</h1>

                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="flex flex-col gap-2"
                    >
                        <input
                            type="email"
                            className="rounded-md p-2 w-full  bg-dark"
                            placeholder="Digite seu email"
                            {...register("email")}
                        />
                        <span className="w-full text-center text-red-600 bg-red-300/50">{errors.email?.message}</span>


                        <input
                            type="password"
                            className="rounded-md p-2 w-full bg-dark"
                            placeholder="Digite sua senha"
                            {...register("password")}
                        />
                        <span className="w-full text-center text-red-600 bg-red-300/50">{errors.password?.message}</span>


                        <input
                            type="submit"
                            value="Entrar"
                            className="w-full bg-blue_main p-3 cursor-pointer"
                        />
                    </form>


                    <a
                        className="underline cursor-pointer"
                        onClick={() => navigate("/register")}
                    >Registre-se</a>

                </div>

            </div>
        </div>
    )
}

export default Login;  