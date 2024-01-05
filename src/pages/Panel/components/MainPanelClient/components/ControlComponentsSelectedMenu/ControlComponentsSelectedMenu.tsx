import { useSearchParams } from "react-router-dom";
import MyProjects from "./components/MyProjects/MyProject";
import { Metric } from "./components/Metric";
import { MyDatabases } from "./components/MyDatabase";
import { ConversationHistoric } from "./components/ConversationHistoric";
import { Payments } from "./components/Payments/Payments";


export function ControlComponentsSelectedMenu() {
    const [searchParams] = useSearchParams();
    const tab = Number(searchParams.get("tab")) || 0;

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
