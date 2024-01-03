import { RefObject, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { RegisterDataLocalStorage } from "../../../functions/RegisterDataLocalStorage";

interface InputProjectNameTypes {
    field_name: string,
    title: string,
    onKeyDown?: (e: any) => void
}


export function InputTextForm({ field_name, title, onKeyDown }: InputProjectNameTypes) {
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const chat = JSON.parse(localStorage.getItem("createchat") || localStorage.getItem("createchat") || "{}")


    useEffect(() => {
        if (containerRef.current) {
            const labelElement = containerRef.current.querySelector("label");
            const inputElement = containerRef.current.querySelector("input");

            if (inputElement && labelElement && inputElement.value.length > 0) {
                labelElement.classList.remove("top-1/2", "-translate-y-1/2", "opacity-50", "cursor-text")
                labelElement.classList.add("top-0", "-translate-y-full")
            }
        }
    }, []);

    const handleClickedInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        label.classList.remove("top-1/2", "-translate-y-1/2", "opacity-50", "cursor-text")
        label.classList.add("top-0", "-translate-y-full")

        input.focus();
    }

    const handleExitInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        if (input.value.length <= 0) {
            label.classList.add("top-1/2", "-translate-y-1/2", "opacity-50", "cursor-text")
            label.classList.remove("top-0", "-translate-y-full")
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
                htmlFor={field_name}
                className="px-2 py-2 absolute top-1/2 -translate-y-1/2 transition-all duration-300 opacity-50 cursor-text"
            >{title}</label>

            <input
                type="text"
                data-field_name={field_name}
                name={field_name}
                onKeyDown={onKeyDown}
                onChange={({ target })=> RegisterDataLocalStorage(searchParams, setSearchParams , target)}
                defaultValue={chat[field_name] || ""}
            />

        </div>
    )
};