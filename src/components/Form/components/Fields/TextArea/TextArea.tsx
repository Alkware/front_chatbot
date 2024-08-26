import { ChangeEventHandler, RefObject, useEffect, useRef } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { MdHelpOutline } from "react-icons/md";

interface TextArea {
    title: string;
    name: string;
    size?: "SMALL" | "BIG";
    help?: string;
    maxText?: number;
    minText?: number;
    formContext?: UseFormReturn;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    defaultValue?: string;
}

export function TextArea({ title, maxText, minText, name, size, help, defaultValue, formContext, onChange }: TextArea) {
    const form = useFormContext() || formContext;
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const spanLimitTextRef: RefObject<HTMLSpanElement> = useRef(null);

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
    }, [defaultValue])

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

    // Lida com o limite do texto inserido pelo usuário...
    const handleLimitText = () => {
        const limitTextRef = spanLimitTextRef.current;
        const textarea = containerRef.current?.querySelector("textarea");
        if (limitTextRef && textarea) {
            const valueTextArea = textarea?.value.length;

            if (minText) {
                const calculation = -minText + valueTextArea;
                limitTextRef.textContent = (calculation).toString();
                (minText > valueTextArea) ?
                    limitTextRef.classList.add("text-red-500")
                    :
                    limitTextRef.classList.remove("text-red-500")
            }
            else if (maxText) {
                const calculation = maxText - valueTextArea;
                limitTextRef.textContent = (calculation).toString();
                (maxText > valueTextArea) ?
                    limitTextRef.classList.add("text-red-500")
                    :
                    limitTextRef.classList.remove("text-red-500")
            }

        }
    }

    const onChangeEvent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        handleLimitText();
        onChange && onChange(e);
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
                form ?
                    <textarea
                        data-isbig={size === "BIG" ? true : false}
                        className="border border-primary-100 h-[80px] lg:h-[100px] data-[isbig=true]:h-[150px] bg-light dark:bg-gray_light text-dark dark:text-light"
                        defaultValue={defaultValue}
                        {...form.register(name, { onChange: onChangeEvent })}
                    />
                    :
                    <textarea
                        name={name}
                        className=" bg-light dark:bg-gray_light text-dark dark:text-light"
                        defaultValue={defaultValue}
                        onChange={onChangeEvent}
                    />
            }

            <span
                ref={spanLimitTextRef}
                data-islimittext={!!maxText || !!minText}
                className="absolute bottom-0 right-1 data-[islimittext=false]:hidden"
            >{maxText || minText}</span>
        </div>
    )
};