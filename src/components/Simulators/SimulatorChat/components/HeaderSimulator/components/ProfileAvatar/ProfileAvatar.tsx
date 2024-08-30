import { Image } from "../../../../../../../@types/images.types";

interface ProfileAvatar {
    logo: Image | undefined,
}

export function ProfileAvatar({ logo }: ProfileAvatar) {

    return (
        <div className="w-1/5 h-full flex justify-center items-center">
            <img
                data-islogo={!!logo}
                src={logo?.url || "https://via.placeholder.com/100"}
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

