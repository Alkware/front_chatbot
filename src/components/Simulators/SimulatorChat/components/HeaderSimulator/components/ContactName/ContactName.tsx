import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form"

export function ContactName() {
    const [contactName, setContactName] = useState<string>();
    const { watch } = useFormContext();

    useEffect(()=>{
        let name = watch("project_name");
        setContactName(name)
    }, [watch()])

    return (
        <div className="w-4/5 h-full flex items-center">
            <h2 className="text-light font-bold whitespace-nowrap text-ellipsis overflow-hidden">{contactName}</h2>
        </div>
    )
};