import React from "react";
import { UseFieldArrayUpdate } from "react-hook-form";
import { MdRemove } from "react-icons/md";


interface FormMultipleInputs {
    children: any;
    fields: any[];
    update: UseFieldArrayUpdate<any, any>;
    remove: (index: number) => void;
    titleParameter: string
}

export function FormMultipleInputs({ children, fields, update, remove, titleParameter }: FormMultipleInputs) {
    const elements = React.Children.toArray(children)

    const handleEdition = (index: number) => {
        const lastIndex = fields.length - 1
        if (fields[lastIndex][titleParameter]) {
            const dataLastField = fields[lastIndex];
            const currentField = fields[index];
            update(index, dataLastField)
            update(lastIndex, currentField)
        } else remove(lastIndex)
    }

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            {
                elements.map((child, index) =>
                    index < (elements.length - 1) ?
                        <div className="flex gap-4">
                            <div
                                tabIndex={index}
                                className="min-w-32 bg-primary-100 rounded-md flex justify-between items-center cursor-pointer relative p-1"
                                onClick={() => handleEdition(index)}
                                key={index}
                            >
                                <p className="px-4">
                                    {fields[index][titleParameter]}
                                </p>

                            </div>
                            <MdRemove
                                className="fill-dark rounded-full bg-red-500 mx-1"
                                onClick={() => remove(index)}
                            />
                        </div>
                        :
                        <div key={index} className="w-full">
                            {
                                child
                            }
                        </div>
                )
            }
            {

            }
        </div>
    )
};