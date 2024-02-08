import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form";

export function FirstMessage() {
    const [firstMessage, setFirstMessage] = useState();
    const { watch } = useFormContext();

    useEffect(()=>{
        let firstMessage = watch("step_1.chat_input_message")
        setFirstMessage(firstMessage)
    }, [watch()])

    return <p>{firstMessage}</p>
    
};