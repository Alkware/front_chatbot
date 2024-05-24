import { RefObject, useEffect, useRef } from "react"
import { IoCaretDownOutline } from "react-icons/io5";

interface TipContainer {
    children: any,
    tip: string,
    position?: "BOTTOM" | "TOP",
}

export function TipContainer({ children, tip, position = "TOP" }: TipContainer) {
    const ballonTipRef: RefObject<HTMLDivElement> = useRef(null);
    const CARACTERES_MAX = 40;

    if(tip.length > CARACTERES_MAX) throw new Error(`A tip não pode conter um nome maior que ${CARACTERES_MAX} caracteres.`);

    useEffect(() => {
        if (ballonTipRef.current?.style) {
            const tipSize = tip.length
            const ballonSize = tipSize < 15 ? "120px" : tipSize < 20 ? "160px": tipSize < 25 ? "200px": "250px";
            ballonTipRef.current.setAttribute("style", `width: ${ballonSize}; font-size: ${tipSize > 30 ? ".8rem": ".9rem"};`);
        }
    }, []);

    return (
        <div className="min-h-[30px] flex items-center relative group">
            <div
                ref={ballonTipRef}
                data-position={position}
                className={
                    `hidden md:block border border-light/40 bg-primary-100 p-1 rounded-xl absolute z-50 left-1/2 -translate-x-1/2 
                    data-[position=TOP]:-top-full data-[position=TOP]:-translate-y-2 data-[position=BOTTOM]:-bottom-full data-[position=BOTTOM]:translate-y-2
                    text-center invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity`
                }
            >
                <span className="opacity-90 font-bold text-light">{tip}</span>
                <IoCaretDownOutline
                    data-position={position}
                    className="border-light/40 fill-primary-100 absolute left-1/2 -translate-x-1/2 data-[position='BOTTOM']:top-0 data-[position='BOTTOM']:-translate-y-[78%] data-[position='BOTTOM']:rotate-180"
                />
            </div>
            {children}
        </div>
    )
};