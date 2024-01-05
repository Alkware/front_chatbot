import { ReactElement } from "react"
import { useSearchParams } from "react-router-dom";

export interface FormStep {
    children: ReactElement | ReactElement[]
    index: number
}

export function FormStep({ children, index }: FormStep) {
    const [params] = useSearchParams();
    const currentStep = Number(params.get("form-step")) || 0;

    return (
        <div
            data-display={currentStep === index}
            className="flex-col gap-12 data-[display='true']:flex hidden"
        >
            {children}
        </div>
    )
};