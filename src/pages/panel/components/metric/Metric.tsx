import { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../../../context/ModalContext"
import { TableMetric } from "./components/TableMetric"
import { Columns } from "../../../../@types/Column.types"
import { ClientContext } from "../../../../context/ClientContext"
import { PopOver } from "../../../../components/modal/templates/PopOver"
import { getClientById } from "../../../../api/client"
import { Container } from "../../../../components/Container/Container"
import { OptionsTable } from "./components/OptionsTable/OptionsTable"

export function Metric() {
    const columnsStorage: Columns[] = JSON.parse(localStorage.getItem("metricColumnActive") || "[]")
    const { setModalContent } = useContext(ModalContext)
    const { client } = useContext(ClientContext)
    const [columns, setColumns] = useState(columnsStorage);
    const [planManagement, setPlanManagement] = useState(client?.plan_management)


    useEffect(() => {
        (() => {
            if (client?.plan_management) handleRequestDataProject(client?.id)
        }
        )();
    }, [])

    const handleRequestDataProject = async (id: string) => {
        const response = await getClientById(id)

        if (response?.status === 200) setPlanManagement(response.data.plan_management)
        else setModalContent({
            isOpenModal: true,
            components: <PopOver message="Falha ao recarregar as métricas, tente reiniciar a página." type="ERROR" />
        })
    }

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-8">
            <Container
                title="Métricas"
                className="flex-col gap-8"
            >
                <OptionsTable
                    client={client}
                    columns={columns}
                    handleRequestDataProject={handleRequestDataProject}
                    setColumns={setColumns}
                />

                <TableMetric
                    columns={columns}
                    planManagement={planManagement}
                    setColumns={setColumns}
                />
            </Container>
        </div>
    )
};