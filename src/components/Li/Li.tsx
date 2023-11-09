interface LiTypes {
    text: string,
    index: string,
    activeIndex: string | undefined,
    onClick: ({ target }: any)=> void,
}

export function Li({ text, index, activeIndex, onClick }: LiTypes) {


    return (
        <li
            className={
                `w-full text-center cursor-pointer py-4 border-b-[1px] border-zinc-500/50 hover:bg-zinc-500 
                transition-colors ${activeIndex === index && "bg-blue_main2"}`
            }
            data-index={index}
            onClick={onClick}
        >
            {text}
        </li>
    )
};