import { RefObject, TextareaHTMLAttributes, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { MdHelpOutline } from "react-icons/md";
import { FORM_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";

interface FormTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    title: string;
    name: string;
    size?: "SMALL" | "BIG";
    help?: string;
    limitText?: number;

}

export function FormTextArea({ title, size = "SMALL", help, limitText, ...props }: FormTextArea) {
    const { register } = useFormContext();
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

    const handleOnChange = (e: any) => {
        if (e.target.value.length <= limitCaracteres) {
            //Atualiza a quantidade de string que já foi usada, caso tenha sido definido um limite de string;
            if(spanLimitTextRef.current) spanLimitTextRef.current.textContent = (limitCaracteres - e.target.value.length).toString();
            
            // Registra os dados no localStorage.
            const databaseData = JSON.parse(localStorage.getItem(FORM_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
            const fieldNameArray = e.target.name.split(".");
            const lastIndex = (fieldNameArray.length - 1)
            const fieldName = /\d/.test(fieldNameArray[lastIndex]) ? fieldNameArray[fieldNameArray.length - 2] : fieldNameArray[fieldNameArray.length - 1];
            const value = e.target.value;
            databaseData[fieldName] = value
            localStorage.setItem(FORM_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(databaseData))
            // Executa função onChange passada no Form Input.
            props.onChange && (props.onChange(e));
        } else {
            e.target.value = e.target.value.substring(0, limitCaracteres);

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

            <textarea
                data-isbig={size === "BIG" ? true : false}
                className="border border-primary-100 h-[80px] lg:h-[100px] data-[isbig=true]:h-[150px] bg-light dark:bg-gray_light text-dark dark:text-light"
                {...register(props.name, { onChange: handleOnChange })}
            >
            </textarea>
            <span
                ref={spanLimitTextRef}
                data-islimittext={!!limitText}
                className="absolute bottom-0 right-1 data-[islimittext=false]:hidden"
            >{limitCaracteres}</span>
        </div>
    )
};