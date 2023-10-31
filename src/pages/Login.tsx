import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginClient } from "../api/client";


const createClientFormSchema = z.object({
    email: z.string().min(1, "E-mail não pode estar vazio.").email("O e-mail é obrigatório.").toLowerCase(),
    password: z.string().min(1, "Sua senha não pode estar vazia."),
})

type createClientFormTypes = z.infer<typeof createClientFormSchema>

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<createClientFormTypes>({
        resolver: zodResolver(createClientFormSchema)
    })

    const handleLogin = async (data: any) => {
        const client = await loginClient(data)

        if(client){
            const { token } = client.data
            localStorage.setItem("token", token);
            navigate("/panel")
        }else {
            alert("email ou senha estão incorretos")
        }

    }



    return (
        <div className="w-screen h-screen flex justify-center items-center bg-dark">
            <div className="w-full max-w-[480px] rounded-xl shadow-sm shadow-blue-500 flex bg-blue_main2">
                <div className="w-full h-full flex flex-col items-center relative p-4 gap-2">
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