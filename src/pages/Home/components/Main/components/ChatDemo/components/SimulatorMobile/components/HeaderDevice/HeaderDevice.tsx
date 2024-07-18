import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

interface HeaderDevice {
    messages: Array<{ id: number, isUser: boolean, text: string }>
}

export function HeaderDevice({ messages }: HeaderDevice) {
    const [isTyping, setTyping] = useState<boolean>();
    const [params] = useSearchParams();
    const currentReleasedMessage = Number(params.get("released_messages")) || -1

    useEffect(() => {
        // -1 adiciona para que o simulador começe o chat digitando
        const indexs: Array<number> = [-1]
        // percorre todas as mensagens do chat simulado, para verificar quais são mensagens da "IA"
        messages.forEach((msg, index) => (!msg.isUser) && indexs.push((index)));
        // Verifica se atual mensagem a ser exibida é a da IA.
        const findIndex = indexs.find(index => index === currentReleasedMessage);
        // Caso a atual mensagem a ser exibida for da IA, então será disparado o "digitando..."
        findIndex ? setTyping(true) : setTyping(false);
    }, [currentReleasedMessage])

    return (
        <div 
            className="group flex items-center w-full min-h-[50px] bg-primary-100"
        >
            <div className="w-1/5 h-full flex justify-center items-center">
                <img
                    src="https://i.ibb.co/bJH2Mgy/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito.jpg"
                    alt=""
                    className="w-[40px] h-[40px] object-cover rounded-full"
                />
            </div>
            <div className="flex flex-col">
                <h2 className="text-light">Suporte inteligente</h2>
                <span
                    data-istyping={!!isTyping}
                    className="opacity-80 text-light text-sm data-[istyping=false]:hidden"
                >Digitando...</span>
            </div>
        </div>
    )
};