import { useFormContext } from "react-hook-form"

interface FormCheckBox {
    name: string;
    title: string;
}

export function FormCheckBox({ name, title }: FormCheckBox) {
    const { register } = useFormContext();

    return (
        <div className="w-full flex justify-start items-start">
            <input
                className="w-[10%] bg-blue-500 cursor-pointer"
                type="checkbox"
                {...register(name)}
            />
            <h2
                className="w-[90%] text-sm"
                dangerouslySetInnerHTML={{ __html: title }}
            ></h2>
        </div>
    )
};