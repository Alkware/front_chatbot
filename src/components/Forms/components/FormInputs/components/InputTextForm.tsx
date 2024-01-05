import { RefObject, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { RegisterDataLocalStorage } from "../../../../../functions/RegisterDataLocalStorage";

interface InputProjectNameTypes {
    field_name: string,
    defaultValue?: string,
    title: string,
    onChange?: (e: any) => void
}


export function InputTextForm({ field_name, defaultValue, title, onChange }: InputProjectNameTypes) {
    const [searchParams, setSearchParams] = useSearchParams();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);


    useEffect(() => {
        if (containerRef.current) {
            const label = containerRef.current.querySelector("label");
            const inputElement = containerRef.current.querySelector("input");

            if (inputElement && label && inputElement.value.length > 0) {
                label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
                label.classList.add("top-0", "-translate-y-3/4", "bg-primary-100", "shadow")
            }
        }
    }, []);

    const handleClickedInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
        label.classList.add("top-0", "-translate-y-3/4", "bg-primary-100", "shadow")

        input.focus();
    }

    const handleExitInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        if (input.value.length <= 0) {
            label.classList.add("top-0", "opacity-50", "cursor-text", "py-2")
            label.classList.remove("top-0", "-translate-y-3/4", "bg-primary-100",  "shadow")
        }
    }

    return (
        <div
            className="w-full flex flex-col gap-2 my-8 relative "
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                htmlFor={field_name}
                className="px-2 py-2 absolute top-0 transition-transform opacity-50 cursor-text rounded-xl"
            >{title}</label>

            <input
                type="text"
                data-field_name={field_name}
                name={field_name}
                onChange={(e) => {
                    RegisterDataLocalStorage(searchParams, setSearchParams, e.target)
                    onChange && onChange(e)
                }}
                defaultValue={defaultValue || ""}
                className="border border-primary-100"
            />

        </div>
    )
};