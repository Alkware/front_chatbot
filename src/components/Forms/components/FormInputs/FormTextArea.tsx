import { RefObject, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { registerDataLocalStorage } from "../../../../functions/registerDataLocalStorage";

interface FormTextArea {
    fieldName: string,
    title: string,
    height: number,
    defaultValue?: string,
    formName?: string
}

export function FormTextArea({ fieldName, formName, title, height, defaultValue }: FormTextArea) {
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        if (containerRef.current) {
            const label = containerRef.current.querySelector("label");
            const textarea = containerRef.current.querySelector("textarea");
            if (label && textarea && textarea.value.length > 0) {
                label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
                label.classList.add("top-0", "-translate-y-3/4", "bg-primary-100", "shadow")
            }
        }
    }, [])

    const handleClickedInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const textarea: HTMLTextAreaElement = currentTarget.querySelector("textarea");

        label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
        label.classList.add("top-0", "-translate-y-3/4", "bg-primary-100", "shadow")

        textarea.focus();
    }

    const handleExitInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const textarea: HTMLTextAreaElement = currentTarget.querySelector("textarea");

        if (textarea && textarea.value.length <= 0) {
            label.classList.add("top-0", "opacity-50", "cursor-text", "py-2")
            label.classList.remove("top-0", "-translate-y-3/4", "bg-primary-100", "shadow")

        }
    }

    const handleOnChange = (e: any) => {
        const actions = searchParams.get("actions") || "0"
        const increaseCharacter = Number(actions) + 1
        searchParams.set("actions", increaseCharacter.toString())
        setSearchParams(searchParams)
        registerDataLocalStorage(e.target, formName)
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
                className={`${title ? "block" : "hidden"} px-2 py-2 absolute top-0 transition-transform opacity-50 cursor-text rounded-xl`}
            >{title}</label>

            <textarea
                style={{ height }}
                name={fieldName}
                data-field_name={fieldName}
                className="border border-primary-100"
                onChange={handleOnChange}
                defaultValue={defaultValue ? defaultValue : ""}
            ></textarea>
        </div>
    )
};