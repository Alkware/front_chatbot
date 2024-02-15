import { RefObject, TextareaHTMLAttributes, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { MdHelpOutline } from "react-icons/md";

interface FormTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    title: string;
    name: string;
    height?: number;
    help?: string;
}

export function FormTextArea({ title, height = 100, help, ...props }: FormTextArea) {
    const { register } = useFormContext();
    const containerRef: RefObject<HTMLDivElement> = useRef(null);


    useEffect(() => {
        if (containerRef.current) {
            const label = containerRef.current.querySelector("label");
            const textLabel = label?.querySelector("span");
            const svgHelp = label?.querySelector("svg#svg-help");
            const textarea = containerRef.current.querySelector("textarea");
            if (label && textarea && textarea.value.length > 0) {
                label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
                label.classList.add("top-0", "-translate-y-3/4")
                textLabel?.classList.add("bg-primary-100", "shadow");
                !!help && (svgHelp?.classList.remove("hidden"))
            }
        }
    }, [])

    const handleClickedInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const textLabel = label?.querySelector("span");
        const svgHelp = label?.querySelector("svg#svg-help");
        const textarea: HTMLTextAreaElement = currentTarget.querySelector("textarea");

        label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
        label.classList.add("top-0", "-translate-y-3/4")
        textLabel?.classList.add("bg-primary-100", "shadow");
        !!help && (svgHelp?.classList.remove("hidden"))


        textarea.focus();
    }

    const handleExitInput = ({ currentTarget }: any) => {
        const label: HTMLLabelElement = currentTarget.querySelector("label");
        const textLabel = label?.querySelector("span");
        const svgHelp = label?.querySelector("svg#svg-help");
        const textarea: HTMLTextAreaElement = currentTarget.querySelector("textarea");

        if (textarea && textarea.value.length <= 0) {
            label.classList.add("top-0", "opacity-50", "cursor-text", "py-2")
            label.classList.remove("top-0", "-translate-y-3/4")
            textLabel?.classList.remove("bg-primary-100", "shadow");
            svgHelp?.classList.add("hidden")
        }
    }


    return (
        <div
            className="w-full flex flex-col gap-2 relative"
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                className={`${title ? "block" : "hidden"} py-2 absolute top-0 transition-transform opacity-50 cursor-text flex gap-2 items-center`}
            >
                <span className="w-full rounded-xl px-2">{title}</span>

                <div className=" cursor-help group">
                    <MdHelpOutline
                        data-ishelp={help ? true : false}
                        id="svg-help"
                        className="hidden fill-primary-100"
                    />

                    <span className="group-hover:block hidden absolute -top-full bg-primary-200 w-[300px] rounded-md p-1 text-center">
                        {help}</span>
                </div>
            </label>

            <textarea
                style={{ height }}
                className="border border-primary-100"
                {...register(props.name)}
            ></textarea>
        </div>
    )
};