import { FaArrowRotateLeft } from "react-icons/fa6";
import { Button } from "../../../../../../components/button/Button";
import { ModalColumnOrganization } from "../ModalColumnOrganization";
import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../context/ModalContext";
import { Columns } from "../../../../../../@types/Column.types";
import { Client } from "../../../../../../@types/Client";
import { SelectTime } from "../../../../../../components/SelectTime/SelectTime";

interface OptionsTable {
    client: Client | undefined,
    columns: Columns[],
    handleRequestDataProject: (id: string) => void,
    setColumns: Dispatch<SetStateAction<Columns[]>>,
}



export function OptionsTable({ client, handleRequestDataProject, setColumns, columns }: OptionsTable) {
    const { setModalContent } = useContext(ModalContext)

    const reloadMetric = async ({ currentTarget }: any) => {

        if (client?.plan_management) {
            const icon: SVGAElement = currentTarget.querySelector("svg")
            icon.classList.add("rotate-[-360deg]", "transition-transform", "duration-1000")

            handleRequestDataProject(client?.id)

            const timeout = setTimeout(() => {
                icon.classList.remove("rotate-[-360deg]", "transition-transform", "duration-1000")
                clearTimeout(timeout)
            }, 1000);
        }
    }

    const handleColumnOrganization = () => {
        setModalContent({
            isOpenModal: true,
            components: <ModalColumnOrganization setColumns={setColumns} columns={columns} />
        })
    }


    return (
        <div className="w-full flex gap-8 justify-end items-center">

            <div
                className="p-2 bg-primary-100 rounded-md cursor-pointer"
                onClick={reloadMetric}
            >
                <FaArrowRotateLeft className="text-xl" />
            </div>

            <div className="h-[40px]">
                <SelectTime typeFilter="filter_time_metric" />
            </div>

            <Button onClick={handleColumnOrganization}>Organize as colunas</Button>
        </div>
    )
};