import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form";

export function FirstMessage() {
    const [firstMessage, setFirstMessage] = useState();
    const { watch } = useFormContext();

    useEffect(()=>{
        let firstMessage = watch("chat_input_message.0")
        setFirstMessage(firstMessage)
    }, [watch()])

    return <p className="w-full">{firstMessage}</p>
    
};