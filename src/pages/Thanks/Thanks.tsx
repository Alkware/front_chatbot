import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Header } from "../Home/components/Header/Header";
import { StarsAnimation } from "../Home/components/Main/components/Presentation/components/StarsAnimation";

export default function Thanks() {
    const [params] = useSearchParams();
    const account = params.get("account") === "0";

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-[url(https://i.ibb.co/2vrnfCz/Untitled-design-8.png)] dark:bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover">
            <Header />
            <div className="bg-primary-200 w-4/5 flex flex-col gap-4 justify-center items-center p-4 rounded-md">
                <h2 className="text-3xl text-light font-bold">Obrigado por assinar nossa plataforma</h2>
                <h3 className="text-xl text-light font-medium opacity-80">Esperamos que sua experiência seja incrível com a gente!</h3>

                {
                    account &&
                    <div className="bg-light p-4 flex flex-col gap-4 items-center">
                        <h3>Sua conta já foi criada!</h3>
                        <div className="flex gap-2">
                            Use o mesmo e-mail que você utilizou para fazer o pagamento
                        </div>
                    </div>
                }
                {
                    account ?
                        <Button onClick={() => window.open("https://wipzee.com/first-access")}>Fazer meu primero acesso</Button>
                        :
                        <Button onClick={() => window.open("https://wipzee.com/panel")}>Acessar plataforma</Button>

                }
            </div>

            <div className="rotate-180 absolute -top-1/2">
                <StarsAnimation />
            </div>
        </div>
    )
};