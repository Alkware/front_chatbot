import { RefObject, TextareaHTMLAttributes, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { TextArea } from "../../../TextArea/TextArea";

interface FormTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    title: string;
    name: string;
    size?: "SMALL" | "BIG";
    help?: string;
    limitText?: number;

}

export function FormTextArea({ title, size = "SMALL", help, limitText, ...props }: FormTextArea) {
    const { register } = useFormContext();
    const spanLimitTextRef: RefObject<HTMLSpanElement> = useRef(null);
    const limitCaracteres = limitText ? limitText : 999999;

    const handleOnChange = (e: any) => {
        if (e.target.value.length <= limitCaracteres) {
            //Atualiza a quantidade de string que já foi usada, caso tenha sido definido um limite de string;
            if (spanLimitTextRef.current) spanLimitTextRef.current.textContent = (limitCaracteres - e.target.value.length).toString();

            // Executa função onChange passada no Form Input.
            props.onChange && (props.onChange(e));
        } else {
            e.target.value = e.target.value.substring(0, limitCaracteres);

        }
    }

    return (
        <TextArea
            title={title}
            data-isbig={size === "BIG" ? true : false}
            className="border border-primary-100 h-[80px] lg:h-[100px] data-[isbig=true]:h-[150px] bg-light dark:bg-gray_light text-dark dark:text-light"
            register={register}
            onChange={handleOnChange}
            {...props}
        />
    )
};