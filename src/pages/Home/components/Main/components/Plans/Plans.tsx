import { Button } from "../../../../../../components/button/Button"

const plans = [
    {
        plan: "basic",
        value: "R$ 1,99",
        isBestSeller: false, 
    },
    {
        plan: "Startdard",
        value: "R$ 4,99",
        isBestSeller: true, 
    },
    {
        plan: "Premium",
        value: "R$ 9,99",
        isBestSeller: false, 
    },
]


export function Plans() {
    return (
        <div className="w-screen h-auto md:h-screen flex gap-8 flex-col items-center relative">
            <h2 className="text-5xl p-8">Planos</h2>

            <div className="w-4/5 flex flex-col md:flex-row gap-4 justify-center">
                {
                    plans.map(plan =>
                        <div 
                            key={plan.plan}
                            data-isbestseller={plan.isBestSeller}
                            className="h-[400px] w-[250px] group relative flex flex-col justify-between gap-4 border border-primary-100 bg-primary-100/20 rounded-md p-4 items-center"
                        >
                            <div className="absolute top-0 right-0 bg-orange-700 p-1 -translate-y-1/2 rounded-full text-xs font-bold group-data-[isbestseller=false]:hidden">Mais vendido</div>
                            <h3 className="text-2xl font-bold">{plan.plan}</h3>
                            <p>{plan.value}</p>
                            <Button>Contratar agora</Button>
                        </div>    
                    )
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