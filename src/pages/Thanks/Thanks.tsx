import { Button } from "../../components/button/Button";
import { Header } from "../Home/components/Header/Header";
import { StarsAnimation } from "../Home/components/Main/components/Presentation/components/StarsAnimation";
import thanksSVG from "../../assests/thanks.svg"
import { useEffect } from "react";

export function Thanks() {
    const isAccount = localStorage.getItem("is_account");

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)
        })();
    }, [])

    return (
        <div className="w-screen min-h-screen  flex flex-col items-center justify-center bg-[url(https://i.ibb.co/2vrnfCz/Untitled-design-8.png)] dark:bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover">
            <Header />
            <div className="w-[95%] md:w-4/5 mt-[100px] backdrop-blur-md border border-primary-100 bg-primary-100/10 text-primary-100 dark:text-light flex flex-col justify-center items-center p-4 rounded-md">

                <h2 className="text-xl md:text-3xl font-bold text-center ">Obrigado por assinar nossa plataforma</h2>
                <h3 className="text-base  md:text-xl text-center font-medium opacity-80">Esperamos que sua experiência seja incrível com a gente!</h3>
                {
                    !!isAccount &&
                    <div className="bg-primary-100/50 p-4 flex flex-col items-center my-4 text-primary-200 dark:text-light rounded-md">
                        <h3 className="text-lg font-medium">Sua conta já foi criada!</h3>
                        <div className="flex gap-2 text-center">
                            Use o mesmo e-mail que você utilizou para fazer o pagamento
                        </div>
                    </div>
                }
                <div className="my-8">
                    {
                        !!isAccount ?
                            <Button
                                onClick={() => window.open("https://wipzee.com/first-access")}
                                customClass="text-2xl font-medium neon-effect"
                            >Fazer meu primero acesso</Button>
                            :
                            <Button
                                onClick={() => window.open("https://wipzee.com/panel")}
                            >Acessar plataforma</Button>

                    }
                </div>
                <div className="w-full md:w-1/2 md:max-w-[400px]">
                    <img
                        src={thanksSVG}
                        alt="Imagem com um homem e uma mulher comemorando a contração do plano."
                        className="w-full h-full object-coverr"
                    />
                </div>
            </div>

            <div className="rotate-180 absolute -top-1/2">
                <StarsAnimation />
            </div>
        </div>
    )
};