import { InputHTMLAttributes, RefObject, useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge";

interface FormInputColor extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    title: string;
    joinAtInput?: string;
    containerWidth?: string;
}

export function FormInputColor({ title, joinAtInput, containerWidth, ...props }: FormInputColor) {
    const { register, watch } = useFormContext();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);


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

    return (
        <div
            className={twMerge("w-full flex items-center gap-2 mt-8 relative", containerWidth)}
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                htmlFor={props.name}
                className="w-[50px] h-[50px] rounded-full mx-2 border-2 border-white cursor-pointer"
                style={{ background: watch(props.name) }}
            ></label>

            <input
                type="color"
                id={props.name}
                className="cursor-pointer w-0 h-0 p-0 absolute left-1/3 -top-full"
                {...register(props.name, { onChange: props.onChange })}
                {...props}
            />

        </div>

    )
};