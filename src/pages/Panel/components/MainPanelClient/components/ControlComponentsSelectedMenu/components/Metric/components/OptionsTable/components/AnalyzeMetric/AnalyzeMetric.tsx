import { MouseEvent, RefObject, useContext, useEffect, useRef, useState } from "react"
import { ClientContext } from "../../../../../../../../../../../../context/ClientContext";
import { eventManager } from "../../../../../../../../../../../../functions/events";
import { formatDate } from "../../../../../../../../../../../../functions/formatDate";
import { analizyDataWithArtifialIntelligence } from "../../../../../../../../../../../../api/artificalIntelligence";
import { AxiosResponse } from "axios";
import { formatTextAI } from "../../../../../../../../../../../../functions/formatTextIA";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { Button } from "../../../../../../../../../../../../components/button/Button";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";
import { MdStar } from "react-icons/md";
import { PopUp } from "../../../../../../../../../../../../components/modal/templates/PopUp";
import { ModalFeedbackAnalyze } from "./components/ModalFeedbackAnalyze";
import { createMetricAnalysis, getMetricAnalysis } from "../../../../../../../../../../../../api/metricAnalysis";

interface Analyze {
    status: "APRROVED" | "REJECT",
    analysis: Array<{
        result: string;
        feedback: string;
        metrics_analysis_rating: number;
        id: string;
    }>
}

interface ResponseAI {
    choices: Array<{
        text: string
    }>
}

var prompt = `
 A wipzee é uma empresa que fornece um chatbot com inteligencia artificial, promovendo uma experiência completa ao usuário.
 Desda personalização do chat até o consumo de dados (Métricas), abaixo será informado as minhas métricas, quero que você faça uma analise
 completa e sugira melhorias ou me de feedbacks positivos sobre as métricas.

 exemplo 1: se tiver muitos chats abertos e nenhum clique no link, significa que o cliente não está sendo influenciado a clicar no link. Sugestão: "Mudar o texto do link e deixar mais atrativo ou melhorar sua fonte de dados."
 exemplo 2: se tiver muitos chats abertos e nenhuma ou poucas mensagens, significa que o cliente não está sentindo avontade de conversar com a IA ou não está conseguindo conversar com ela. SOLUÇÃO: Melhorar a primeira mensagem do chat ou ver se existe algum problema tecnico nas trocas de mengens."
`

export function AnalyzeMetric() {
    const { clearModal, setModalContent } = useContext(ModalContext)
    const { client } = useContext(ClientContext)
    const [analyze, setAnalyze] = useState<Analyze | null>();
    const containerStarRef: RefObject<HTMLDivElement> = useRef(null)



    useEffect(() => {
        (async () => {
            if (client) {
                console.log(client)
                const allAnalysis = await getMetricAnalysis(client.plan_management?.id);
                 const analysis = allAnalysis.data.response;
                const maxAnalysisByDay = client.plan_management.plan.max_analyze_metric.default;
                const maxAnalysisWithBonusByDay = client.plan_management.plan.max_analyze_metric.bonus;
                const totalAnalysis = Number(maxAnalysisByDay + maxAnalysisWithBonusByDay);

                if (analysis.length) setAnalyze({ status: "APRROVED", analysis });
                else {
                    if (totalAnalysis > 0 && analysis.length <= totalAnalysis) handleAnalyzeMetric()
                    else {
                        const msgToFreeUser = "Não é possivel analisar métricas no plano gratuito, mude de plano ou entre em contato com o suporte."
                        const msgToPaymentUser = "O limite de analises no seu plano foi atingido. Aguarde até amanhã ou mude de plano para fazer uma nova análise."

                        setModalContent({
                            componentName: "modal_limit_analysis",
                            components:
                                <PopOver
                                    componentName="modal_limit_analysis"
                                    message={ Number(client.plan_management.plan.monthly_price) > 0 ? msgToPaymentUser : msgToFreeUser}
                                    functionAfterComplete={() => clearModal(null, { clearAll: true })}
                                />
                        })
                    }
                }
            }
        })();
    }, []);


    const handleAnalyzeMetric = () => {
        if (analyze && client && analyze?.analysis.length >= Number(client.plan_management.plan.max_analyze_metric.default)) {
            setModalContent({
                componentName: "modal_max_limit_analysis",
                components:
                    <PopOver
                        componentName="modal_max_limit_analysis"
                        message="O limite de análises no seu plano foi atingido. Aguarde até amanhã ou mude de plano para fazer uma nova análise."
                        type="WARNING"
                    />
            })

            return;
        }


        setAnalyze(null)
        if (!client) throw new Error("Client is missing!")
        const project = client.plan_management.project;
        const timeNow = formatDate(new Date()).currentHour;

        if (project) {
            project.forEach(project => {
                prompt += `
                    NOME DO CHAT: ${project.project_name}
                    
                    MÉTRICAS:

                    Chats abertos total:
                    (Essa métrica pode tanto ser tanto varios usuários abrindo um chat ou como pode ser o mesmo usuário abrindo ele varias vezes)
                    [1000]

                    Chats abertos:
                    (Essa métrica conta quantas vezes o usuário abriu o chat, caso o usuário abra o mesmo chat 2 vezes ou mais, será contabilizado apenas uma vez)
                    [1]

                    Quando o chat foi criado:  
                    (Essa métrica registra quando o chat foi criado)
                    [${eventManager(project, timeNow).CREATED_AT}]

                    chat está ativado ou desativado:  
                    (Informa se o chat está ativado ou não: true = ativado e false = desativado)
                    [${eventManager(project, timeNow).IS_ONLINE}]

                    Leads coletados:  
                    (Informa quantos usuários deixaram um contato salvo no sistema)
                    [${eventManager(project, timeNow).LEADS_COLLECTED}]

                    Cliques no link:  
                    (Informa quantos cliques no link(call to action) foi dado no chat)
                    [100]

                    Média de mensagens:  
                    (Informa qual a média de mensagens por chat)
                    [${eventManager(project, timeNow).MEDIA_MESSAGES_CHAT}]

                    Média de tempo de uso:  
                    (Informa qual a média que o usuário ficou interagindo no chat)
                    [${eventManager(project, timeNow).MEDIA_USAGE_TIME}]

                    Total de Mensagens:  
                    (Informa qual o total de mensagens que esse chat tem)
                    [${eventManager(project, timeNow).MESSAGES_TOTAL}]

                    Entrada de Mensagens:  
                    (Informa quantas mensagens os usuários já mandaram para esse chat)
                    [${eventManager(project, timeNow).MESSAGE_INPUT}]

                    Entrada de Mensagens:  
                    (Informa quantas mensagens os usuários já mandaram para esse chat)
                    [${eventManager(project, timeNow).MESSAGE_OUTPUT}]

                    Saída de Mensagens:  
                    (Informa quantas mensagens nossa inteligencia artificial já mandou para esse chat)
                    [${eventManager(project, timeNow).MESSAGE_OUTPUT}]

                    tempo de uso:  
                    (Informa quanto tempo esse chat já ficou aberto)
                    [${eventManager(project, timeNow).USAGE_TIME}]`
            })
        }

        (async () => {
            const response: AxiosResponse<ResponseAI> | void = await analizyDataWithArtifialIntelligence(prompt);
            if (response?.status === 200 && !!response.data) {
                const { text } = response.data.choices[0];
                const createData = await createMetricAnalysis(client?.plan_management.id, text);
                setAnalyze({ status: "APRROVED", analysis: createData.data.response })
            } else setModalContent({
                componentName: "modal_error_analyze_metric",
                components: <PopOver
                    componentName="modal_error_analyze_metric"
                    message="Não foi possível analisar suas métricas, por favor tente mais tarde."
                    type="ERROR"
                />
            })
        })()
    }

    const handleSelectStar = (e: MouseEvent<HTMLDivElement>) => {
        if (!analyze?.analysis[0].feedback) {
            const index = e.currentTarget.tabIndex;
            const spanReview = e.currentTarget.querySelector("span")?.textContent || "Regular";
            const stars = containerStarRef.current?.querySelectorAll("div > svg");
            stars?.forEach(star => star.classList.remove("fill-primary-100"));
            stars?.forEach((star, indexStar) => (indexStar + 1) <= index && star.classList.add("fill-primary-100"));
            setModalContent({
                componentName: "modal_show_feedback_analyze",
                components:
                    <PopUp>
                        <ModalFeedbackAnalyze
                            index={index}
                            spanReview={spanReview}
                            metric_analysis_id={analyze?.analysis[0].id}
                        />
                    </PopUp>
            });

        } else {
            setModalContent({
                componentName: "modal_error_analysis_metric",
                components:
                    <PopOver
                        componentName="modal_error_analysis_metric"
                        message="Essa análise já foi avaliada!"
                        type="WARNING"
                    />
            })
        }

    }


    if (!analyze) return (
        <div
            className="flex flex-col items-center gap-4 p-4"
            data-loading
        >
            <h2>Analisando métricas</h2>
            <span>Carregando...</span>
        </div>
    );

    return (
        <div className="max-w-[500px] flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">Relatório da análise</h2>
                <span className="opacity-70">{analyze.analysis.length}/{Number(client?.plan_management.plan.max_analyze_metric.default)} Análises restantes de hoje</span>
            </div>

            <div className="max-h-[300px] overflow-auto border border-primary-100 p-2">
                <p
                    dangerouslySetInnerHTML={{ __html: formatTextAI(analyze.analysis[0].result) }}
                    className="text-center"
                ></p>
            </div>

            <div className="flex flex-col w-full items-center my-4">
                <h2 className="text-xl font-bold">Avalie essa análise:</h2>
                <div
                    className="flex gap-2"
                    ref={containerStarRef}
                >
                    {
                        Array.from({ length: 5 }).map((_, index) =>
                            <div
                                key={index}
                                tabIndex={index + 1}
                                onClick={handleSelectStar}
                                className="group flex flex-col justify-center items-center"
                            >
                                <MdStar
                                    data-isselected={(index + 1) <= analyze.analysis[0].metrics_analysis_rating}
                                    className="cursor-pointer text-3xl hover:fill-primary-100 data-[isselected=true]:fill-primary-100"
                                />
                                <span
                                    className="group-hover:opacity-100 opacity-0"
                                >{index === 0 ? "horrível" : index === 1 ? "ruim" : index === 2 ? "regular" : index === 3 ? "boa" : "excelente"}</span>
                            </div>
                        )
                    }
                </div>

            </div>

            <div className="flex gap-8 justify-center items-center">
                <span
                    onClick={() => clearModal(null, { clearLast: true })}
                    className="underline opacity-80 my-4 cursor-pointer"
                >Fechar análise</span>
                <Button
                    onClick={handleAnalyzeMetric}
                >
                    Nova análise
                </Button>
            </div>
        </div>
    )
};