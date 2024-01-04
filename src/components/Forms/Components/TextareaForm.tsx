import { RefObject, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { RegisterDataLocalStorage } from "../../../functions/RegisterDataLocalStorage";

interface InputProjectNameTypes {
    field_name: string,
    defaultValue?: string,
    title: string
    height: number
}


export function TextareaForm({ field_name, title, height, defaultValue }: InputProjectNameTypes) {
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        if (containerRef.current) {
            const label = containerRef.current.querySelector("label");
            const textarea = containerRef.current.querySelector("textarea");
            if (label && textarea && textarea.value.length > 0) {
                label.classList.remove("top-1/2", "-translate-y-1/2", "opacity-50", "cursor-text")
                label.classList.add("top-0", "-translate-y-full")
            }
        }
    }, [])

    const handleClickedInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const textarea: HTMLTextAreaElement = currentTarget.querySelector("textarea");

        label.classList.remove("top-1/2", "-translate-y-1/2", "opacity-50", "cursor-text")
        label.classList.add("top-0", "-translate-y-full")

        textarea.focus();
    }

    const handleExitInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const textarea: HTMLTextAreaElement = currentTarget.querySelector("textarea");

        if (textarea && textarea.value.length <= 0) {
            label.classList.add("top-0", "opacity-50", "cursor-text")
            label.classList.remove("top-0", "-translate-y-full")
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
                htmlFor={field_name}
                className={`px-2 ${title ? "block" : "hidden"} py-2 absolute top-0 transition-all duration-300 opacity-50 cursor-text`}
            >{title}</label>
            
            <textarea
                style={{ height }}
                data-field_name={field_name}
                name={field_name}
                defaultValue={defaultValue || ""}
                onChange={({ target })=> RegisterDataLocalStorage(searchParams, setSearchParams , target)}
                className="border border-primary-100"
            ></textarea>
        </div>
    )
};