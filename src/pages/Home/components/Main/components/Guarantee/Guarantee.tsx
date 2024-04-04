import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../components/button/Button";

export function Guarantee() {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-auto flex flex-col items-center">
            <div className="flex flex-col md:flex-row justify-center">
                <div className="w-full md:w-1/2 h-full flex items-start justify-end">
                    <div className="w-1/2 min-w-[500px]">
                        <img
                            src="https://i.ibb.co/tJnB9yh/Vault-rafiki-1-removebg-preview.png"
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-4 py-4 justify-center items-center">
                    <h2 className="text-5xl p-4 font-bold">Teste a Wipzee por 7 dias</h2>
                    <p className="text-xl w-4/5">Daremos 7 dias de garantia incondicional para você testar nossa ferramenta e caso a Wipzee não funcione só para você, devolveremos todo o seu investimento sem burocracia.</p>
                    <Button
                        onClick={() => navigate("/register")}
                        customClass="my-12 w-4/5 neon-effect-hover"
                    >Teste agora</Button>
                </div>
            </div>
            <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-primary-100 to-transparent my-20"></div>
        </div>
    )
};