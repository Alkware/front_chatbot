import { twMerge } from "tailwind-merge";
import img from "../../assests/smile-face.svg"
interface Loading {
    width?: `${string}px`;
    textSize?:
    "text-xs md:text-sm" |
    "text-sm md:text-base" |
    "text-base md:text-lg" |
    "text-lg md:text-xl" |
    "text-xl md:text-2xl";
}

export function Loading({ width, textSize }: Loading) {
    return (
        <div className="w-full h-full grid place-items-center gap-4 bg-light dark:bg-dark">
            <img
                src={img}
                alt="logo loading wipzee"
                className="w-full h-full max-w-[220px] object-cover animate-pulse"
                style={{ width: width || "100%" }}
            />
            <span
                className={twMerge("animate-pulse text-xl md:text-2xl text-center", textSize)}
            >Carregando, aguarde.</span>
        </div>
    )
};