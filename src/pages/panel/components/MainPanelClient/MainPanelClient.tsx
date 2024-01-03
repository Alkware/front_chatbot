import PanelHeader from "../PanelHeader";
import { ControllerSectionComponents } from "../ControllerSectionComponents";

export function MainPanelClient() {

    return (
        <div className="w-[90%] h-full flex-grow flex flex-col items-center bg-gradient-to-br from-primary-100 from-[10%] to-light to-[20%] dark:to-dark">
            <PanelHeader />
            <ControllerSectionComponents />
        </div>
    )
};