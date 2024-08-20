import { ReactElement } from "react"
import { useSearchParams } from "react-router-dom"
import { STEP_NAME_URL } from "../../../../variables/variables";

interface FormStep {
    children: ReactElement[] | ReactElement,
    index: number,
    stepTitle?: string,
    hidden?: boolean,
}

export function FormStep({ children, index, stepTitle, hidden }: FormStep): ReactElement {
    const [params] = useSearchParams();
    const currentStep = Number(params.get(STEP_NAME_URL))

    return (
        <div
            data-isvisible={index === currentStep ? true : false}
            data-id="step"
            data-index={index}
            data-display={!!hidden}
            className="w-full data-[isvisible='false']:hidden flex flex-col gap-6 data-[display=true]:hidden"
        >
            <h2
                data-isvisible={stepTitle ? true : false}
                className="data-[isvisible='false']:hidden w-full my-2 lg:my-4 text-center font-bold text-2xl text-primary-100 dark:text-light"
            >{stepTitle}</h2>

            {children}
        </div>
    )
};