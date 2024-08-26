import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form";
import { getImagesById } from "../../../../../../../api/images";
import { Image } from "../../../../../../../@types/images.types";

export function ProfileAvatar() {
    const [logo, setLogo] = useState<Image>();
    const { watch } = useFormContext();

    useEffect(() => {
        (async () => {
            const id = watch("step_0.logo_id")
            if (!id) return;
            const image = await getImagesById(id);
            if (image) setLogo(image);
        })();
    }, [watch("step_0.logo")])

    return (
        <div className="w-1/5 h-full flex justify-center items-center">
            <img
                data-islogo={!!logo}
                src={logo?.image.url || ""}
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

