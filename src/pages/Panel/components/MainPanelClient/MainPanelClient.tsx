import PanelHeader from "./components/PanelHeader/PanelHeader";
import { ControlComponentsSelectedMenu } from "./components/ControlComponentsSelectedMenu/ControlComponentsSelectedMenu";

export default function MainPanelClient() {

    return (
        <div className="w-[90%] h-full overflow-auto flex-grow flex flex-col items-center bg-gradient-to-br from-primary-100 from-[10%] to-light to-[20%] dark:to-dark">
            <PanelHeader />
            <ControlComponentsSelectedMenu />
        </div>
    )
};