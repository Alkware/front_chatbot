import { ButtonHTMLAttributes, RefObject, useEffect, useRef } from "react"
import { twMerge } from 'tailwind-merge'

export interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    customClass?: string
    effectNeon?: boolean;
}

export function Button({ children, customClass, effectNeon, ...restProps }: Button) {
    const buttonRef: RefObject<HTMLButtonElement> = useRef(null);

    useEffect(()=>{
        if(effectNeon){
            buttonRef.current?.classList.add("neon-effect-hover")
        }
    },[])

    return (
        <button
            ref={buttonRef}
            {...restProps}
            className={twMerge("py-2 px-6 flex justify-center items-center gap-1  bg-primary-100 text-light rounded-lg", customClass)}
        >
            {children}
        </button>
    )
};