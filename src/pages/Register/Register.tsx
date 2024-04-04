import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { registerClient } from "../../api/client";
import { useEffect } from "react";
import { Header } from "../Home/components/Header/Header";
// import animateLoginLight from "../../assests/animate-login-light.svg"
// import animateLoginDark from "../../assests/animate-login-dark.svg"
import { Button } from "../../components/button/Button";

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
});

type CreateUserFormData = z.infer<typeof createClientFormSchema>;


function Register() {
    const navigate = useNavigate();
    // const [ search ] = useSearchParams();
    // const whereClickComeFrom = search.get("from");
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
        resolver: zodResolver(createClientFormSchema)
    });

    useEffect(() => {
        // define o thema da página de register
        const isDark = localStorage.theme === "dark"
        document.documentElement.classList.toggle("dark", !!isDark)
    }, [])

    async function createUser(data: any) {

        const clientCreated = await registerClient(data);

        if (clientCreated && clientCreated.status === 201) {
            const token = clientCreated.data

            localStorage.setItem("token", token)

            navigate("/panel")
        } else alert("E-mail inserido já existe")


    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center dark:bg-dark bg-light relative">
            <Header />

            <div className="w-full h-full flex gap-4 flex-col justify-center items-center relative p-4">


                <div className="w-3/5 h-3/5 flex items-center gap- rounded-xl">

                    <div
                        className="w-1/2"
                    >
                        <img
                            src="https://i.ibb.co/sq5xWh0/Mobile-login-pana.png"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="w-1/2 h-full p-4 flex flex-col justify-between items-center gap-4 bg-primary-100 rounded-xl">
                        <h1 className="text-2xl text-light">Registre em nossa plataforma</h1>

                        <div className="flex flex-col">
                            <form
                                onSubmit={handleSubmit(createUser)}
                                className="flex flex-col gap-2 justify-center items-center text-light"
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

                                <Button customClass="bg-primary-200 w-full">Criar conta</Button>

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



            </div>
        </div>
    )
}

export default Register;