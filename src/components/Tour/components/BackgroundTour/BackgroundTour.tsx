interface BackgroundTour {
    onClick: ()=> void;
}

export function BackgroundTour({ onClick }: BackgroundTour) {
    return (
        <div
            id="background-tour"
            className="fixed top-0 left-0 z-0 w-screen h-screen bg-black/50 group-data-[show=false]:hidden"
            onClick={onClick}
        ></div>
    )
};