import { RefObject, useContext, useRef } from "react";
import { sendFeedbackMetricAnalysis } from "../../../../../../../../../../../../../api/metricAnalysis";
import { Button } from "../../../../../../../../../../../../../components/button/Button";
import { ModalContext } from "../../../../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../../../../components/modal/templates/PopOver";

interface ModalFeedbackAnalyze {
    index: number;
    spanReview: string;
    metric_analysis_id: string | void;
}

export function ModalFeedbackAnalyze({ index, spanReview, metric_analysis_id }: ModalFeedbackAnalyze) {
    const feedbackRef: RefObject<HTMLTextAreaElement> = useRef(null);
    const { setModalContent, clearModal } = useContext(ModalContext)

    const handleSendFeedback = async () => {
        const feedback = feedbackRef.current?.value;
        if (feedback && metric_analysis_id) {
            const response = await sendFeedbackMetricAnalysis({ feedback, metrics_analysis_rating: index, metric_analysis_id });
            if (response.data.response) {
                setModalContent({
                    componentName: "modal_send_success",
                    components:
                        <PopOver
                            componentName="modal_send_success"
                            message="Feedback enviado com sucesso. Obrigado!"
                            functionAfterComplete={() => clearModal(null, { clearLast: true })}
                        />
                })
            }
        } else {
            setModalContent({
                componentName: "modal_error_send_feedback",
                components:
                    <PopOver
                        componentName="modal_error_send_feedback"
                        message="Você precisa deixar um feedback antes de enviar sua avaliação ou houve um erro no envio do feedback!"
                        type="ERROR"
                    />
            })
        }
    }

    return (
        <div className="w-[300px] flex flex-col items-center gap-2 p-4">
            <h2 className="text-center font-bold text-lg">Sua avaliação foi "{spanReview}".</h2>
            <p className="text-center opacity-80">Gostaria de deixar um feedback em algo poderia melhorar?</p>
            <textarea ref={feedbackRef}></textarea>
            <Button
                customClass="my-4"
                onClick={handleSendFeedback}
            >Enviar</Button>
        </div>
    )
};