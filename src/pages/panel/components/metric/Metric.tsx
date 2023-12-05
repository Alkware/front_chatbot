import { useContext, useState } from "react"
import ButtonMain from "../../../../components/button/ButtonBlue"
import { ModalContext } from "../../../../context/ModalContext"
import { ModalColumnOrganization } from "./components/ModalColumnOrganization"
import { BodyTableMetric } from "./components/BodyTableMetric"
import { Columns } from "../../../../@types/Column.types"

export function Metric() {
    const { setModalContent } = useContext(ModalContext)
    const columnsStorage: Columns[] = JSON.parse(localStorage.getItem("metricColumnActive") || "[]")
    const [columns, setColumns] = useState(columnsStorage);

    const handleColumnOrganization = () => {
        setModalContent({
            isOpenModal: true,
            components: <ModalColumnOrganization setColumns={setColumns} columns={columns} />
        })
    }

    return (
        <div className="w-full p-4">

            <div className="w-full flex justify-end px-8">
                <ButtonMain onClick={handleColumnOrganization}>Organize as colunas</ButtonMain>
            </div>

            <BodyTableMetric columns={columns} setColumns={setColumns} />
        </div>
    )
};