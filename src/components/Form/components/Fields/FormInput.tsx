import { InputHTMLAttributes, MouseEvent, RefObject, useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"
import { FORM_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";
import { twMerge } from "tailwind-merge";

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    title: string;
    mask?: (e: MouseEvent<HTMLInputElement, MouseEvent>) => void;
    widthContainer?: string;
    joinAtInput?: string;
}

export function FormInput({ title, joinAtInput, widthContainer, mask, ...props }: FormInput) {
    const { register } = useFormContext();
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

    const handleOnChange = (e: any) => {
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
        // Executa função Mask caso ela seja passada no formInput.
        mask && mask(e)
    }

    return (
        <div
            className={twMerge("w-full flex flex-col gap-2 relative border border-primary-light dark:border-primary-100 rounded-md", widthContainer)}
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                data-isbigtitle={title.length >= inputWidth ? true : false}
                className="data-[isbigtitle=true]:w-full whitespace-nowrap text-ellipsis text-dark dark:text-light overflow-hidden px-2 py-2 absolute top-0 transition-transform opacity-50 cursor-text rounded-md text-sm md:text-base"
            >{title}</label>

            <div className="h-full flex gap-2 justify-center items-center bg-light dark:bg-gray_light rounded-md px-2">
                <input
                    className=" bg-light dark:bg-gray_light text-dark dark:text-light"
                    {...register(props.name, { onChange: handleOnChange })}
                    {...props}
                />
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