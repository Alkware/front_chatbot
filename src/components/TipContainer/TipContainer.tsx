import { ReactElement, RefObject, useEffect, useRef } from "react"
import { IoCaretDownOutline } from "react-icons/io5";

interface TipContainer {
    children: ReactElement;
    tip: string;
    positionY?: "BOTTOM" | "TOP";
    positionX?: "LEFT" | "RIGHT";
    display?: boolean
}

export function TipContainer({ children, tip, display = true, positionY = "TOP", positionX = "RIGHT" }: TipContainer) {
    const ballonTipRef: RefObject<HTMLDivElement> = useRef(null);
    const CARACTERES_MAX = 40;

    if (tip.length > CARACTERES_MAX) console.error(`A tip não pode conter um nome maior que ${CARACTERES_MAX} caracteres.`, children);

    useEffect(() => {
        if (ballonTipRef.current?.style) {
            const tipSize = tip.length
            const ballonSize = tipSize < 15 ? "120px" : tipSize < 20 ? "160px" : tipSize < 25 ? "200px" : "250px";
            ballonTipRef.current.setAttribute("style", `width: ${ballonSize}; font-size: ${tipSize > 30 ? ".8rem" : ".9rem"};`);
        }
    }, []);

    return (
        <div
            className="min-h-[30px] flex items-center relative group "
        >
            <div
                ref={ballonTipRef}
                data-display={display}
                data-positiony={positionY}
                data-positionx={positionX}
                className={
                    `hidden md:block data-[display=false]:hidden border border-light/40 bg-primary-100 p-1 rounded-xl absolute z-40 
                    data-[positiony=TOP]:-top-full data-[positiony=TOP]:-translate-y-3 data-[positiony=BOTTOM]:-bottom-full data-[positiony=BOTTOM]:translate-y-2
                    data-[positionx=RIGHT]:left-4/5 data-[positionx=LEFT]:right-0
                    text-center invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity`
                }
            >
                <span className="opacity-90 font-bold text-light">{tip}</span>
                <IoCaretDownOutline
                    data-positiony={positionY}
                    data-positionx={positionX}
                    className={
                        `border-light/40 fill-primary-100 absolute 
                        data-[positiony='BOTTOM']:top-0 data-[positiony='BOTTOM']:-translate-y-[78%] data-[positiony='BOTTOM']:rotate-180
                        data-[positionx='LEFT']:right-2
                        `
                    }
                />
            </div>
            {children}
        </div>
    )
};