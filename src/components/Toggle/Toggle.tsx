import { useEffect, useState } from "react"

interface ToggleComponent {
    isActive?: boolean
    cb?: (prop: any) => Promise<boolean>,
    template: "yesNo" | "onOff" | "empty"
}

export function ToggleComponent({ isActive, cb, template }: ToggleComponent) {
    const [active, setActive] = useState<boolean>(!!isActive);

    const text = template === "yesNo" ? (
        { positive: "sim", negative: "não" }
    ) : template === "onOff" ? (
        { positive: "on", negative: "off" }
    ) : (
        { positive: "", negative: "" }
    )

    useEffect(() => {
        setActive(!!isActive);
    }, [isActive]);

    const handleClickToggle = async () => {
        if (cb) {
            if (!await cb(!active)) return
        }
        setActive(v => !v)
    }

    return (
        <div
            data-active={!!active}
            onClick={handleClickToggle}
            className="w-[50px] h-[25px] p-[3px] cursor-pointer data-[active=true]:bg-green-500 bg-red-500 rounded-xl flex data-[active=true]:flex-row-reverse transition-all duration-500 justify-between"
        >
            <div className="w-[60px] h-full flex justify-center items-center text-xs font-bold">
                {!!active ? text.positive : text.negative}
            </div>
            <div className="w-[40px] h-full rounded-full bg-gray"></div>
        </div>
    )
};