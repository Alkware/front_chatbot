import { useContext, useEffect, useState } from "react"
import { Loading } from "../../../../../../../../../../../../components/loading/Loading";
import { ClientContext } from "../../../../../../../../../../../../context/ClientContext";
import { eventManager } from "../../../../../../../../../../../../functions/events";
import { formatDate } from "../../../../../../../../../../../../functions/formatDate";
import { analizyDataWithArtifialIntelligence } from "../../../../../../../../../../../../api/artificalIntelligence";
import { AxiosResponse } from "axios";
import { formatTextAI } from "../../../../../../../../../../../../functions/formatTextIA";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { Button } from "../../../../../../../../../../../../components/button/Button";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";

interface Analyze {
    status: "APRROVED" | "REJECT",
    text: string
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


    useEffect(() => {
        const analyzesaved = localStorage.getItem("analyze_saved")
        if (analyzesaved) setAnalyze({ status: "APRROVED", text: analyzesaved });
        else handleAnalyzeMetric()
    }, [])


    const handleAnalyzeMetric = () => {
        setAnalyze(null)
        const project = client?.plan_management.project;
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
            console.log("olá")
            const response: AxiosResponse<ResponseAI> | void = await analizyDataWithArtifialIntelligence(prompt);
            console.log(response)
            if (response?.status === 200 && !!response.data) {
                const { text } = response.data.choices[0];
                localStorage.setItem("analyze_saved", text)
                setAnalyze({ status: "APRROVED", text })
            }else setModalContent({
                componentName: "modal_error_analyze_metric",
                components: <PopOver 
                    componentName="modal_error_analyze_metric"
                    message="Não foi possível analisar suas métricas, por favor tente mais tarde."
                    type="ERROR"
                />
            })
        })()
    }


    if (!analyze) return (
        <div className="flex flex-col items-center gap-4">
            <Loading />
            <h2>Analisando métricas</h2>
        </div>
    )

    return (
        <div className="max-w-[500px] flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Relatório da análise</h2>
            <div className="max-h-[300px] overflow-auto">
                <p
                    dangerouslySetInnerHTML={{ __html: formatTextAI(analyze.text) }}
                    className="text-center"
                ></p>
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