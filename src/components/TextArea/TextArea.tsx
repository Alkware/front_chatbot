import { RefObject, TextareaHTMLAttributes, useEffect, useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { MdHelpOutline } from "react-icons/md";

interface TextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    title: string;
    name: string;
    size?: "SMALL" | "BIG";
    help?: string;
    limitText?: number;
    register?: UseFormRegister<any>;
}

export function TextArea({ title, limitText, size, help, register, ...props }: TextArea) {
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const spanLimitTextRef: RefObject<HTMLSpanElement> = useRef(null);
    const limitCaracteres = limitText ? limitText : 999999;

    useEffect(() => {
        if (containerRef.current) {
            const label = containerRef.current.querySelector("label");
            const textLabel = label?.querySelector("span");
            const svgHelp = label?.querySelector("svg#svg-help");
            const textarea = containerRef.current.querySelector("textarea");
            if (label && textarea && textarea.value.length > 0) {
                label.classList.remove("top-0", "opacity-50", "cursor-text", "py-2")
                label.classList.add("top-0", "-translate-y-3/4", "text-light")
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
        label.classList.add("top-0", "-translate-y-3/4", "text-light")
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
            label.classList.remove("top-0", "-translate-y-3/4", "text-light")
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
                className={`${title ? "block" : "hidden"} py-2 absolute top-0 transition-transform opacity-50 cursor-text flex gap-2 items-center text-sm md:text-base text-dark dark:text-light`}
            >
                <span className="w-full rounded-xl px-2">{title}</span>

                <div className="cursor-help group">
                    <MdHelpOutline
                        data-ishelp={help ? true : false}
                        id="svg-help"
                        className="hidden fill-primary-100"
                    />

                    <span className="group-hover:block hidden absolute -top-full bg-primary-200 w-[300px] rounded-md p-1 text-center">
                        {help}</span>
                </div>
            </label>

            {
                register ?
                    <textarea
                        data-isbig={size === "BIG" ? true : false}
                        className="border border-primary-100 h-[80px] lg:h-[100px] data-[isbig=true]:h-[150px] bg-light dark:bg-gray_light text-dark dark:text-light"
                        {...register(props.name, { onChange: props.onChange })}
                    />
                    :
                    <textarea
                        className=" bg-light dark:bg-gray_light text-dark dark:text-light"
                        onChange={props.onChange}
                        {...props}
                    />
            }

            <span
                ref={spanLimitTextRef}
                data-islimittext={!!limitText}
                className="absolute bottom-0 right-1 data-[islimittext=false]:hidden"
            >{limitCaracteres}</span>
        </div>
    )
};