import React from "react";
import { UseFieldArrayUpdate, useFormContext } from "react-hook-form";
import { MdDelete } from "react-icons/md";


interface FormMultipleInputs {
    children: any;
    name: string
    update: UseFieldArrayUpdate<any, any>;
    remove: (index: number) => void;
}

export function FormMultipleInputs({ children, update, remove, name }: FormMultipleInputs) {
    const { watch } = useFormContext();
    const elements = React.Children.toArray(children);
    const fields: [] = watch(name);

    const handleEdition = (index: number) => {
        const lastIndex = fields.length - 1;
        const keys = Object.keys(fields[lastIndex]);

        if (!!fields[lastIndex][keys[0]] && !!fields[lastIndex][keys[1]]) {
            const dataLastField = fields[lastIndex];
            const currentField = fields[index];
            update(index, dataLastField)
            update(lastIndex, currentField)
        } else remove(lastIndex)
    }

    return (
        <div className="w-full flex flex-col gap-8 md:gap-4 overflow-hidden">

            <div className="w-full flex gap-4 flex-wrap justify-center">
                {
                    !!fields && fields.map((field, index) => {
                        const keys = Object.keys(fields[fields.length - 1]);
                        return (
                            (index < (fields.length - 1)) &&
                            <div
                                key={index}
                                className="flex gap-0 items-center"
                            >
                                <div
                                    tabIndex={index}
                                    className="min-w-20 md:min-w-32 bg-primary-100 rounded-l-md flex flex-col justify-between items-center cursor-pointer relative p-1"
                                    onClick={() => handleEdition(index)}
                                >
                                    {
                                        keys.map((key, index) =>
                                            (key !== "id" && index < 2) &&
                                            <div 
                                                key={index}
                                                data-index={index}
                                                className="w-full flex justify-center flex-nowrap data-[index='0']:font-bold"
                                            >
                                                <p className="w-[200px] md:w-[300px] whitespace-nowrap text-ellipsis overflow-hidden px-4 text-center">
                                                    {field[key]}
                                                </p>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="h-full flex items-start py-2 bg-primary-100 rounded-r-md">
                                    <MdDelete
                                        className="rounded-full bg-red-200 fill-red-700 p-1 text-2xl mx-1 cursor-pointer"
                                        onClick={() => remove(index)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                elements.map((child, index) => {
                    return index >= (elements.length - 1) &&
                        <div key={index} className="w-full overflow-hidden">
                            {
                                child
                            }
                        </div>
                })
            }
        </div>
    )
};