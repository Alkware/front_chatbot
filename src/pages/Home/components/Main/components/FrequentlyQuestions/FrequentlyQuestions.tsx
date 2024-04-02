import { SimulatorMobile } from "../ShowChatDemo/components/SimulatorMobile/SimuladorMobile";

export function FrequentlyQuestions() {
    return (
        <div className="w-screen h-screen flex justify-center">
            <div className="flex gap-4 h-[500px]">
                <SimulatorMobile />
                <div className="w-1/3 flex flex-col">
                    <h2>Ainda Possui Alguma Dúvida?</h2>
                    <h3>Converse agora com nosso chat!</h3>
                </div>
            </div>
        </div>
    )
};