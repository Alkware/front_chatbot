interface CrescentBall {
    active: boolean
}

export function CrescentBall({ active }: CrescentBall) {


    return (
        <div
            data-active={active}
            className="group relative"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white dark:bg-primary-100 rounded-full"></div>
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-primary-100 rounded-full group-data-[active=true]:animate-pulse"
            ></div>
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-primary-100 rounded-full group-data-[active=true]:animate-pulse "
            ></div>
        </div>
    )
};