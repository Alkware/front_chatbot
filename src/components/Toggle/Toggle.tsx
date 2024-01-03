import { useState } from "react"

interface ToggleComponent {
    isActive?: boolean
    cb?: (prop: any)=> Promise<boolean> | (()=> boolean);
}

export function ToggleComponent({ isActive = false, cb }: ToggleComponent) {
    const [active, setActive] = useState(isActive);

    const handleClickToggle = async ()=>{
        if(cb) {if(!await cb(!active)) return}
        setActive(v => !v)
    }

    return (
        <div
            data-active={active}
            onClick={handleClickToggle}
            className="w-[50px] h-[25px] p-[3px] data-[active=true]:bg-green-500 bg-red-500 rounded-xl flex data-[active=true]:flex-row-reverse transition-all duration-500 justify-between"
        >
            <div className="w-[60%] h-full flex justify-center items-center text-xs font-bold">
                {active ? "on" : "off"}
            </div>
            <div className="w-[40%] h-full rounded-full bg-gray"></div>
        </div>
    )
};