import { MdStar } from "react-icons/md";
import { Text } from "../Text/Text";
import { Button } from "../button/Button";
import { MouseEvent, useContext, useState } from "react";
import { createFeedback } from "../../api/feedback";
import { ClientContext } from "../../context/ClientContext";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../modal/templates/PopOver";
import { useSystemFail } from "../../hooks/useSystemFail";
import { FeedbackComponents } from "./components/FeedbackContainer/FeedbackContainer";
import { TextArea } from "../Form/components/Fields/TextArea/TextArea";
import { updateStatusTour } from "../../api/client";

interface Feedback {
    title: string;
    description?: string;
    imageDecoration?: string
}

type UserFeedback = {
    rating?: number,
    message?: string,
}

export function Feedback({ title, description, imageDecoration }: Feedback) {
    const { client } = useContext(ClientContext);
    const { setModalContent, clearModal } = useContext(ModalContext);
    const [userFeedBack, setUserFeedback] = useState<UserFeedback>();
    const { dispatchSystemError } = useSystemFail();
    const rateList = ["Horrível", "Ruim", "Regular", "Bom", "Otímo"];

    /**
     * Função responsável por salvar a avaliação e o comentário do usuário dentro do state "userFeedBack"
     */
    const handleAddUserFeedbackToState = ({ rating, message }: { rating?: string, message?: string }) => {
        const ratingToNumber = Number(rating);

        setUserFeedback(value => ({
            rating: ratingToNumber || value?.rating,
            message: message || value?.message
        }))
    }
    /**
     * Função responsável por enviar as informações do feedback do usuário para o back-end...
     * @returns 
     */
    const handleSaveUserFeedback = async () => {
        if (!client) return;

        if (!userFeedBack?.rating) {
            setModalContent({
                componentName: "modal_empty_rating",
                components: <PopOver componentName="modal_empty_rating" message="Avalie nosso tutorial antes de finalizar" type="WARNING" />
            });
            return;
        }

        await createFeedback({
            topic: "tutorial",
            rating: userFeedBack?.rating,
            message: userFeedBack?.message,
            client_id: client.id
        }).catch(() => {
            dispatchSystemError({
                displayModalContent: true,
                message: "Falha ao tentar enviar o feedback, não se preocupe, nossa equipe já está reparando, e tudo voltará ao normal em breve",
                path: "src/components/Feedback/Feedback.tsx"
            });
        });

        const responseUpdateTour = await updateStatusTour(client.id, false);

        if(!responseUpdateTour) {
            dispatchSystemError({
                message: "Falha ao tentar atualizar o tutorial do usuário.",
                path: "src/components/Feedback/Feedback.tsx"
            });
        }

        setModalContent({
            componentName: "modal_success_send_feedback",
            components: <PopOver
                componentName="modal_success_send_feedback"
                message="Muito obrigado pelo seu feedback! Isso nos ajuda a estar melhorando todos os dias!"
                functionAfterComplete={() => clearModal(null, { clearLast: true })}
            />
        });
    }
    /**
     * Função responsável por exibir ou ocultar a textarea para que o usuário possa deixar seu comentário...
     * @param param0 
     */
    const handleOpenCommet = ({ currentTarget }: MouseEvent) => {
        const container = currentTarget.closest("div");
        const containerTextArea = container?.querySelector("div[data-id='container-textarea']");
        const isHidden = containerTextArea?.classList.contains("hidden");

        if (isHidden) {
            containerTextArea?.classList.remove("hidden");
            const timer = setTimeout(() => {
                containerTextArea?.classList.remove("opacity-0");
                containerTextArea?.classList.add("opacity-100");
                clearTimeout(timer);
            }, 100);
            currentTarget.textContent = "Ocultar o comentário?"
        } else {
            containerTextArea?.classList.add("hidden", "opacity-0");
            containerTextArea?.classList.remove("opacity-100");
            currentTarget.textContent = "Deseja deixar um comentário?"
        }
    }

    return (
        <div className="w-full max-w-[500px] flex flex-col gap-4 items-center p-4">
            {imageDecoration &&
                <img
                    src={imageDecoration}
                    alt={`Imagem decorativa sobre ${title}`}
                    className="max-w-32"
                />
            }

            <Text.h2 className="text-center">{title}</Text.h2>
            <Text.h3 className="text-center">{description}</Text.h3>

            <FeedbackComponents.Container flex="flex-col">
                <Text.h3 className="font-bold text-center">Oque você achou do tutorial da wipzee?</Text.h3>
                <FeedbackComponents.Container>
                    {rateList.map((name, index) =>
                        <FeedbackComponents.Container
                            key={name}
                            data-active={userFeedBack?.rating === (index + 1)}
                            flex="flex-col"
                            className="relative group"
                        >
                            <MdStar
                                key={index}
                                id={(index + 1).toString()}
                                className="size-9 hover:fill-primary-100 hover:opacity-100 cursor-pointer opacity-70 group-data-[active=true]:fill-primary-100 group-data-[active=true]:opacity-100"
                                onClick={(e: MouseEvent) => handleAddUserFeedbackToState({ rating: e.currentTarget.id })}
                            />
                            <span className="invisible group-hover:visible group-data-[active=true]:visible">{name}</span>
                        </FeedbackComponents.Container>
                    )}
                </FeedbackComponents.Container>
            </FeedbackComponents.Container>

            <FeedbackComponents.Container flex="flex-col" className="w-full gap-4">
                <Text.link
                    onClick={handleOpenCommet}
                    className="mb-2"
                >Deseja deixar um comentário?</Text.link>

                <TextArea
                    name="message"
                    title="Diga-nos oque achou:"
                    classListContainer="hidden opacity-0 transition-opacity duration-500"
                    onChange={(e) => handleAddUserFeedbackToState({ message: e.currentTarget.value })}
                />
            </FeedbackComponents.Container>

            <Button
                customClass="mt-8"
                onClick={handleSaveUserFeedback}
            >Concluir</Button>
        </div>
    )
};