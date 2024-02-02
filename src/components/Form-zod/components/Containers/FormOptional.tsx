import { HTMLAttributes, ReactElement, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { STEP_NAME_URL } from "../../../../variables/variables";
import { ToggleComponent } from "../../../Toggle/Toggle";
import { useFormContext } from "react-hook-form";

interface FormOptional extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement | ReactElement[];
    name?: string,
    text: string;
    active?: boolean;
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
export function FormOptional({ children, text, active = false, ...props }: FormOptional) {
    const { register, unregister } = useFormContext();
    const [display, setDisplay] = useState(active ? true : false);
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        if (!display && props?.name) {
            unregister(props.name)
            register(props.name, { value: "Não" })
        }
    }, [])

    const handleActiveCTA = (prop: any) => {
        // busca a atual step do formulario
        const currentStep = params.get(STEP_NAME_URL) || "0";
        if (!currentStep) throw new Error("The current step not founded.")
        //aumenta uma ação no formulario, forçando a atualização do simulador do chat
        const actions = params.get("actions");
        const increaseActions = Number(actions) + 1;
        params.set("actions", increaseActions.toString());
        setParams(params)

        //retorna uma promisse se o toggle será off ou on
        return new Promise((resolve) => {

            if (prop === false) {
                if(props?.name){
                    unregister(props.name);
                    register(props.name, { value: "Não" })
                }
                setDisplay(false)
            } else {
                if(props?.name){
                    unregister(props.name);
                    register(props.name, { value: "" })
                }
                setDisplay(true)
            }

            resolve(true)
        }) as Promise<boolean>
    }

    return (
        <div className="flex flex-col">

            <h2
                className="flex gap-4 items-center text-xl font-bold"
            >
                {text}
                <ToggleComponent
                    cb={handleActiveCTA}
                    isActive={display}
                    template="yesNo"
                />
            </h2>

            <div
                data-display={display}
                className="data-[display='false']:hidden flex justify-between items-center gap-8 mt-4"
            >
                {children}
            </div>
        </div>
    )
};