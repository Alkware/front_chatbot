import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FaLock } from "react-icons/fa";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { Columns } from "../../../../../../../../../../@types/Column.types";
import { Button } from "../../../../../../../../../../components/button/Button";


interface ModalColumnOrganizationTypes {
    setColumns: Dispatch<SetStateAction<any>>
    columns: any,
    modalName: `modal_${string}`
}

export function ModalColumnOrganization({ setColumns, columns, modalName }: ModalColumnOrganizationTypes) {
    const { clearModal } = useContext(ModalContext)
    const [columnsData, setColumnsData] = useState(columns)

    const handleChangeStatus = (e: any) => {
        const status = e.currentTarget.dataset.status == "true";
        const name = e.currentTarget.dataset.name;

        setColumnsData(() => [
            ...columns.filter((column: any, index: number) => {
                if (index > 1) {
                    if (column.columnName === name) {
                        column.status = !status
                    }
                }

                return column
            })
        ])
    }

    const handleSaveColumnOrganization = () => {
        localStorage.setItem("metricColumnActive", JSON.stringify(columns))
        setColumns(columns)
        clearModal(modalName)
    }

    return (
        <div className="w-full md:w-1/2 bg-light dark:bg-zinc-800 text-dark dark:text-light">
            <h2 className="w-full text-center text-xl p-4">Organize suas columns</h2>

            <div className="w-full flex gap-2 flex-col">
                {
                    columnsData.map((column: Columns, index: number) =>
                        <div key={column.columnName} className="w-full flex justify-between px-4">

                            <p>{column.columnName}</p>

                            <div className="flex gap-4">

                                <div
                                    className={`w-[30px] h-[20px] bg-zinc-400 dark:bg-zinc-100 flex overflow-hidden rounded-full cursor-pointer`}
                                    style={{ justifyContent: `${column.status ? "end" : "start"}` }}
                                    onClick={handleChangeStatus}
                                    data-status={column.status}
                                    data-name={column.columnName}
                                >
                                    <div
                                        className={`w-2/3 h-full rounded-xl flex justify-center items-center`}
                                        style={{ background: `${column.status ? "green" : "red"}` }}
                                    >
                                        {
                                            index < 2 &&
                                            <FaLock className="w-[8px]" />
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
            <div className="w-full flex mt-12 justify-evenly items-center">
                <span className="underline opacity-80 cursor-pointer" onClick={()=> clearModal(modalName)}>Fechar</span>
                <Button onClick={handleSaveColumnOrganization}>Salvar</Button>
            </div>
        </div>
    )
};