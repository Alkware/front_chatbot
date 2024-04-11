import { useEffect, useState } from "react"
import { Button } from "../../../../../../components/button/Button"
import { Plan } from "../../../../../../@types/Plan";
import { getPlans } from "../../../../../../api/plan";
import { AxiosResponse } from "axios";
import { MdAutoAwesome, MdCheck } from "react-icons/md";

export function Plans() {
    const [plans, setPlans] = useState<Array<Plan>>();

    useEffect(() => {
        (async () => {
            const response: AxiosResponse<{ error: boolean, response: Plan[] }> | void = await getPlans();
            const plans = response ? response.data.response.sort((a, b) => a.order_relevance - b.order_relevance) : null
            if (plans) setPlans(plans)
        })();
    }, [])

    return (

        <div className="w-screen  h-auto md:h-screen flex gap-8 flex-col items-center relative">
            <h2 className="text-3xl md:text-5xl p-8 font-bold">Planos</h2>

            <div className="w-4/5 flex flex-col md:flex-row gap-8 justify-center z-50">
                {
                    plans?.length ?
                        plans.map((plan, index) =>
                            <div
                                key={plan.id}
                                id={plan.id}
                                data-isbestseller={index === 2}
                                className="group relative flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer justify-between gap-4 border border-primary-100 bg-primary-100/20 rounded-md p-2 items-center"
                            >
                                <div className="absolute top-0 right-0 bg-orange-500 text-light p-1 -translate-y-1/2 rounded-full text-xs font-bold group-data-[isbestseller=false]:hidden">Mais vendido</div>
                                <div className="w-full flex flex-col gap-4">
                                    <h3 className="w-full  text-center text-xl font-bold">{plan.plan_name}</h3>
                                    <div className="w-full flex gap-2 justify-start items-center">
                                        <MdCheck />
                                        <p>{plan.max_messages.default} Mensagens</p>
                                    </div>
                                    <div className="w-full flex gap-2 justify-start items-center">
                                        <MdCheck />
                                        <p>{plan.max_projects.default} chat(s)</p>
                                    </div>
                                    <div className="w-full flex gap-2 justify-start items-center">
                                        <MdCheck />
                                        <p>{plan.max_databases.default} base de dado(s)</p>
                                    </div>
                                    <div className="w-full flex gap-2 justify-start items-center">
                                        <MdCheck />
                                        <p>{plan.max_analyze_metric.default} análise(s) de metricas/dia</p>
                                    </div>
                                </div>
                                {
                                    (Number(plan.max_analyze_metric.bonus) > 0 ||
                                        Number(plan.max_databases.bonus) > 0 ||
                                        Number(plan.max_messages.bonus) > 0 ||
                                        Number(plan.max_projects.bonus) > 0) &&
                                    <div className="w-full flex flex-col justify-start items-center bg-primary-100 text-light rounded-md p-2">
                                        <div className="flex flex-col mb-4 items-center">
                                            <h2 className="text-2xl font-bold">Bônus</h2>
                                            <h3 className="text-center font-medium text-sm">Contratando hoje você ganha:</h3>
                                        </div>
                                        <div className="w-full flex flex-col gap-2 items-start">
                                            {
                                                Number(plan.max_analyze_metric.bonus) > 0 &&
                                                <div className="flex gap-2 items-center">
                                                    <MdAutoAwesome />
                                                    <p>{plan.max_analyze_metric.bonus} análise(s) grátis</p>
                                                </div>
                                            }
                                            {
                                                Number(plan.max_messages.bonus) > 0 &&
                                                <div className="flex gap-2 items-center">
                                                    <MdAutoAwesome />
                                                    <p>{plan.max_messages.bonus} mensagens grátis</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }

                                <div className="flex flex-col gap-4 items-center">
                                    <div className="flex items-start gap-1">
                                        <p className="text-4xl font-bold">{Number(plan.monthly_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                                        <div className="flex flex-col justify-between">
                                            <span className="text-xs">Total:</span>
                                            <span className="text-xs">{Math.floor((Number(plan.monthly_price) * plan.duration_days / 30)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                        </div>
                                    </div>

                                    {
                                        Number(plan.monthly_price) > 0 &&
                                        <Button 
                                            customClass="neon-effect-hover"
                                            onClick={()=> window.location.href = plan.payment_link}
                                        >
                                            Contratar agora
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