import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { registerDataLocalStorage } from "../../../../functions/registerDataLocalStorage";
import { FaArrowLeft, FaArrowRight, FaCircleNotch, FaLock } from "react-icons/fa";


interface FormSlug {
    fieldName: string
    title: string,
    formName?: string
    defaultValue?: string
}

export function FormSlug({ fieldName, title, formName, defaultValue }: FormSlug) {
    const [searchParams, setSearchParams] = useSearchParams();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [slug, setSlug] = useState(defaultValue)

    useEffect(() => {
        //cria um valor padrão para o input dentro do localstorage
        if (defaultValue) {
            registerDataLocalStorage({ dataset: { field_name: fieldName }, value: defaultValue }, formName)
        }

        if (containerRef.current) {
            const label = containerRef.current.querySelector("label");
            const inputElement = containerRef.current.querySelector("input");

            if (inputElement && label && inputElement.value.length > 0) {
                label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
                label.classList.add("top-0", "-translate-y-1/2", "bg-primary-100", "text-sm")
            }
        }
    }, []);

    const handleClickedInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
        label.classList.add("top-0", "-translate-y-1/2", "bg-primary-100", "text-sm")

        input.focus();
    }

    const handleExitInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        if (input.value.length <= 0) {
            label.classList.add("top-0", "opacity-50", "cursor-text", "py-2")
            label.classList.remove("top-0", "-translate-y-1/2", "bg-primary-100", "text-sm")
        }
    }

    const handleOnChange = (e: any) => {
        handleValidationInput(e)
        const actions = searchParams.get("actions") || "0"
        const increaseCharacter = Number(actions) + 1
        searchParams.set("actions", increaseCharacter.toString())
        setSearchParams(searchParams)

        if(!e.target.value.includes("-")){
            const newSlug = defaultValue?.split("-")[0] + "-" + e.target.value
    
    
            registerDataLocalStorage({ dataset: { field_name: e.target.dataset.field_name }, value: newSlug }, formName)
            setSlug(newSlug)
        }
    }

    const handleValidationInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.value.length === 0) {
            target.style.border = "1px solid red"
            containerRef.current?.querySelector("span[datatype=error-message]")?.classList.remove("hidden")
        } else {
            target.style.border = ""
            containerRef.current?.querySelector("span[datatype=error-message]")?.classList.add("hidden")
        }
    }


    return (
        <div
            className="w-full flex flex-col gap-2 my-8 relative"
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                htmlFor={fieldName}
                className="px-2 py-2 ml-2 absolute top-0 transition-transform opacity-50 cursor-text rounded-md whitespace-nowrap "
            >{title}</label>

            <input
                type="text"
                name={fieldName}
                data-field_name={fieldName}
                className="border border-primary-100"
                onChange={handleOnChange}
                defaultValue={slug ? slug.split("-")[1] : ""}
            />

            <span
                className="hidden bg-red-500/30 text-red-500 text-center rounded-md"
                datatype="error-message"
            >Esse campo não pode estar vazio</span>

            <div className="flex gap-2 items-center bg-white p-2 my-4 rounded-md">
                <FaArrowLeft className="fill-zinc-600" />
                <FaArrowRight className="fill-zinc-600" />
                <FaCircleNotch className="fill-zinc-600" />
                <div className="w-full bg-zinc-600 rounded-xl p-3 flex gap-2 items-center">
                    <FaLock className="fill-green-600" />

                    <h2 className="opacity-80">https://chat.wipzee.com/{slug}</h2>
                </div>
            </div>
        </div>
    )
};