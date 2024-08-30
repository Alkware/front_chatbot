import { ForwardedRef, forwardRef } from "react"
import { FaX } from "react-icons/fa6";
import { BioDescribe } from "./components/BioDescribe";
import { Image } from "../../../../../../../@types/images.types";

interface Bio {
    logo: Image | undefined
}

export const Bio = forwardRef(({ logo }: Bio, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div
            ref={ref}
            data-active={false}
            className="data-[active='false']:hidden absolute top-0 w-full h-auto bg-light border-b border-black"
        >
            <div className="w-full p-3">
                <FaX
                    className="fill-primary-100 cursor-pointer"
                />
            </div>

            <div className="w-full flex justify-center items-center">
                <img
                    src={logo?.url}
                    alt=""
                    className="w-[80px] h-[80px] object-cover rounded-full"
                />
            </div>

            <BioDescribe />

        </div>
    )
});