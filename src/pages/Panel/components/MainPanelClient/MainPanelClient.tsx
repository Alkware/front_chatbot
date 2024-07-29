import PanelHeader from "./components/PanelHeader/PanelHeader";
import { ControlComponentsSelectedMenu } from "./components/ControlComponentsSelectedMenu/ControlComponentsSelectedMenu";
// import { HelperChat } from "./components/HelperChat/HelperChat";

export default function MainPanelClient() {

    return (
        <div className="w-full min-h-screen md:w-[90%] flex-grow flex flex-col items-center bg-gradient-to-br from-primary-100 from-[10%] to-light to-[20%] dark:to-dark">
            <PanelHeader />
            <ControlComponentsSelectedMenu />
            {/* <HelperChat /> */}
        </div>
    )
};