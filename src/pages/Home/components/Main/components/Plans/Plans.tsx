import { useContext, useEffect, useState } from "react"
import { Button } from "../../../../../../components/button/Button"
import { Plan } from "../../../../../../@types/Plan";
import { getPlans } from "../../../../../../api/plan";
import { AxiosResponse } from "axios";
import { MdCheck } from "react-icons/md";
import { ClientContext } from "../../../../../../context/ClientContext";

export function Plans() {
    const { client } = useContext(ClientContext)
    const [plans, setPlans] = useState<Array<Plan>>();

    useEffect(() => {
        (async () => {
            const response: AxiosResponse<{ error: boolean, response: Plan[] }> | void = await getPlans();
            const plans = response ? response.data.response.sort((a, b) => a.order_relevance - b.order_relevance) : null;
            if (plans) setPlans(plans)
        })();
    }, [])

    const handleSelectPlan = (plan: Plan) => {
        const isLogged = localStorage.token;
        if (!isLogged) localStorage.setItem("is_account", "0")
        window.location.href = `${plan.payment_link}?pid=${plan.id}&cid=${client?.id}`
    }


    return (
        <div className="w-screen h-auto md:min-h-screen flex gap-8 flex-col items-center relative">
            <h2 className="text-3xl md:text-5xl p-8 font-bold text-primary-100 dark:text-light">Planos</h2>

            <div className="w-[90%] flex flex-col md:flex-row flex-nowrap gap-4 justify-center z-50">
                {plans?.length ?
                    plans.map((plan, index) =>
                        (plan.status !== "DISABLED") &&
                        <div
                            key={plan.id}
                            id={plan.id}
                            className="w-full relative flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer justify-between gap-4 border border-primary-100 bg-primary-100/20 rounded-md p-2 items-center text-primary-100 dark:text-light"
                        >
                            <h3 className="w-full text-center text-lg font-bold bg-primary-100 shadow-md shadow-dark/30 absolute top-0 left-0 py-2 z-0">{plan.plan_name}</h3>
                            <div
                                data-isbestseller={index === 2}
                                className="w-4/5 absolute -top-1 left-1/2 -translate-x-1/2 bg-orange-500 text-light border-2 border-orange-800 uppercase text-center -translate-y-1/2 rounded-full text-sm font-bold data-[isbestseller=false]:hidden"
                            >Mais popular</div>
                            <div className="w-full flex flex-col gap-1">

                                <div className="mt-12 flex gap-2 justify-start items-center">
                                    <MdCheck />
                                    <p>{plan.max_messages.default} Mensagens</p>
                                </div>
                                <div className="flex gap-2 justify-start items-center">
                                    <MdCheck />
                                    <p>{plan.max_projects.default} chat(s)</p>
                                </div>
                                <div className="flex gap-2 justify-start items-center relative">
                                    <MdCheck />
                                    <p>{plan.max_databases.default} fonte de dado(s)</p>

                                    <div className="group relative">
                                        <span className="bg-light text-dark px-[4px] rounded-full text-[10px] relative font-bold">?</span>
                                        <span className="scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-95 transition-all absolute z-50 top-0 left-0 -translate-y-full -translate-x-full text-center p-2 rounded-md shadow-md shadow-black/50 bg-primary-100 leading-5 text-light border-2 border-primary-100 w-[300px]">
                                            A fonte de dados é fundamental para nossa inteligência artificial, pois é dela que extraímos as informações necessárias para responder às perguntas dos clientes de forma precisa e eficiente.
                                        </span>
                                    </div>

                                </div>
                                <div
                                    data-display={Number(plan.max_analyze_metric.default) > 0}
                                    className="flex gap-2 justify-start items-center data-[display=false]:hidden"
                                >
                                    <MdCheck />
                                    <p>{plan.max_analyze_metric.default} análise(s) de metricas/dia</p>
                                    <div className="group relative">
                                        <span className="bg-light text-dark px-[4px] rounded-full text-[10px] relative font-bold">?</span>
                                        <span className="scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-95 transition-all absolute top-0 left-0 -translate-y-full -translate-x-full text-center p-2 rounded-md shadow-md shadow-black/50 bg-primary-100 leading-5 text-light font-medium border-2 border-primary-100 w-[300px] z-50">
                                            Utilizamos uma IA treinado para analisar suas métricas para que você saiba exatamente o que fazer para melhorar a qualidade do seu chat.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <div className="flex items-center">
                                    <div className="flex items-end">
                                        <span className="opacity-60 mx-1">R$</span>
                                        <p className="text-4xl font-bold">{Number(plan.monthly_price).toFixed(0)}</p>
                                        <span
                                            data-hidden={Number(plan.monthly_price) <= 0}
                                            className="text-lg data-[hidden=true]:hidden py-[1px] opacity-60"
                                        >/mês</span>
                                    </div>

                                </div>

                                {
                                    Number(plan.monthly_price) > 0 ?
                                        <Button
                                            customClass="neon-effect-hover mt-2 mb-4"
                                            onClick={() => handleSelectPlan(plan)}
                                        >
                                            Contratar agora
                                        </Button>
                                        :
                                        <Button
                                            customClass="neon-effect-hover mt-2 mb-4"
                                            onClick={() => window.location.href = "/register"}
                                        >
                                            Testar agora
                                        </Button>
                                }

                            </div>
                        </div>
                    )
                    :
                    <h2>Error ao exibir os planos</h2>
                }
            </div>

            <div className="w-[50vw] h-[40vw] absolute top-0 left-0 -z-0 flex justify-start items-center gap-2 -translate-y-1/3">
                <div className="w-full h-full radial-gradient flex gap-2 justify-center items-center">
                    {
                        Array.from({ length: 12 }).map((_, index) =>
                            index === 6 ?
                                <div
                                    key={index}
                                    className="w-[60vw] h-[60vh] absolute rotate-180 top-1/2 left-1/4 border-t-2 border-r-2 border-primary-100/15 rounded-xl overflow-hidden"
                                >
                                    <div className="w-[2vw] rounded-full h-[2px] bg-gradient-to-r from-transparent to-primary-100/80 animate-light-running"></div>
                                </div>
                                :
                                index % 2 ?
                                    <div
                                        key={index}
                                        className="w-full h-[1px] absolute top-1/3 opacity-50 bg-gradient-to-r from-transparent via-primary-100/50 to-transparent"
                                        style={{ translate: `0 ${index * 25}px` }}
                                    ></div>
                                    :
                                    <div
                                        key={index}
                                        className="w-[1px] h-full absolute left-1/3 opacity-50 bg-gradient-to-b from-transparent via-primary-100/50 to-transparent"
                                        style={{ translate: `${index * 25}px 0` }}
                                    ></div>
                        )
                    }
                </div>
            </div>

        </div>
    )
};