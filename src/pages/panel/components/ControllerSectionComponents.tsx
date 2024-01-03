import { useSearchParams } from "react-router-dom";
import { ConversationHistoric } from "./ConversationHistoric/ConversationHistoric";
import { Metric } from "./metric/Metric";
import { MyDatabases } from "./myData/MyDatabases";
import MyProjects from "./myProjects/MyProjects";
import { Payments } from "./payments/Payments";

export function ControllerSectionComponents() {
    const [searchParams] = useSearchParams();
    const tab = Number(searchParams.get("tab") || 0);
    

    return (
        <div className="w-full p-8 overflow-hidden">
            {
                tab === 0 ?
                    <MyProjects />
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
                                    <h2>Configurações</h2>

            }
        </div>


    )
}
