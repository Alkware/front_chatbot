import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { registerClient } from "../api/client";

const createClientFormSchema = z.object({
    email: z.string().min(1, "E-mail não pode estar vazio.").email("O e-mail é obrigatório.").toLowerCase(),
    password: z.string().min(6, "Crie uma senha forte com no minimo 6 caracteres"),
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
})

type CreateUserFormData = z.infer<typeof createClientFormSchema>;


function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
        resolver: zodResolver(createClientFormSchema)
    });

    async function createUser(data: any) {
        
        const clientCreated = await registerClient(data);

        if(clientCreated && clientCreated.status === 201){
            const token = clientCreated.data

            localStorage.setItem("token", token)

            navigate("/panel")
        }else{
            alert("E-mail inserido já existe")
        }

    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-dark">
            <div className="w-full max-w-[480px] rounded-xl shadow-sm shadow-blue-500 flex bg-blue_main2">
                <div className="w-full h-full flex flex-col items-center relative p-4">
                    <h1>Registre em nossa plataforma</h1>
                    <form
                        onSubmit={handleSubmit(createUser)}
                        className="flex flex-col gap-2 justify-center items-center"
                    >
                        <input
                            type="text"
                            className="rounded-md p-2 w-full bg-dark"
                            placeholder="Digite seu nome e sobrenome"
                            {...register("fullname")}
                        />
                        <span className="w-full text-center text-red-600 bg-red-300/50">{errors.fullname?.message}</span>


                        <input
                            type="email"
                            className="rounded-md p-2 w-full  bg-dark"
                            placeholder="Digite um e-mail válido"
                            {...register("email")}
                        />
                        <span className="w-full text-center text-red-600 bg-red-300/50">{errors.email?.message}</span>


                        <input
                            type="password"
                            className="rounded-md p-2 w-full  bg-dark"
                            placeholder="Digite sua senha"
                        />
                        <span className="w-full text-center text-red-600 bg-red-300/50">{errors.password?.message}</span>


                        <input
                            type="password"
                            className="rounded-md p-2 w-full  bg-dark"
                            placeholder="Confirme sua senha"
                            {...register("password")}
                        />
                        <span className="w-full text-center text-red-600 bg-red-300/50">{errors.password?.message}</span>

                        <input
                            type="submit"
                            value="Registre-se"
                            className="w-full bg-blue_main p-3"
                        />

                    </form>



                    <div className="w-full flex justify-evenly items-center mt-8">

                        <a
                            className="underline cursor-pointer"
                            onClick={() => navigate("/login")}
                        >Fazer login</a>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register;