import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form";

export function FirstMessage() {
    const [firstMessage, setFirstMessage] = useState();
    const { watch } = useFormContext();

    useEffect(()=>{
        let firstMessage = watch("step_0.chat_input_message")
        setFirstMessage(firstMessage)
    }, [watch()])

    return <p className="w-full">{firstMessage}</p>
    
};