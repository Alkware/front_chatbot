import { useContext } from "react"
import { ClientContext } from "../../context/ClientContext"
import { updateTutorialClient } from "../../api/client";

interface Tutorial {
    tutorialId: string;
}

const tutorials = [
    {
        id: "create_chat",
        title: "Crie seu primeiro chat",
        text: `Clique em <div class="bg-white inline-block p-1 mx-2 rounded-sm"><div class="w-[30px] h-[30px] flex justify-center items-center overflow-hidden border-2 border-primary-100 rounded-full"><span class="text-primary-100 text-3xl">+</span></div></div> para criar seu primeiro chat simples e rápido`,
        positionX: "60vw",
        positionY: "2vh"
    },
    {
        id: "add_plan",
        title: "Parece que você ainda não adicionou seu plano",
        text: `Basta clicar em <span class='font-bold uppercase'>"adicionar plano"</span> para adicionar um plano a sua conta wipzee`,
        positionX: "60vw",
        positionY: "2vh"
    },
    {
        id: "database",
        title: "Vamos criar sua primeira fonte de dados",
        text: `Clique em <div class="w-[60px] bg-primary-200 border-2 border-primary-100 inline-block p-1 mx-2 rounded-sm"><span class="text-light text-2xl">+</span></div> para iniciar o processo de criação da sua fonte de dados, essa etapa é muito importante para que nossa inteligência artificial entenda como funciona seu negócio e possa fornecer informações precisas ao seu cliente.`,
        positionX: "20vw",
        positionY: "40vh"
    }
]

export function Tutorial({ tutorialId }: Tutorial) {
    const { client, setClient } = useContext(ClientContext)
    const tutorial = tutorials.find(tutorial => tutorial.id === tutorialId);

    const handleUpdateTutorial = async () => {
        if(client) {
            const clientUpdated = await updateTutorialClient(client.id, false)
            setClient(clientUpdated)
        }
    }

    return (
        (client && tutorial) &&
        <div
            data-istutorial={client.tutorial}
            className="data-[istutorial='false']:hidden fixed bg-black/70 w-screen h-screen top-0 left-0 z-0"
        >
            <div
                className=" bg-primary-100 absolute rounded-md flex flex-col justify-center items-center px-4"
                style={{ top: tutorial.positionY, left: tutorial.positionX, zIndex: "999" }}
            >
                <h2 className="text-center py-2 font-bold text-xl">{tutorial.title}</h2>
                <p
                    className="w-[400px] px-4 text-center"
                    dangerouslySetInnerHTML={{ __html: tutorial.text }}
                ></p>

                <div className="w-full flex justify-center mt-8">
                    <span
                        className="underline opacity-70 cursor-pointer"
                        onClick={handleUpdateTutorial}
                    >Pular tutorial</span>
                </div>
            </div>
        </div>
    )
};