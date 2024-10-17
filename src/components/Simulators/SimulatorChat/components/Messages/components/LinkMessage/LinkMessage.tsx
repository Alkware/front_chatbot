import { Link } from "../../../../../../../@types/Project"

interface LinkMessage {
    links: Link[]
}

export function LinkMessage({ links }: LinkMessage) {

    return (
        <div
            data-isbutton={!!links?.length}
            className="w-[90%] h-auto bg-white text-dark rounded-lg self-start my-3 overflow-hidden p-2"
        >
            <span>
                Esse é um exemplo de mensagem onde seu link
                <a
                    href={links[links.length - 1].url}
                    target="_blank"
                    className="mx-1 underline text-blue-500 font-bold"
                >{links[links.length - 1].title}</a> 
                é usado para representar como será usado em uma conversa.
            </span>

        </div >
    )
};