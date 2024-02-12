import { ForwardedRef, forwardRef, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form";
import { FaX } from "react-icons/fa6";
import { BioDescribe } from "./components/BioDescribe";

export const Bio = forwardRef(({}, ref: ForwardedRef<HTMLDivElement>) => {
    const [logo, setLogo] = useState<any>();
    const { watch } = useFormContext();

    useEffect(() => {
        const logo = watch("step_0.logo")
        if(logo) setLogo(logo)
    }, [watch()])

    return (
        <div
            ref={ref}
            data-active={false}
            className="data-[active='false']:hidden absolute top-0 w-full h-1/2 bg-light border-b border-black"
        >
            <div className="w-full p-3">
                <FaX
                    className="fill-primary-100 cursor-pointer"
                />
            </div>

            <div className="w-full flex justify-center items-center">
                <img
                    src={logo}
                    alt=""
                    className="w-[80px] h-[80px] object-cover rounded-full"
                />
            </div>

            <BioDescribe />

        </div>
    )
});