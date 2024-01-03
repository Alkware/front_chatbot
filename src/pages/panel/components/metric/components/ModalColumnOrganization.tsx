import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FaLock } from "react-icons/fa";
import { ModalContext } from "../../../../../context/ModalContext";
import { Columns } from "../../../../../@types/Column.types";
import { Button } from "../../../../../components/button/Button";


interface ModalColumnOrganizationTypes {
    setColumns: Dispatch<SetStateAction<any>>
    columns: any
}

export function ModalColumnOrganization({ setColumns, columns }: ModalColumnOrganizationTypes) {
    const { setModalContent } = useContext(ModalContext)
    const [columnsData, setColumnsData] = useState(columns)

    const handleChangeStatus = (e: any) => {
        const status = e.currentTarget.dataset.status == "true" ? true : false;
        const name = e.currentTarget.dataset.name;

        setColumnsData(() => [
            ...columns.filter((column: any, index: number) => {
                if (index > 1) {
                    column.columnName === name && (column.status = !status)
                }

                return column
            })
        ])
    }

    const handleSaveColumnOrganization = () => {
        localStorage.setItem("metricColumnActive", JSON.stringify(columns))
        setColumns(columns)
        setModalContent({
            isOpenModal: false
        })
    }

    return (
        <div className="w-1/2 max-w-[400px] bg-zinc-800 text-light">
            <h2 className="w-full text-center text-xl p-4">Organize suas columns</h2>

            <div className="w-full flex gap-2 flex-col">
                {
                    columnsData.map((column: Columns, index: number) =>
                        <div key={column.columnName} className="w-full flex justify-between px-4">
                            <p>{column.columnName}</p>

                            <div
                                className={`w-[30px] h-[20px] bg-zinc-100 flex overflow-hidden rounded-full cursor-pointer`}
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
                    )
                }
            </div>
            <div className="w-full flex mt-12 justify-center">
                <Button onClick={handleSaveColumnOrganization}>Salvar</Button>
            </div>
        </div>
    )
};