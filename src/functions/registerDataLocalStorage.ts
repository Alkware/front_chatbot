import { CHAT_NAME_TO_SAVE_LOCALSTORAGE } from "../variables/variables"

type Target = {
    dataset: {
        field_name: string
    },
    value: string
}

export function registerDataLocalStorage(target: Target) {
    const chat = JSON.parse(localStorage.getItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE) || "{}")

    if (target) {
        const fieldName = target.dataset.field_name

        Object.keys(chat).forEach((_, index) => {
            if (fieldName in chat[index]) {
                chat[index][fieldName] = target.value
            }
        })

    }


    localStorage.setItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(chat))
}