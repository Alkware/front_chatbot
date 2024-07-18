import { MdAlarm, MdBattery50, MdSend, MdSignalCellular3Bar } from "react-icons/md";
import { HeaderDevice } from "./components/HeaderDevice/HeaderDevice";
import { MainDevice } from "./components/MainDevice/MainDevice";

const messages = [
    {
        id: 0,
        isUser: false,
        text: "Olá! Sou uma inteligência artifical criada para solucionar suas dúvidas, como posso te ajudar hoje?"
    },
    {
        id: 1,
        isUser: true,
        text: "Oi, gostaria como a wipzee vai me ajudar a vender mais?"
    },
    {
        id: 2,
        isUser: false,
        text: `
            Eu posso ajudar você há vender mais de diversas maneiras, Aqui estão algumas formas:
        `
    },
    {
        id: 3,
        isUser: false,
        text: "1. Sou projetada para interagir com os usuários de forma natural, eficiente e humanizada, fornecendo respostas precisas e solucionando problemas de maneira rápida."
    },
    {
        id: 4,
        isUser: false,
        text: "2. Eu posso responder instantaneamente às perguntas mais comuns dos clientes, reduzindo o tempo de espera e aumentando a satisfação do cliente."
    },
    {
        id: 5,
        isUser: false,
        text: "3. Estou disponível 24 horas por dia e todos os dias da semana, você não deixará mais nenhum cliente esperando 😊"
    },
    {
        id: 6,
        isUser: true,
        text: "Tenho que pagar para usar?"
    },
    {
        id: 7,
        isUser: false,
        text: "De maneira nenhuma! você pode criar sua conta gratuitamente e começar a utlizar em seus negócios"
    },
    {
        id: 8,
        isUser: true,
        text: "Mas essa ferramenta não é aqueles chatbot engessados não né? com fluxos de mensagens que são tediosos para preencher e no fim não funcionam."
    },
    {
        id: 9,
        isUser: false,
        text: "Não! Nossa assistente virtual é projetada para interagir de forma natural, humanizada e eficiente com os usuários."
    },
    {
        id: 10,
        isUser: false,
        text: "Focamos muito em deixar simples e fácil a criação de novos chats, que até uma criança entenderia 🤣🤣"
    },
    {
        id: 11,
        isUser: true,
        text: "Como faço para testar?"
    },
    {
        id: 12,
        isUser: false,
        text: "Basta clicar no link abaixo e aumentar suas vendas.",
        link: true,
    },
]

interface SimulatorMobile { }


export function SimulatorMobile({ }: SimulatorMobile) {
    return (
        <div
            className="group w-full h-full border-[20px] border-black rounded-[2rem] z-50"
        >
            <div className="w-full h-full bg-zinc-800 rounded-2xl overflow-hidden flex flex-col gap-1 relative top-0 ">
                <div
                    className="w-full h-[30px] flex justify-around group-data-[isdesktop=true]:justify-end"
                >
                    <div className="flex px-4 p-1">
                        <MdAlarm className="text-xl fill-light" />
                    </div>
                    <div
                        className="group-data-[isdesktop=true]:hidden w-1/2 h-full bg-black rounded-b-2xl flex justify-evenly items-center gap-4"
                    >
                        <div className="w-1/5 h-1/3 rounded-2xl bg-zinc-600"></div>
                        <div className="w-1/12 h-1/3 rounded-2xl bg-zinc-600"></div>
                    </div>
                    <div className="flex gap-2 justify-end px-4 p-1">
                        <MdSignalCellular3Bar className="text-xl fill-light" />
                        <MdBattery50 className="text-xl fill-light" />
                    </div>
                </div>
                <div
                    className="w-full h-full flex flex-col"
                >
                    <HeaderDevice
                        messages={messages}
                    />
                    <MainDevice
                        messages={messages}
                    />
                    <div
                        className="group w-full min-h-[70px] flex gap-2 px-4 justify-center items-center"
                    >
                        <input className="h-[40px]" disabled />
                        <MdSend className="bg-primary-100 p-1 rounded-full text-4xl" />
                    </div>
                </div>
            </div>
        </div>
    )
};