interface ButtonTutorial { 
    onClick: ()=> void;
}

export function ButtonTutorial({ onClick }: ButtonTutorial) {
    return (
        <div
            id="btn-tutorial"
            className="w-10 bg-white"
            onClick={onClick}
        >
            <div className="-rotate-90">
                <span className=" text-2xl font-bold cursor-pointer p-2 px-4 rounded-tr-lg rounded-tl-lg bg-primary-100">Tutorial</span>
            </div>
        </div>
    )
};