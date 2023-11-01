import PanelHeader from "./components/molecules/PanelHeader";
import MainPanelClient from "./components/organims/MainPanelClient";

function Panel() {

    return (
        <div className="w-screen h-screen flex flex-col bg-dark ">

            <PanelHeader />

            <MainPanelClient />

        </div>
    )
}

export default Panel;