import { Metric } from "./metric/Metric";
import Dashboard from "./dashboard/Dashboard";
import MyProjects from "./myProjects/MyProjects";
import { System } from "./system/System";
import { Payments } from "./payments/Payments";

interface ComponetsTypes {
    navMenu: number
}

function ControllerSectionComponents({ navMenu }: ComponetsTypes) {
    return (
        <div className="w-full">
            {
                navMenu === 0 ?
                    <Dashboard />
                    :
                    navMenu === 1 ?
                        <MyProjects />
                        :
                        navMenu === 2 ?
                            <Metric />
                            :
                            navMenu === 3 ?
                                <h2>Suporte</h2>
                                :
                                navMenu === 4 ?
                                    <Payments />
                                    :
                                    navMenu === 5 ?
                                        <h2>configuração</h2>
                                        :
                                        <System />
            }
        </div>


    )
}

export default ControllerSectionComponents;