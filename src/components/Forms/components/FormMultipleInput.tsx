import { ReactElement, useState } from "react"
import { ToggleComponent } from "../../Toggle/Toggle"

interface FormMultipleInput {
    children: ReactElement[],
    optional?: {
        active: boolean,
        text: string
    }
}

export function FormMultipleInput({ children, optional }: FormMultipleInput) {
    const [display, setDisplay] = useState(optional ? false : true);
    const chat = JSON.parse(localStorage.getItem("chat") || "{}")

    const handleActiveCTA = (prop: any) => {
        return new Promise((resolve) => {
            if (prop === false) {
                children.forEach((child)=>{
                    if(children.find(child => child.props.field_name === "button_text")){
                        chat["call_to_action"].forEach((action: any) => action[child.props.field_name] = "")
                        localStorage.setItem("chat", JSON.stringify(chat))
                    }
                })
                setDisplay(false)
            }
            else setDisplay(true)
            resolve(true)
        }) as Promise<boolean>
    }

    return (
        <div className="flex flex-col gap-4">

            <h2
                data-status={optional?.active}
                className="data-[status='true']:flex hidden gap-4"
            >
                {optional?.text}
                <ToggleComponent
                    cb={handleActiveCTA}
                />
            </h2>

            <div
                data-display={display}
                className="data-[display='false']:hidden flex justify-between items-center gap-8"
            >
                {children}
            </div>
        </div>
    )
};