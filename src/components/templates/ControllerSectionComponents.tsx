import Dashboard from "../compositeComponets/Dashboard";
import MyProjects from "../compositeComponets/MyProjects";

interface ComponetsTypes {
    navMenu: number
}

function ControllerSectionComponents({ navMenu }: ComponetsTypes) {
    return (
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
                                <h2>System</h2>

    )
}

export default ControllerSectionComponents;