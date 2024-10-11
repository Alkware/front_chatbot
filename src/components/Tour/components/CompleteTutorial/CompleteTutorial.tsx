import { useContext, useEffect } from "react";
import { updateTutorialClient } from "../../../../api/client";
import { Button } from "../../../button/Button";
import { PopUp } from "../../../modal/templates/PopUp";
import { Heading } from "../../../Heading/Heading";
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
                        <Heading.h2>PARABENS!!!</Heading.h2>
                        <Heading.h3>Acabamos de criar seu primeiro chat.</Heading.h3>
                        <Heading.h3>Já podemos enviar seu link aos seus amigos e clientes, podemos também integra-lo em seu site. </Heading.h3>
                        <Heading.h3>Boa sorte em seus negocios e qualquer dúvida não exite em nos contatar!</Heading.h3>

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