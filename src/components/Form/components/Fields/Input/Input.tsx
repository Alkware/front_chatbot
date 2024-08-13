import { HTMLAttributes, HTMLInputTypeAttribute, MouseEvent, RefObject, useEffect, useRef } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Input extends HTMLAttributes<HTMLInputElement> {
    title: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    formContext?: UseFormReturn
    mask?: (e: MouseEvent<HTMLInputElement, MouseEvent>) => void;
    widthContainer?: string;
    joinAtInput?: string;
};

export function Input({ formContext, mask, widthContainer, joinAtInput, title, type, ...props }: Input) {
    const form = useFormContext() || formContext;
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
                label.classList.add("top-0", "-translate-y-1/2", "bg-primary-100", "text-sm", "text-light")
            }
        }
    }, []);

    const handleClickedInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
        label.classList.add("top-0", "-translate-y-1/2", "bg-primary-100", "text-sm", "text-light")

        input.focus();
    }

    const handleExitInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const input: HTMLInputElement = currentTarget.querySelector("input");

        if (input.value.length <= 0) {
            label.classList.add("top-0", "opacity-50", "cursor-text", "py-2")
            label.classList.remove("top-0", "-translate-y-1/2", "bg-primary-100", "text-sm", "text-light")
        }
    }

    const onChange = (e: any) => {
        (props.onChange && props.onChange(e));
        (mask && mask(e));
    }

    return (
        <div
            className={twMerge("w-full flex flex-col gap-2 relative border border-primary-100 rounded-md bg-primary-100/30 dark:bg-gray_light", widthContainer)}
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                data-isbigtitle={title.length >= inputWidth ? true : false}
                className="data-[isbigtitle=true]:w-full whitespace-nowrap text-ellipsis text-dark dark:text-light overflow-hidden px-2 py-2 absolute top-0 transition-transform opacity-50 cursor-text rounded-md text-sm md:text-base"
            >{title}</label>

            <div className="h-full flex gap-2 justify-center items-center rounded-md px-2">
                {
                    !!form ?
                        <input
                            type={type || "text"}
                            className=" bg-transparent text-dark dark:text-light"
                            {...props}
                            {...form.register(props.name, { onChange })}
                        />
                        :
                        <input
                            type={type || "text"}
                            className=" bg-transparent text-dark dark:text-light"
                            onChange={onChange}
                            {...props}
                        />
                }
                <span
                    data-isavailable={joinAtInput ? true : false}
                    className="data-[isavailable='false']:hidden"
                >
                    {joinAtInput}
                </span>
            </div>

        </div>
    )
};