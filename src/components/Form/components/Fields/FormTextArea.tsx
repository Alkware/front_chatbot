import { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { TextArea } from "./TextArea/TextArea";

interface FormTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    title: string;
    name: string;
    size?: "SMALL" | "BIG";
    help?: string;
    limitText?: number;

}

export function FormTextArea({ title, size = "SMALL", help, limitText, ...props }: FormTextArea) {
    const { register } = useFormContext();

    return (
        <TextArea
            title={title}
            data-isbig={size === "BIG" ? true : false}
            className="border border-primary-100 h-[80px] lg:h-[100px] data-[isbig=true]:h-[150px] bg-light dark:bg-gray_light text-dark dark:text-light"
            register={register}
            onChange={props.onChange}
            {...props}
        />
    )
};