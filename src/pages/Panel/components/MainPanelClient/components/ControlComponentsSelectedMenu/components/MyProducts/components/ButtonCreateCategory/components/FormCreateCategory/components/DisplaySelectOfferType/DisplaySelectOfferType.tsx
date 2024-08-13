import { useNavigate } from "react-router-dom";
import { SubTitle } from "../../../../../../../../../../../../../../components/SubTitle/SubTitle";
import { Title } from "../../../../../../../../../../../../../../components/Title/Title";
import { MouseEvent, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../../../context/ModalContext";
import { ClientContext } from "../../../../../../../../../../../../../../context/ClientContext";

interface DisplaySelectOfferType {
    category_name: string
}

export function DisplaySelectOfferType({ category_name }: DisplaySelectOfferType) {
    const { client } = useContext(ClientContext);
    const { clearModal } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleSelectOffer = ({ currentTarget }: MouseEvent<HTMLDivElement>) => {
        if(!client) { console.error("Unable to select offer because the client is missing"); return;}
        clearModal(null, { clearAll: true })
        navigate(`/${currentTarget.dataset.source}/${client.plan_management.id}/${category_name || null}`)
    }

    return (
        <div className="flex flex-col items-center p-4">
            <Title>Escolha o tipo de oferta</Title>
            <SubTitle className="opacity-70">Aqui você deve escolher qual o tipo de oferta você está cadastrando</SubTitle>

            <div className="flex w-4/5 justify-between gap-4 my-6">
                <div 
                    data-source={"create-product"}
                    className="flex flex-col justify-center items-center gap-2 max-w-[250px] border border-primary-100 rounded-md cursor-pointer hover:scale-105 transition-transform" 
                    onClick={handleSelectOffer}
                >
                    <img
                        src="https://i.ibb.co/0GHgsZV/Screenshot-from-2024-08-01-17-30-39-removebg-preview-1.png"
                        alt="Imagem representando um porduto fisico"
                        className="w-20 h-20 object-contain"
                    />
                    <Title className="md:text-base font-bold">Físico</Title>
                    <SubTitle
                        className="md:text-sm opacity-50"
                    >
                        Um produto físico é um objeto tangível que é fabricado e posteriormente entregue ao cliente final para que o possua fisicamente.
                    </SubTitle>
                </div>
                <div 
                    data-source={"create-service"}
                    className="flex flex-col justify-center items-center gap-2 max-w-[250px] border border-primary-100 rounded-md cursor-pointer hover:scale-105 transition-transform" 
                    onClick={handleSelectOffer}
                >
                    <img src="https://i.ibb.co/TLv6Pzx/Screenshot-from-2024-08-01-17-31-33-removebg-preview-1.png"
                        alt="Imagem representando um serviço online ou presencial"
                        className="w-20 h-20 object-contain"
                    />
                    <Title className="md:text-base font-bold">Serviço</Title>
                    <SubTitle
                        className="md:text-sm opacity-50"
                    >
                        Um serviço é uma atividade realizada para atender a uma necessidade específica do cliente, sendo consumido no momento da sua prestação.
                    </SubTitle>
                </div>
            </div>
        </div>
    )
};