import { RefObject, useEffect, useRef, useState } from "react";
import { Bio } from "./components/Bio/Bio";
import { ContactName } from "./components/ContactName/ContactName";
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { useFormContext } from "react-hook-form";
import { LinkedImage } from "../../../../../@types/images.types";
import { getImagesById } from "../../../../../api/images";

export function HeaderSimulator() {
    const refContentBio: RefObject<HTMLDivElement> = useRef(null);
    const [primaryColor, setPrimaryColor] = useState();
    const [logo, setLogo] = useState<LinkedImage>();
    const { watch } = useFormContext();

    useEffect(() => {
        const primaryColorData = watch("chat_appearance.primary_color")
        primaryColorData && (setPrimaryColor(primaryColorData));

        (async () => {
            const id = watch("logo_id")
            if (!id) return;
            const image = await getImagesById(id);
            if (image) setLogo(image);
        })();
    }, [watch("logo_id"), watch("chat_appearance")])


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
            data-iscolor={primaryColor ? true : false}
            className="w-full h-[60px] flex cursor-pointer rounded-t-xl data-[iscolor=false]:bg-primary-100"
            style={{ background: primaryColor }}
            onClick={handleDisplayContentBio}
        >

            <ProfileAvatar
                logo={logo}
            />

            <ContactName />

            <Bio
                logo={logo}
                ref={refContentBio}
            />
        </div>
    )
};