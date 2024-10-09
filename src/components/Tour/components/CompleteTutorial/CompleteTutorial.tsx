import { useContext, useEffect } from "react";
import { updateTutorialClient } from "../../../../api/client";
import { Button } from "../../../button/Button";
import { PopUp } from "../../../modal/templates/PopUp";
import { SubTitle } from "../../../SubTitle/SubTitle";
import { Title } from "../../../Title/Title";
import { ClientContext } from "../../../../context/ClientContext";
import { ModalContext } from "../../../../context/ModalContext";

interface CompleteTutorial { }

export function CompleteTutorial({ }: CompleteTutorial) {
    const { client } = useContext(ClientContext);
    const { setModalContent, clearModal } = useContext(ModalContext)

    const handleFinishTour = async () => {
        clearModal("modal_finish_tour")
    }
    
    useEffect(() => {
        if (!client) return;
        updateTutorialClient(client.id, false);

        setModalContent({
            componentName: "modal_finish_tour",
            components:
                <PopUp>
                    <div className="flex flex-col items-center p-4">
                        <img
                            src="https://wipzee-files.online/Young%20and%20happy-pana.svg"
                            alt="Mulher feliz por que vocẽ completou o tutorial"
                            className="max-w-[200px] object-contain"
                        />
                        <Title>PARABENS!!!</Title>
                        <SubTitle>Acabamos de criar seu primeiro chat.</SubTitle>
                        <SubTitle>Já podemos enviar seu link aos seus amigos e clientes, podemos também integra-lo em seu site. </SubTitle>
                        <SubTitle>Boa sorte em seus negocios e qualquer dúvida não exite em nos contatar!</SubTitle>

                        <Button
                            customClass="my-8"
                            onClick={handleFinishTour}
                        >Concluir</Button>
                    </div>
                </PopUp>
        });
    }, [])

    return <></>
};