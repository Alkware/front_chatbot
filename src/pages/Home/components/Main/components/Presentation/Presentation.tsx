export function Presentation() {
    return (
        <section
            id="home"
            className="w-screen h-screen flex flex-col items-center justify-center"
        >
            <div className="w-full px-4 max-w-[1300px] flex gap-4">
                <div className="w-1/2 flex flex-col gap-4 items-center z-10">

                    <h1 className="w-full text-5xl font-bold uppercase font-sans animate-jump-screen">
                        Transforme seu <br />atendimento
                    </h1>
                    <div className="w-full flex gap-2 items-center">
                        <h2
                            className="text-3xl"
                        >
                            Venda mais com um
                        </h2>
                        <span className="text-3xl bg-red-500 font-bold rounded-md animate-jump-screen">único link inteligente</span>
                    </div>
                    <h3
                        className="text-xl opacity-70 animate-display-screen"
                    >
                        Descubra a solução ideal para otimizar suas vendas e reduzir reclamações, de forma simples e eficiente com o uso da inteligênia artificial.</h3>

                </div>
                <div className="w-1/2 flex flex-col items-center justify-center pt-12 relative">
                    <img
                        src="https://i.ibb.co/RvX8XRX/com-unscreen.gif"
                        alt=""
                        className="w-full h-full cover"
                    />
                </div>
            </div>
        </section>
    )
};