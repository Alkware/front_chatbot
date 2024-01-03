import { ElementType } from "react";

interface Select {
    title?: string,
    alternativeTitle?: string,
    Icon?: ElementType,
    options: Array<{
        id: string,
        name: string,
    }>,
    onChange: (target: any) => void,
}

export function Select({ options, onChange, alternativeTitle, title, Icon }: Select) {

    return (
        <div className="w-full px-2 h-full bg-gray border border-primary-100 font-bold rounded-lg flex gap-2 justify-center items-center">
            {Icon && <Icon className="text-2xl" />}
            <select
                className="h-full bg-gray cursor-pointer outline-none "
                disabled={options.length ? false : true}
                defaultValue={"#"}
                onChange={onChange}
            >
                {
                    (title && alternativeTitle) &&
                    <option disabled value="#" className="cursor-pointer">
                        {
                            options.length ? title : alternativeTitle
                        }
                    </option>
                }
                {
                    options.map((opt, index) =>
                        <option
                            key={index}
                            value={opt.id}
                            className="cursor-pointer"
                        >
                            {opt.name}
                        </option>
                    )
                }
            </select>
        </div>
    )
};