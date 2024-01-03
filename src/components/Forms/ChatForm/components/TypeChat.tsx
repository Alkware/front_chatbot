import { Dispatch, SetStateAction, useContext } from "react"
import { ModalContext } from "../../../../context/ModalContext"
import { PopOver } from "../../../modal/templates/PopOver"

interface TypeChat {
    register: any,
    setCurrentIndex: Dispatch<SetStateAction<number>>
}

export function TypeChat({ register, setCurrentIndex }: TypeChat) {
    const { setModalContent } = useContext(ModalContext)

    const types = [
        {
            id: "support",
            name: "Suporte",
            description: "Tire as dúvidas do seu cliente em tempo real com disponibilidade de 24/7",
            enable: true,
        },
        {
            id: "order",
            name: "Tirar Pedidos",
            description: "Tire pedidos de sua loja sem precisar de atendentes humanos",
            enable: false,
        },
        {
            id: "sales",
            name: "Vendas",
            description: "Deixe que nossa ferramenta venda seu produto",
            enable: false
        },
    ]

    const handleSelectTypeChat = ({ currentTarget }: any) => {
        if (currentTarget.dataset.enable === "true") {
            register("chat_type", { value: currentTarget.id })
            setCurrentIndex(v => v + 1)
        } else {
            setModalContent({
                isOpenModal: true,
                components: <PopOver message="Tipo de chat indisponivel" type="WARNING" />
            })
        }
    }

    return (
        <div
            className="w-full h-full p-8overflow-y-auto flex flex-col gap-12"
            id="container"
            data-index="type_chat"
        >
            <h2 className="text-center text-2xl text-light">Escolha o tipo de chat que você deseja utilizar:</h2>

            <div className="flex gap-6">
                {
                    types.map(type =>
                        <div
                            data-enable={type.enable}
                            className="w-full flex flex-col gap-4 justify-between items-center p-2 border border-light rounded-lg shadow-md shadow-white/20 transition-transform cursor-not-allowed data-[enable=true]:cursor-pointer scale-100 hover:data-[enable=true]:scale-110 data-[enable=false]:opacity-50"
                            onClick={handleSelectTypeChat}
                            id={type.id}
                            key={type.id}
                        >
                            <h2 className="w-full text-center p-2 font-bold uppercase">{type.name}</h2>
                            <p className="text-center text-sm text-light">{type.description}</p>
                            <span
                                data-enable={type.enable}
                                className="text-center text-red-500 bg-red-500/20 data-[enable=true]:text-green-950  dark:data-[enable=true]:text-green-600 data-[enable=true]:bg-green-500/30 px-2 rounded-md"
                            >{type.enable ? "Disponível" : "Em breve"}</span>
                        </div>
                    )
                }
            </div>

        </div>
    )
};