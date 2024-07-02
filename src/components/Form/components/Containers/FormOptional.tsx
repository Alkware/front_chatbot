import { HTMLAttributes, ReactElement, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { STEP_NAME_URL } from "../../../../variables/variables";
import { ToggleComponent } from "../../../Toggle/Toggle";
import { twMerge } from "tailwind-merge";
import { useFormContext } from "react-hook-form";
import { createLog } from "../../../../api/log";

interface FormOptional extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement | ReactElement[];
    text: string;
    name: string,
    functionOffToggle?: () => void;
}

/**
 * FormOptional é um componente que possibilita deixar campo opcionais.
 * 
 * @param children filhos do FormOptional.
 * @param text Texto que será adicionado antes do toggle, informando do que se refere o toggle.
 * @param register Caso o seja necessário registrar um valor no register mesmo que o toggle esteje desativado.
 * @param active Define se o toggle vai iniciar ativado ou desativado.
 * @returns 
 */
export function FormOptional({ children, text, functionOffToggle, name, ...props }: FormOptional) {
    const { watch } = useFormContext();
    const active = watch(name);
    const [display, setDisplay] = useState(!!active ? true : false);
    const [params, setParams] = useSearchParams();

    const handleActiveCTA = async (prop: any) => {
        // busca a atual step do formulario
        const currentStep = params.get(STEP_NAME_URL) || "0";

        if (!currentStep) {
            await createLog({
                level: "danger",
                path: "src/components/Form/components/Containers/FormOptional.tsx Ln: 38",
                log: "A atual step não foi encontrada",
                sector: "Plataforma"
            });
            throw new Error("The current step not founded.")
        }
        //aumenta uma ação no formulario, forçando a atualização do simulador do chat
        const actions = params.get("actions");
        const increaseActions = Number(actions) + 1;
        params.set("actions", increaseActions.toString());
        setParams(params)

        //retorna uma promisse se o toggle será off ou on
        return new Promise((resolve) => {
            if (prop === false) {
                functionOffToggle && functionOffToggle();
                setDisplay(false)
            } else setDisplay(true);
            resolve(true)
        }) as Promise<boolean>
    }

    return (
        <div className="w-full flex flex-col gap-6">

            <h2
                className="w-full md:w-auto flex gap-4 items-center text-base md:text-xl font-bold text-primary-100 dark:text-light"
            >
                {text}
                <ToggleComponent
                    cb={handleActiveCTA}
                    isActive={display}
                    template="yesNo"
                />
            </h2>

            {
                display &&
                <div
                    className={twMerge("flex flex-col justify-between items-center gap-8", props.className)}
                >
                    {children}
                </div>
            }
        </div>
    )
};