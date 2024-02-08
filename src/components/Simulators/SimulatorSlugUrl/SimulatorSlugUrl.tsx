import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaArrowRight, FaCircleNotch, FaLock } from "react-icons/fa";

interface SimulatorSlugUrl {
    previousSlug: string
}

export function SimulatorSlugUrl({ previousSlug }: SimulatorSlugUrl) {
    const { watch } = useFormContext();
    const [slug, setSlug] = useState();
    const slicePreviousSlug = previousSlug.includes("-") ? previousSlug.split("-")[0] : "";

    useEffect(() => {
        const slugData = watch("step_3.slug");
        setSlug(slugData.replaceAll(" ", "-"))
    }, [watch()])

    return (
        !!slicePreviousSlug &&
        <div className="w-full flex gap-2 items-center bg-white p-2 my-4 rounded-md">
            <FaArrowLeft className="fill-zinc-600" />
            <FaArrowRight className="fill-zinc-600" />
            <FaCircleNotch className="fill-zinc-600" />
            <div className="w-full bg-zinc-600 rounded-xl p-3 flex gap-2 items-center">
                <FaLock className="fill-green-600" />

                <h2 className="opacity-80">https://chat.wipzee.com/{slicePreviousSlug}-{slug}</h2>
            </div>
        </div>
    )
};