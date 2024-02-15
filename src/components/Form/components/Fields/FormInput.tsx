import { InputHTMLAttributes, RefObject, useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    title: string;
    joinAtInput?: string;
}

export function FormInput({ title, joinAtInput, ...props }: FormInput) {
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
            className="w-full flex flex-col gap-2 relative border border-primary-100 rounded-md"
            ref={containerRef}
            onClick={handleClickedInput}
            onBlur={handleExitInput}
        >
            <label
                data-isbigtitle={title.length >= inputWidth ? true : false}
                className="data-[isbigtitle=true]:w-full whitespace-nowrap text-ellipsis overflow-hidden px-2 py-2 absolute top-0 transition-transform opacity-50 cursor-text rounded-md "
            >{title}</label>

            <div className="h-full flex gap-2 justify-center items-center bg-gray_light px-2">
                <input
                    {...register(props.name, { onChange: props.onChange })}
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