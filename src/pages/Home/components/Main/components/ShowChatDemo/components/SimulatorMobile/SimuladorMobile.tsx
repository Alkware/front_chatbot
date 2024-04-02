import { MdAlarm, MdBattery50, MdSend, MdSignalCellular3Bar } from "react-icons/md";
import { HeaderDevice } from "./components/HeaderDevice/HeaderDevice";
import { MainDevice } from "./components/MainDevice/MainDevice";

const messages = [
    {
        id: 0,
        isUser: false,
        text: "Olá! Sou uma inteligencia artifical criada para solucionar suas dúvidas, como posso te ajudar hoje?"
    },
    {
        id: 1,
        isUser: true,
        text: "Oi, gostaria de saber como a Wipzee funciona?"
    },
    {
        id: 2,
        isUser: false,
        text: "A Wipzee é uma assistente virtual avançada, que oferece suporte aos produtos de nossos clientes por meio de inteligência artificial."
    },
    {
        id: 3,
        isUser: false,
        text: "Nossa assistente virtual é projetada para interagir com os usuários de forma natural, eficiente e humanizada, fornecendo respostas precisas e solucionando problemas de maneira rápida."
    },
    {
        id: 4,
        isUser: true,
        text: "E se eu contratar e não gostar?"
    },
    {
        id: 5,
        isUser: false,
        text: "Não se preocupe! Nós oferecemos uma garantia de 7 dias, durante os quais você pode solicitar o reembolso do valor pago."
    },
    {
        id: 6,
        isUser: true,
        text: "Mas essa ferramenta não é aqueles chatbot engessados não né? com fluxos de mensagens que são tediosos para preencher e no fim não funcionam."
    },
    {
        id: 7,
        isUser: false,
        text: "Não! Nossa assistente virtual é projetada para interagir de forma natural, humanizada e eficiente com os usuários."
    },
    {
        id: 8,
        isUser: false,
        text: "Focamos muito em deixar simples e fácil a criação de novos chats, que até uma criança entenderia haha"
    },
    {
        id: 9,
        isUser: true,
        text: "Como faço para testar?"
    },
    {
        id: 10,
        isUser: false,
        text: "Basta clicar no link abaixo e aumentar suas vendas.",
        link: true,
    },
]


export function SimulatorMobile() {
    return (
        <div
            className="group w-[400px] h-auto border-[20px] border-black rounded-[2rem] z-50 transform-mobile-to-desktop"
        >
            <div className="w-full h-full bg-zinc-800 rounded-2xl overflow-hidden flex flex-col gap-1 relative top-0 ">
                <div
                    className="w-full flex justify-around group-data-[isdesktop=true]:justify-end"
                >
                    <div className="flex px-4 p-1">
                        <MdAlarm className="text-xl fill-light" />
                    </div>
                    <div
                        className="group-data-[isdesktop=true]:hidden w-1/2 h-[30px] bg-black rounded-b-2xl flex justify-evenly items-center gap-4"
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
                    className="w-full h-auto flex flex-col"
                >
                    <HeaderDevice messages={messages} />
                    <MainDevice messages={messages} />
                    <div className="w-full h-[80px] flex gap-2 px-4 justify-center items-center">
                        <input className="h-[50px]" />
                        <MdSend />
                    </div>
                </div>
            </div>
        </div>
    )
};