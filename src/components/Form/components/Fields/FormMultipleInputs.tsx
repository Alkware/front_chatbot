import React from "react";
import { MdRemove } from "react-icons/md";

interface FormMultipleInputs {
    children: any;
    fields: any[];
    remove: (index: number) => void;
    titleParameter: string
}

export function FormMultipleInputs({ children, fields, remove, titleParameter }: FormMultipleInputs) {
    const elements = React.Children.toArray(children)

    return (
        <div className="w-full flex flex-wrap items-start justify-center gap-4">
            {
                elements.map((child, index) =>
                    index < (elements.length - 1) ?
                    <div 
                        className="min-w-32 bg-primary-100 rounded-md flex justify-between items-center cursor-pointer relative p-1"
                        key={index}
                    >
                        <p className="px-4">
                            {fields[index][titleParameter]}
                        </p>

                        <MdRemove
                            className="fill-dark rounded-full bg-red-500 mx-1"
                            onClick={() => remove(index)}
                        />
                    </div>
                    :
                    <div key={index}>
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