interface InputProjectNameTypes {
    register: any;
    errors: any;
    field_name: string,
    placeholder: string;
    title: string,
    onKeyDown?: (e: any)=> void
}


export function InputTextForm({ register, errors, field_name, placeholder, title, onKeyDown }: InputProjectNameTypes) {
    return (
        <div className="w-full flex flex-col gap-2 my-4">
            <label
                htmlFor={field_name}
                className="px-2"
            >{title}</label>
            <input
                type="text"
                placeholder={placeholder}
                data-type={field_name}
                name={field_name}
                onKeyDown={onKeyDown}
                {...register(field_name)}
            />
            <p>{errors[field_name]?.message}</p>
        </div>
    )
};