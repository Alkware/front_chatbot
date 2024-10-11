import { RefObject, useContext, useEffect, useRef, useState } from "react"
import { ClientContext } from "../../context/ClientContext"
import { Heading } from "../Heading/Heading";
import { CompleteTutorial } from "./components/CompleteTutorial/CompleteTutorial";
import { BackgroundTour } from "./components/BackgroundTour/BackgroundTour";
import { ContainerTour } from "./components/ContainerTour/ContainerTour";
import { ButtonTutorial } from "./components/ButtonTutorial/ButtonTutorial";
import { ContentTour } from "./components/ContentTour/ContentTour";
import { ContentStepTour } from "./components/ContentStepTour/ContentStepTour";
import { generateModelToTour } from "../../functions/generateModelTour";
import { getClientById } from "../../api/client";

interface Tour { }

export interface Model {
    title: string,
    stages: Array<{
        title: string,
        image: `https://${string}`,
    }>
    buttons: Array<{
        url: string,
        target: "_blank" | "_parent"
        text?: string;
    }>;
    completed: boolean;
    display: boolean;
}

export function Tour({ }: Tour) {
    const { client } = useContext(ClientContext);
    const [model, setModel] = useState<Model[]>();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const model = generateModelToTour(client);
        setModel(model);
    }, [])

    
    /**
     * Função responsável por abrir e fechar a janela contendo o conteudo do tour.
     */
    const handleDisplayTour = async () => {
        const container = containerRef.current;
        const background = container?.querySelector("div#background-tour") as HTMLElement;

        if (!background || !container) return;

        const isDisplayed = container?.dataset.show === "true"

        if (isDisplayed) background?.classList.add("hidden");
        else {
            if(!client) return;
            const updateClient = await getClientById(client?.id);
            const newModel = generateModelToTour(updateClient);
            setModel(newModel);
            background?.classList.remove("hidden");
        }

        (container.dataset.show = (!isDisplayed).toString());
    }

    // Verifica se o usuário completou o tour e lança uma mensagem parabenizando pela finalização do tour.
    if (!!model && !model?.find(tour => !tour.completed) && client?.tutorial) return <CompleteTutorial />

    return (
        (!!model && client?.tutorial) &&
        <div
            ref={containerRef}
            data-show={!model[0].completed}
            className="group"
        >
            <BackgroundTour
                onClick={handleDisplayTour}
            />
            <ContainerTour>
                <ButtonTutorial
                    onClick={handleDisplayTour}
                />
                <ContentTour>
                    <Heading.h2 className="md:text-2xl font-bold text-light">Vamos criar seu primeiro chat passo a passo:</Heading.h2>

                    <div className="w-full h-full flex flex-col my-8">
                        {!model ?
                            <Heading.h2>Não há nada para mostrar aqui</Heading.h2>
                            :
                            model?.map((tour, index) =>
                                <ContentStepTour
                                    key={tour.title}
                                    tour={tour}
                                    index={index}
                                    modelSize={model.length}
                                />
                            )}
                    </div>
                </ContentTour>
            </ContainerTour>
        </div>
    )
};