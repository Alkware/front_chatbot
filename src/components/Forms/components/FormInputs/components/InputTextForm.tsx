import { RefObject, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { RegisterDataLocalStorage } from "../../../../../functions/RegisterDataLocalStorage";

interface InputProjectNameTypes {
    fieldName: string,
    title: string,
    onChange?: (e: any) => void,
    register?: any
}


export function InputTextForm({ fieldName, title, onChange, register }: InputProjectNameTypes) {
    const [searchParams, setSearchParams] = useSearchParams();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const label = containerRef.current.querySelector("label");
            const inputElement = containerRef.current.querySelector("input");

            if (inputElement && label && inputElement.value.length > 0) {
                label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
                label.classList.add("top-0", "-translate-y-1/2", "bg-primary-100","text-sm")
            }
        }
    }, []);

    const handleClickedInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
        label.classList.add("top-0", "-translate-y-1/2", "bg-primary-100","text-sm")

        input.focus();
    }

    const handleExitInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        if (input.value.length <= 0) {
            label.classList.add("top-0", "opacity-50", "cursor-text", "py-2")
            label.classList.remove("top-0", "-translate-y-1/2", "bg-primary-100","text-sm")
        }
    }

    const handleOnChange = (e: any)=>{
        const actions = searchParams.get("actions") || "0"
        const increaseCharacter = Number(actions) + 1
        searchParams.set("actions", increaseCharacter.toString())
        setSearchParams(searchParams)
        RegisterDataLocalStorage(e.target)
        onChange && onChange(e)
    }

    return (
        register &&
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
                onChange={handleOnChange}
                className="border border-primary-100"
                {...register(fieldName)}
            />

        </div>
    )
};