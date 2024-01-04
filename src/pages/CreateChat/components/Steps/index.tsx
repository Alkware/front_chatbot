interface Steps {
    numberSteps: number, 
    currentIndex: number
}

export function Steps({ numberSteps, currentIndex }: Steps) {
    return (
        <div className="w-full max-w-[500px] flex justify-between my-6">
            {
                Array(numberSteps).fill(0).map((_, index) =>
                    <div key={index} className={`w-full h-[1px] bg-transparent border border-dashed border-transparent border-t-white/30 flex justify-center items-center`}>
                        <div
                            className={
                                `w-[20px] h-[20px] 
                                    ${index < currentIndex ?
                                    "bg-primary-100 border border-light" :
                                    index === currentIndex ? "bg-light animate-ping" :
                                        "bg-zinc-400"} rounded-full`}
                        ></div>
                        {
                            index === currentIndex &&
                            <div
                                className={`w-[20px] h-[20px] bg-primary-100 border border-light rounded-full absolute`}
                            ></div>
                        }
                    </div>
                )
            }
        </div>
    )
};