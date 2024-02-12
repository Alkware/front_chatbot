import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form";

export function ProfileAvatar() {
    const [logo, setLogo] = useState<any>();
    const { watch } = useFormContext();

    useEffect(() => {
        const logo_url = watch("step_0.logo")
        if (logo_url) setLogo(logo_url)
    }, [watch()])

    return (
        <div className="w-1/5 h-full flex justify-center items-center">
            <img
                data-islogo={!!logo}
                src={logo || ""}
                alt=""
                className="w-[40px] h-[40px] object-cover rounded-full data-[islogo='true']:block hidden"
            />
            <div
                data-islogo={!!logo}
                className="w-[40px] h-[40px] object-cover rounded-full data-[islogo='true']:hidden flex flex-col justify-center items-center text-green-900 overflow-hidden text-[8px] bg-white"
            ><span>sem</span><span>imagem</span></div>
        </div>
    )
};

