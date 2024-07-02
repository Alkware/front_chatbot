import { createLog } from "../api/log";
import { ERROR_NAME_TO_SAVE_LOCALSTORAGE } from "../variables/variables";

type Event = {
    target: {
        name: string;
        value: string;
        closest: (param: string)=> any;
    }
}

export async function registerDataLocalStorage(e: Event) {
    const formData = JSON.parse(localStorage.getItem(ERROR_NAME_TO_SAVE_LOCALSTORAGE) || "{}")
    const step = e.target.closest("div[data-id='step']").dataset.index;

    if(step) {
        if(!formData[step]) formData[step] = {}
        formData[step][e.target.name] = e.target.value
    }
    else {
        await createLog({
            level: "warning",
            log: "A atual step não foi encontrado para registro no local storage",
            path: "src/functions/registerDataLocalStorage.ts Ln: 24",
            sector: "Plataforma"
        })
        throw new Error("Step not found.")
    }

    localStorage.setItem(ERROR_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(formData))
}