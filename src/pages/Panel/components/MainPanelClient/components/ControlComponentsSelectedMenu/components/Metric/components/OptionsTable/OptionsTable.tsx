import { FaArrowRotateLeft } from "react-icons/fa6";
import { ModalColumnOrganization } from "../ModalColumnOrganization/ModalColumnOrganization";
import { Dispatch, SetStateAction, useContext } from "react";
import { BsStars } from "react-icons/bs";
import { FaBorderAll } from "react-icons/fa";
import { Client } from "../../../../../../../../../../@types/Client.types";
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
            components:
                <ModalColumnOrganization modalName="modal_organization_column" setColumns={setColumns} columns={columns} />
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
        <div className="w-full md:w-[70vw] px-4 flex flex-row-reverse md:flex-row flex-wrap lg:flex-nowrap gap-4 lg:gap-8 justify-center lg:justify-end items-center">
            <div
                className="w-1/5 md:w-auto p-2 flex justify-center bg-light dark:bg-dark border border-primary-100 rounded-md cursor-pointer"
                onClick={reloadMetric}
            >
                <FaArrowRotateLeft className="text-xl fill-primary-100 dark:fill-light" />
            </div>

            <div className="w-[74%] md:w-auto h-[40px]">
                <SelectTime />
            </div>

            <Button
                onClick={handleColumnOrganization}
                customClass="w-full md:w-auto bg-light dark:bg-dark text-primary-100 dark:text-light border border-primary-100 px-4"
            > <FaBorderAll className="text-xl fill-primary-100 dark:fill-light" /> Colunas</Button>

            <Button
                customClass="w-full md:w-auto px-2 bg-primary-100 border border-primary-100"
                onClick={handleClickAnalyzeMetric}
            > <BsStars className="text-xl" /> Análise de métrica com IA</Button>
        </div>
    )
};