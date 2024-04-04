export function FrequentlyQuestions() {
    return (
        <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center mt-12">
            <div className="w-auto flex flex-col justify-center items-center gap-4">
                <h2 className="text-4xl md:text-6xl">Ainda Possui Alguma Dúvida?</h2>
                <h3 className="text-2xl">Converse agora com nosso chat!</h3>
            </div>
            <div className="w-full h-full flex justify-center ">
                <div
                    className="w-[450px] h-[600px] rounded-lg overflow-hidden"
                    id="wipzee-chat"
                ></div>
            </div>
        </div>
    )
};