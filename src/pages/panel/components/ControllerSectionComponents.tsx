import { Metric } from "./metric/Metric";
import MyProjects from "./myProjects/MyProjects";
import { Payments } from "./payments/Payments";

interface ComponetsTypes {
    navMenu: number
}

function ControllerSectionComponents({ navMenu }: ComponetsTypes) {
    return (
        <div className="w-full">
            {
                navMenu === 0 ?
                    <MyProjects />
                    :
                    navMenu === 1 ?
                        <Metric />
                        :
                        navMenu === 2 ?
                            <Payments />
                            :
                            <h2>configuração</h2>

            }
        </div>


    )
}

export default ControllerSectionComponents;