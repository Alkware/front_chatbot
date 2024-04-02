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
        <div className="w-screen h-screen flex gap-8 flex-col items-center">
            <h2 className="text-5xl p-8">Planos</h2>

            <div className="w-4/5 flex gap-4 justify-center">
                {
                    plans.map(plan =>
                        <div 
                            key={plan.plan}
                            data-isbestseller={plan.isBestSeller}
                            className="group relative flex flex-col gap-4 border border-primary-100 bg-primary-100/20 rounded-md p-4 items-center"
                        >
                            <div className="absolute top-0 right-0 bg-orange-700 p-1 -translate-y-1/2 rounded-full text-xs font-bold group-data-[isbestseller=false]:hidden">Mais vendido</div>
                            <h3>{plan.plan}</h3>
                            <p>{plan.value}</p>
                            <Button>Contratar agora</Button>
                        </div>    
                    )
                }
            </div>

        </div>
    )
};