import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Header } from "../Home/components/Header/Header";
import { StarsAnimation } from "../Home/components/Main/components/Presentation/components/StarsAnimation";
import thanksSVG from "../../assests/thanks.svg"
import { useEffect } from "react";

export function Thanks() {
    const [params] = useSearchParams();
    const account = params.get("account") === "0";
    // const data = JSON.parse(localStorage.getItem("tictoCheckoutInitialData") || "{}");
    console.log(account, params.get("account"))
    console.log(localStorage)

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)
        })();
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-[url(https://i.ibb.co/2vrnfCz/Untitled-design-8.png)] dark:bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover overflow-hidden">
            <Header />
            <div className="w-[95%] md:w-4/5 backdrop-blur-md border border-primary-100 bg-primary-100/10 text-primary-100 dark:text-light flex flex-col justify-center items-center p-4 rounded-md">

                <h2 className="text-xl md:text-3xl font-bold text-center ">Obrigado por assinar nossa plataforma</h2>
                <h3 className="text-base  md:text-xl text-center font-medium opacity-80">Esperamos que sua experiência seja incrível com a gente!</h3>
                {
                    account &&
                    <div className="bg-light p-4 flex flex-col items-center my-4">
                        <h3>Sua conta já foi criada!</h3>
                        <div className="flex gap-2">
                            Use o mesmo e-mail que você utilizou para fazer o pagamento
                        </div>
                    </div>
                }
                <div className="my-8">
                    {
                        account ?
                            <Button onClick={() => window.open("https://wipzee.com/first-access")}>Fazer meu primero acesso</Button>
                            :
                            <Button onClick={() => window.open("https://wipzee.com/panel")}>Acessar plataforma</Button>

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