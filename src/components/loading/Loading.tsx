import { RefObject, useEffect, useRef } from "react"

interface Loading {
    children: any
}

export function Loading({ children }: Loading) {
    const refLoading: RefObject<HTMLDivElement> = useRef(null);

    useEffect(()=>{
        const containerLoading = refLoading.current?.querySelector("div[data-container='loading']");
        const height = refLoading.current?.clientHeight;
        if(height && containerLoading){
            containerLoading.classList.add(`w-[${(height/2)}px]`);
            containerLoading.classList.add(`h-[${(height/2)}px]`);
        }
    },[]);

    return (
        <div className="relative ">
            <div 
                ref={refLoading}
                className="w-full h-full backdrop-blur-xl flex justify-center items-center absolute top-0 cursor-pointer rounded-lg data-[isloading=false]:hidden"
            >
                <div 
                    data-container="loading"
                    className="relative bg-primary-100 rounded-full border-2 animate-loading effect-neon"
                ></div>
            </div>
            {children}
        </div>
    )
};