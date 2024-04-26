import { useSearchParams } from "react-router-dom"
import { STEP_NAME_URL } from "../../../../../variables/variables";
import { MouseEvent } from "react";

interface Steps {
    numberSteps: number,
}

export function Steps({ numberSteps }: Steps) {
    const [params, setParams] = useSearchParams();
    const currentIndex = Number(params.get(STEP_NAME_URL)) || 0;

    const handleClickNextStep = (e: MouseEvent<HTMLDivElement>) => {
        const indexClicked = e.currentTarget.dataset.index || 0;
        params.set(STEP_NAME_URL, (indexClicked).toString())
        setParams(params)
    }

    return (
        numberSteps > 1 &&
        <div className="w-full flex flex-col">
            <div className="w-full flex justify-between items-center mb-8">
                {
                    Array(numberSteps).fill(0).map((_, index) =>
                        <div key={index} className={`w-full h-[1px] bg-transparent border border-dashed border-transparent border-t-white/30 flex justify-center items-center relative`}>
                            <div
                                data-index={index}
                                className={
                                    `w-[25px] md:w-[35px] h-[25px] md:h-[35px] flex justify-center items-center text-md cursor-pointer font-bold
                                    ${index < currentIndex ?
                                        "bg-primary-100 border border-light" :
                                        index === currentIndex ? "bg-light animate-ping" :
                                            "bg-zinc-400"} rounded-full`}
                                onClick={handleClickNextStep}
                            >{index + 1}</div>
                            {
                                index === currentIndex &&
                                <div
                                    data-index={index}
                                    className={`w-[25px] md:w-[35px] h-[25px] md:h-[35px] cursor-pointer flex justify-center items-center font-bold bg-primary-100 border border-light rounded-full absolute`}
                                    onClick={handleClickNextStep}
                                >{index + 1}</div>
                            }
                        </div>
                    )
                }
            </div>


        </div>
    )
};