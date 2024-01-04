import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { Button } from "../../../../components/button/Button";
import { useSearchParams } from "react-router-dom";

interface ButtonSteps {
    stepSize: number;
}

export function ButtonSteps({ stepSize }: ButtonSteps) {
    const [params, setParams] = useSearchParams();

    // const handleNextStep = (isNext: boolean = true) => {

    //     if (isNext) checkInputEmpty()

    //     const form = containerForm.current
    //     const index = isNext ?
    //         (currentIndex < (tabIndex.length - 1) ? (currentIndex + 1) : (tabIndex.length - 1))
    //         :
    //         (currentIndex > 0 ? (currentIndex - 1) : 0);

    //     const currentContainerIndex = tabIndex[index]

    //     function addHiddenOnContent() {
    //         if (form) {
    //             const divs = [...form.querySelectorAll("div#container")];
    //             if (divs) {
    //                 divs.forEach(div => {
    //                     div.classList.add("hidden")
    //                 })
    //             }
    //         }
    //     }

    //     function addFlexCurrentContent() {
    //         if (form) {
    //             addHiddenOnContent();
    //             const divActive = form.querySelector(`div[data-index='${currentContainerIndex}']`);
    //             if (divActive) {
    //                 divActive.classList.add("flex")
    //                 divActive.classList.remove("hidden")
    //             }
    //         }
    //     }

    //     addFlexCurrentContent();
    //     setCurrentIndex(index)
    // }

    const handleNextStep = ()=>{
        const currentStep = Number(params.get("step")) + 1;
        if(currentStep < stepSize){
            params.set("step", currentStep.toString())
            setParams({...params, step: currentStep.toString()})
        }
    }


    const handlePreviousStep= ()=>{
        const currentStep = Number(params.get("step")) - 1;
        if(currentStep >= 0){
            params.set("step", currentStep.toString())
            setParams({...params, step: currentStep.toString()})
        }
    }

    return (
        <div className="w-full flex gap-20 justify-center items-center">

            <Button
                customClass="px-4 cursor-pointer"
                onClick={handlePreviousStep}
            > <IoIosUndo /> Voltar</Button>

            <Button
                data-islaststep={Number(params.get("step")) >= (stepSize - 1)}
                customClass="flex justify-center px-4 data-[islaststep='true']:hidden"
                onClick={handleNextStep}
            >Proximo <IoIosRedo /></Button>
        </div>
    )
};