import { MdAdd } from "react-icons/md";

export function SimulatorPanel() {
    return (
        <div
            className="w-screen h-screen relative flex flex-col justify-center items-center"
        >
            <h2 className="font-bold text-3xl uppercase text-center z-50 relative p-4">Veja como é simples criar seu primeiro chat</h2>
            <div className="w-screen h-screen absolute top-0 bg-black/70 z-10"></div>

            <div className="w-4/5 rounded-2xl overflow-hidden flex gap-1 p-4 animate-smooth_display_left">
                <div className="w-1/3 flex flex-col bg-primary-100 p-4">
                    <ul>
                        <div className="p-2 border-2 border-white relative z-20">
                            <li className="">Meus chat</li>
                        </div>
                        <li>Métricas</li>
                        <li>Fonte de dados</li>
                        <li>Registros</li>
                        <li>Assinatura</li>
                    </ul>
                </div>
                <div className="w-2/3 flex flex-col bg-primary-100 p-4">
                    <h2>Meus chats</h2>
                    <div className="flex justify-end">
                        <MdAdd />
                    </div>
                    <div className="w-full bg-primary-100">
                        <span className="text-center w-full">Você ainda não criou nenhum chat</span>
                    </div>
                </div>
            </div>
        </div>
    )
};