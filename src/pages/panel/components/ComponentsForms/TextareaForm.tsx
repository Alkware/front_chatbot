interface InputProjectNameTypes {
    register: any;
    errors: any;
    field_name: string,
    placeholder: string;
    title: string
    height: number
}


export function TextareaForm({ register, errors, field_name, placeholder, title, height }: InputProjectNameTypes) {
    return (
        <div className="w-full flex flex-col gap-2 my-4">
            <label
                htmlFor={field_name}
                className="px-2"
            >{title}</label>
            <textarea
                style={{ height }}
                placeholder={placeholder}
                data-type={field_name}
                name={field_name}
                {...register(field_name)}
            ></textarea>
            <p>{errors[field_name]?.message}</p>
        </div>
    )
};