import { RefObject, TextareaHTMLAttributes, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface FormTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    title: string;
    name: string;
    height?: number;
}

export function FormTextArea({ title, height = 100, ...props }: FormTextArea) {
    const { register } = useFormContext();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);


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


    return (
        <div
            className="w-full flex flex-col gap-2 my-4 relative"
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                className={`${title ? "block" : "hidden"} px-2 py-2 absolute top-0 transition-transform opacity-50 cursor-text rounded-xl`}
            >{title}</label>

            <textarea
                style={{ height }}
                className="border border-primary-100"
                {...register(props.name)}
            ></textarea>
        </div>
    )
};