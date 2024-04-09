import { FaArrowRotateLeft } from "react-icons/fa6";
import { ModalColumnOrganization } from "../ModalColumnOrganization/ModalColumnOrganization";
import { Dispatch, SetStateAction, useContext } from "react";
import { BsStars } from "react-icons/bs";
import { FaBorderAll } from "react-icons/fa";
import { Client } from "../../../../../../../../../../@types/Client";
import { Columns } from "../../../../../../../../../../@types/Column.types";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { SelectTime } from "../../../../../../../../../../components/SelectTime/SelectTime";
import { Button } from "../../../../../../../../../../components/button/Button";
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp";
import { AnalyzeMetric } from "./components/AnalyzeMetric/AnalyzeMetric";

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
            componentName: "modal_organization_column",
            components: <ModalColumnOrganization modalName="modal_organization_column" setColumns={setColumns} columns={columns} />
        })
    }

    const handleClickAnalyzeMetric = () => {
        setModalContent({
            componentName: "modal_show_analyze_metric",
            components:
                <PopUp>
                    <AnalyzeMetric />
                </PopUp>
        })
    }

    return (
        <div className="w-[70vw] flex gap-8 justify-end items-center">
            <div
                className="p-2 bg-dark border border-primary-100 rounded-md cursor-pointer"
                onClick={reloadMetric}
            >
                <FaArrowRotateLeft className="text-xl" />
            </div>

            <div className="h-[40px]">
                <SelectTime typeFilter="filter_time_metric" />
            </div>

            <Button
                onClick={handleColumnOrganization}
                customClass="bg-dark border border-primary-100 px-4"
            > <FaBorderAll className="text-xl" /> Organize as colunas</Button>

            <Button
                customClass="bg-primary-100 border border-primary-100 px-4"
                onClick={handleClickAnalyzeMetric}
            > <BsStars className="text-xl" /> Analisar métricas com IA</Button>
        </div>
    )
};