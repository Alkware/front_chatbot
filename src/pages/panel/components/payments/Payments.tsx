import { useContext, useState } from "react";
import ButtonMain from "../../../../components/button/ButtonBlue";
import { ClientContext } from "../../../../context/ClientContext";
import { ModalContext } from "../../../../context/ModalContext";
import { PopUp } from "../../../../components/modal/templates/PopUp";
import { ChoosePlan } from "./components/ChoosePlan";

export function Payments() {
    const { client } = useContext(ClientContext);
    const { setModalContent } = useContext(ModalContext)
    const [access, setAcess] = useState(false)

    const handleChangePlan = () => {
        setModalContent({
            isOpenModal: true,
            components: <PopUp><ChoosePlan /></PopUp>
        })
    }

    const handleAccess = ()=>{
        const password = prompt("Senha de acesso:")
        if(password === "gui35") setAcess(true)
    }

    return (
        access ?
            <div className="w-full">

                <div className="w-full p-4 flex justify-center">

                    <div className="w-1/2 min-w-[150px] max-w-[400px] border border-zinc-600 p-2 rounded-md">
                        <h2 className="w-full text-center pb-4">Plano atual:</h2>
                        <div className="w-full flex items-center justify-between">
                            <span className="font-bold text-yellow-600">Sem plano</span>
                            <ButtonMain onClick={handleChangePlan}>Mudar de plano</ButtonMain>
                        </div>
                    </div>

                </div>

                <div className="w-full flex flex-col items-center">
                    <h2 className="text-xl p-2">Historico de pagamentos</h2>
                    {
                        client?.plan_management ?
                            <div className="w-full"></div>
                            :
                            <h2 className="text-zinc-500">Você ainda não efetuou nenhum pagamento</h2>
                    }
                </div>

            </div>
            :
            <h2>Payments em contruçã<span onClick={handleAccess}>o</span></h2>
    )
};