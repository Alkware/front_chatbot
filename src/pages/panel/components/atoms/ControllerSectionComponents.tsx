import Dashboard from "../organims/Dashboard";
import MyProjects from "../organims/MyProjects";
import { System } from "../organims/System";

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
                            <h2>Metricas</h2>
                            :
                            navMenu === 3 ?
                                <h2>Suporte</h2>
                                :
                                navMenu === 4 ?
                                    <h2>Pagamentos</h2>
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