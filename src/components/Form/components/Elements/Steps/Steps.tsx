import { useSearchParams } from "react-router-dom"
import { STEP_NAME_URL } from "../../../../../variables/variables";

interface Steps {
    numberSteps: number,
}

export function Steps({ numberSteps }: Steps) {
    const [params] = useSearchParams();
    const currentIndex = Number(params.get(STEP_NAME_URL)) || 0

    return (
        <div className="w-full max-w-[500px] flex justify-between my-6">
            {
                Array(numberSteps).fill(0).map((_, index) =>
                    <div key={index} className={`w-full h-[1px] bg-transparent border border-dashed border-transparent border-t-white/30 flex justify-center items-center`}>
                        <div
                            className={
                                `w-[20px] h-[20px] flex justify-center items-center text-xs font-bold
                                    ${index < currentIndex ?
                                    "bg-primary-100 border border-light" :
                                    index === currentIndex ? "bg-light animate-ping" :
                                        "bg-zinc-400"} rounded-full`}
                        >{index + 1}</div>
                        {
                            index === currentIndex &&
                            <div
                                className={`w-[20px] h-[20px] flex justify-center items-center font-bold bg-primary-100 border border-light rounded-full absolute`}
                            >{index + 1}</div>
                        }
                    </div>
                )
            }
        </div>
    )
};