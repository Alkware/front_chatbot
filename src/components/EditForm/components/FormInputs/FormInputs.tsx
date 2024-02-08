import { ChangeEvent, RefObject, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

interface FormInput {
    fieldName: string;
    title: string;
    formName?: string;
    defaultValue?: string;
    type?: "email" | "tel" | "text" | "number" | "time"; 
}

export function FormInput({ fieldName, title, formName, defaultValue,  type = "text"}: FormInput) {
    const [searchParams, setSearchParams] = useSearchParams();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const sizeLetter = 10;
    const averageInputSize = 500
    const inputWidth = (containerRef.current?.querySelector("input")?.clientWidth || averageInputSize) / sizeLetter;

    useEffect(() => {
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
            className="w-full flex flex-col gap-2 my-4 relative"
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                htmlFor={fieldName}
                data-isbigtitle={title.length >= inputWidth ? true : false}
                className="data-[isbigtitle=true]:w-full data-[isbigtitle=true]:text-center whitespace-nowrap text-ellipsis overflow-hidden px-2 py-2 absolute top-0 transition-transform opacity-50 cursor-text rounded-md "
            >{title}</label>

            <input
                type={type}
                name={fieldName}
                data-field_name={fieldName}
                className="border border-primary-100"
                onChange={handleOnChange}
                defaultValue={defaultValue ? defaultValue : ""}
            />

            <span
                className="hidden bg-red-500/30 text-red-500 text-center rounded-md"
                datatype="error-message"
            >Esse campo não pode estar vazio</span>
        </div>
    )
};