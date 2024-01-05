const chatModel = {
    project_name: "",
    bio: "",
    logo: "",
    prompt_id: "",
    chat_input_message: ["Sua primeira mensagem"],
    call_to_action: [{ button_text: "", button_link: "" }]
}

export function RegisterDataLocalStorage(searchParams: any, setSearchParams: any, target: any) {
    const chat = JSON.parse(localStorage.getItem("chat") || JSON.stringify(chatModel))
    
    if (target) {
        const fieldName = target.dataset.field_name
        if (fieldName === "project_name") chat.project_name = target.value
        if (fieldName === "bio") chat.bio = target.value
        if (fieldName === "logo") chat.logo = target.value
        if (fieldName === "prompt_id") chat.prompt_id = target.value
        if (fieldName === "chat_input_message") chat.chat_input_message[0] = target.value
        if (fieldName === "button_text") chat.call_to_action[0].button_text = target.value
        if (fieldName === "button_link") chat.call_to_action[0].button_link = target.value
    }

    const actions = searchParams.get("actions") || "0"
    const increaseCharacter = Number(actions) + 1
    searchParams.set("actions", increaseCharacter)
    setSearchParams(searchParams)
    localStorage.setItem("chat", JSON.stringify(chat))
}