import { RefObject, useRef } from "react"
import { ContactName } from "./components/ContactName/ContactName";
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { Bio } from "./components/Bio/Bio";
import { Messages } from "./components/Messages/Messages";

interface SimulatorChat {
    active: boolean | undefined,
}

export function SimulatorChat({ active }: SimulatorChat) {
    const refContentBio: RefObject<HTMLDivElement> = useRef(null);
    
    const handleDisplayContentBio = () => {
        const content = refContentBio.current
        if (content) {
            const isActive = content.dataset.active;
            if (isActive === "true") content.dataset.active = "false"
            else content.dataset.active = "true"
        }
    }

    return (
        active &&
        <div className="w-1/4 min-w-[300px] max-h-[500px] bg-light rounded-xl overflow-hidden relative">

            <div
                className="w-full h-[60px] bg-green-500 flex cursor-pointer"
                onClick={handleDisplayContentBio}
            >

                <ProfileAvatar />

                <ContactName />

                <Bio 
                    ref={refContentBio}
                />
            </div>

            <div className="w-full h-[400px] flex flex-col gap-1 py-4 px-2">
                <Messages />
            </div>

        </div>
    )
};