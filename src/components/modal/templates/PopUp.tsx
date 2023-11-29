interface PopUp {
    children: any
}

export function PopUp({ children }: PopUp) {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-4 bg-zinc-800 rounded-md shadow-sm shadow-black/50">
                {children}
            </div>
        </div>
    )
};