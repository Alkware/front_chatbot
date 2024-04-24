import { ElementType } from "react";

interface Select {
    title?: string,
    alternativeTitle?: string,
    Icon?: ElementType,
    options: Array<{
        id: string,
        name: string,
    }>,
    handleSelectDatabase: ({ target }: any)=> void,
    defaultValue?: string
}

export function Select({ options, alternativeTitle, title, Icon, defaultValue, handleSelectDatabase }: Select) {

    return (
        <div className="w-full px-2 h-full bg-light dark:bg-gray border border-primary-100 font-bold rounded-lg flex gap-2 justify-center items-center">
            {Icon && <Icon className="text-2xl fill-primary-100 dark:fill-light" />}
            <select
                className="h-full bg-light dark:bg-gray text-primary-100 dark:text-light cursor-pointer outline-none "
                disabled={options.length ? false : true}
                onChange={handleSelectDatabase}
                defaultValue={defaultValue ? defaultValue : "#"}
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