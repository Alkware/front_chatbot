import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaArrowRight, FaCircleNotch, FaLock } from "react-icons/fa";

interface SimulatorSlugUrl {
    previousSlug: string
}

export function SimulatorSlugUrl() {
    const { watch } = useFormContext();
    const [slug, setSlug] = useState();

    useEffect(() => {
        const slugData = watch("slug");
        setSlug(slugData?.replaceAll(" ", "-"))
    }, [watch()])

    return (
        <div className="w-full md:w-full flex gap-2 items-center bg-white p-2 my-4 rounded-md">
            <FaArrowLeft className="fill-zinc-600" />
            <FaArrowRight className="fill-zinc-600" />
            <FaCircleNotch className="fill-zinc-600" />
            <div className="w-4/5 md:w-full bg-zinc-600 rounded-xl p-3 flex gap-2 items-center">
                <FaLock className="fill-green-600" />
                <h2 className="w-[90%] md:w-full overflow-hidden whitespace-nowrap text-ellipsis text-sm xl:text-base opacity-80">https://chat.wipzee.com/{slug}</h2>
            </div>
        </div>
    )
};