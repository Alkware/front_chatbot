import { RefObject, useEffect, useRef, useState } from "react";
import { Bio } from "./components/Bio/Bio";
import { ContactName } from "./components/ContactName/ContactName";
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { useFormContext } from "react-hook-form";

export function HeaderSimulator() {
    const refContentBio: RefObject<HTMLDivElement> = useRef(null);
    const [primaryColor , setPrimaryColor] = useState();
    const { watch } = useFormContext();

    useEffect(()=>{
        const primaryColorData =  watch("step_3.chat_appearence.primary_color")
        primaryColorData && ( setPrimaryColor(primaryColorData) )
    }, [watch()])


    const handleDisplayContentBio = () => {
        const content = refContentBio.current
        if (content) {
            const isActive = content.dataset.active;
            if (isActive === "true") content.dataset.active = "false"
            else content.dataset.active = "true"
        }
    }

    return (
        <div
            className="w-full h-[60px] flex cursor-pointer rounded-t-xl"
            style={{ background: primaryColor || "black" }}
            onClick={handleDisplayContentBio}
        >

            <ProfileAvatar />

            <ContactName />

            <Bio
                ref={refContentBio}
            />
        </div>
    )
};