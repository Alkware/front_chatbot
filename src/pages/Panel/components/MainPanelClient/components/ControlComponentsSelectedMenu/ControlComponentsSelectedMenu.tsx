import { useSearchParams } from "react-router-dom";
import MyChats from "./components/MyChats/MyChats";
import { Metric } from "./components/Metric/Metric";
import { MyDatabases } from "./components/MyDatabase/MyDatabase";
import { ConversationHistoric } from "./components/ConversationHistoric/ConversationHistoric";
import { Payments } from "./components/Payments/Payments";
import { ConfigProfile } from "./components/ConfigProfile/ConfigProfile";


export function ControlComponentsSelectedMenu() {
    const [searchParams] = useSearchParams();
    const tab = Number(searchParams.get("tab")) || 0;

    return (
        <div className="w-full p-8 overflow-hidden">
            {
                tab === 0 ?
                    <MyChats />
                    :
                    tab === 1 ?
                        <Metric />
                        :
                        tab === 2 ?
                            <MyDatabases />
                            :
                            tab === 3 ?
                                <ConversationHistoric />
                                :
                                tab === 4 ?
                                    <Payments />
                                    :
                                    <ConfigProfile />

            }
        </div>


    )
}
