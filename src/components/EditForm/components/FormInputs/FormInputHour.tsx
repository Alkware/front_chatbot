import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { registerDataLocalStorage } from "../../../../functions/registerDataLocalStorage";

interface FormInputHour {
    fatherName: string;
    title: string;
    formName?: string;
    defaultValue?: string;
}

export function FormInputHour({ fatherName, title, formName, defaultValue }: FormInputHour) {
    const [searchParams, setSearchParams] = useSearchParams();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [time , setTime] = useState<any>({ hour: null, minutes: null })


    useEffect(() => {
        //cria um valor padrão para o input dentro do localstorage
        if (defaultValue) {
            registerDataLocalStorage({ dataset: { field_name: fatherName }, value: defaultValue }, formName)
        }

    }, []);

    const handleOnChange = (e: any) => {
        handleValidationInput(e)
        // adiciona actions a url para a alteração do simulador
        const actions = searchParams.get("actions") || "0"
        const increaseCharacter = Number(actions) + 1
        searchParams.set("actions", increaseCharacter.toString())
        setSearchParams(searchParams)
        // define a hora escolhida.
        time[e.target.name] = e.target.value
        setTime(time)

        if(time.hour !== null && time.minutes !== null) {
            const joinTime = `${time.hour}:${time.minutes}`
            registerDataLocalStorage({ dataset: { field_name: e.target.dataset.field_name }, value: joinTime }, formName)
        }
    }

    const handleValidationInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.value.length === 0) {
            target.style.border = "1px solid red"
            containerRef.current?.querySelector("span[datatype=error-message]")?.classList.remove("hidden")
        } else {
            target.style.border = ""
            containerRef.current?.querySelector("span[datatype=error-message]")?.classList.add("hidden")

            if(target.name === "hour" && Number(target.value) > 23) target.value = "23"
            else if (target.name === "minutes" && Number(target.value) > 59) target.value = "59";

        }
    }

    return (
        <div
            className="w-full flex flex-col gap-2 mb-4 relative "
            ref={containerRef}
        >
            <label
                htmlFor={fatherName}
                className="whitespace-nowrap text-ellipsis text-center overflow-hidden px-2 py-2 font-bold "
            >{title}</label>


            <div className="flex gap-4 justify-center">
                <div className="flex flex-col">
                    <label
                        htmlFor={`hour`}
                        className="opacity-80 whitespace-nowrap text-ellipsis overflow-hidden px-2 py-2 "
                    >Horas:</label>
                    <input
                        type="number"
                        min={0}
                        max={23}
                        name={`hour`}
                        data-field_name={`${fatherName}.hour`}
                        className="w-[70px] border border-primary-100"
                        onChange={handleOnChange}
                        defaultValue={defaultValue ? defaultValue : ""}
                    />
                </div>
                <div className="flex flex-col">
                    
                    <label
                        htmlFor={"minutes"}
                        className="opacity-80 whitespace-nowrap text-ellipsis overflow-hidden px-2 py-2 "
                    >Minutos:</label>

                    <input
                        type="number"
                        min={0}
                        max={59}
                        step={10}
                        name={`minutes`}
                        data-field_name={`${fatherName}.minutes`}
                        className="w-[70px] border border-primary-100"
                        onChange={handleOnChange}
                        defaultValue={defaultValue ? defaultValue : ""}
                    />
                </div>

            </div>


            <span
                className="hidden bg-red-500/30 text-red-500 text-center rounded-md"
                datatype="error-message"
            >Esse campo não pode estar vazio</span>
        </div>
    )
};