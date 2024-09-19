import { useSearchParams } from "react-router-dom";
import MyChats from "./components/MyChats/MyChats";
import { Metric } from "./components/Metric/Metric";
import { MyArtificialIntelligence } from "./components/MyArtificialIntelligence/MyArtificialIntelligence";
import { ConversationHistoric } from "./components/Records/ConversationHistoric";
import { Payments } from "./components/Payments/Payments";
import { ConfigProfile } from "./components/ConfigProfile/ConfigProfile";
import { Tab } from "../../../NavigatePanelClient/components/MenuNavigate/MenuNavigate";
import { ReactElement } from "react";
import { Leads } from "./components/Records/Leads";
import { MyProducts } from "./components/MyProducts/MyProducts";

interface Container {
    tab: Tab;
    element: ReactElement;
}

const containers: Container[] = [
    { tab: "my_chats", element: <MyChats /> },
    { tab: "metrics", element: <Metric /> },
    { tab: "artificial_intelligence", element: <MyArtificialIntelligence /> },
    { tab: "products", element: <MyProducts /> },
    { tab: "records", element: <ConversationHistoric /> },
    { tab: "conversations", element: <ConversationHistoric /> },
    { tab: "leads", element: <Leads /> },
    { tab: "payment", element: <Payments /> },
    { tab: "config", element: <ConfigProfile /> },
]


export function ControlComponentsSelectedMenu() {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "my_chats";

    const handleDisplayContainer = () => {
        const container = containers.find(container => container.tab === tab);
        return container?.element
    }

    return (
        <div className="w-full px-2 md:px-8">
            {handleDisplayContainer()}
        </div>

    )
}
