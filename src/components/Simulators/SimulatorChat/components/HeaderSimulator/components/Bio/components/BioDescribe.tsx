import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form";

export function BioDescribe() {
    const [describe, setDescribe] = useState();
    const { watch } = useFormContext();

    useEffect(()=>{
        const describeData = watch("step_0.bio");
        describeData && setDescribe(describeData)
    }, [watch()])

    return (
        <div className="w-full py-8 flex justify-center items-center">
            <p className="w-4/5 text-center text-zinc-800">{describe}</p>
        </div>
    )
};