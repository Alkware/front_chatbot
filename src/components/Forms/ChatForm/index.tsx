import { SimulatorChat } from "../../SimulatorChat"
import { ChatSettings } from "./components/ChatSettings"
import { GeneralInformation } from "./components/GeneralInformation"
import { ProductDescribe } from "./components/ProductDescribe"
import { Tracking } from "./components/Tracking"

interface ChatForm {
    isSimulator?: boolean,
    isCreateChat: boolean
}

export function ChatForm({ isSimulator = true, isCreateChat }: ChatForm) {
    return (
        <div className="w-full flex bg-light dark:bg-dark rounded-xl">
            <div className="w-4/5 p-4 flex flex-col">

                <GeneralInformation />

                <ProductDescribe />

                <Tracking />

                <ChatSettings
                    project={project}
                />
            </div>

            <div 
                className="w-1/5 min-w-[320px] flex items-start pt-4 justify-center"
            >
                <SimulatorChat />
            </div>
        </div>
    )
};