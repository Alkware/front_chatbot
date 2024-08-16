import { ReactElement } from "react"
import { useSearchParams } from "react-router-dom"
import { STEP_NAME_URL } from "../../../../variables/variables";

interface FormStep {
    children: ReactElement[] | ReactElement,
    index: number,
    stepTitle?: string,
}

export function FormStep({ children, index, stepTitle }: FormStep): ReactElement {
    const [params] = useSearchParams();
    const currentStep = Number(params.get(STEP_NAME_URL))

    return (
        <div
            data-isvisible={index === currentStep ? true : false}
            data-id="step"
            data-index={index}
            className="w-full data-[isvisible='false']:hidden flex flex-col gap-6"
        >
            <h2
                data-isvisible={stepTitle ? true : false}
                className="data-[isvisible='false']:hidden w-full my-2 lg:my-4 text-center font-bold text-2xl text-primary-100 dark:text-light"
            >{stepTitle}</h2>

            {children}
        </div>
    )
};