import { MouseEvent, useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { v4 } from "uuid";

interface Table {
    titleColumn: string[];
    rows: Array<any[]> | undefined;
    maxPerPage?: number;
}

export function Table({ titleColumn, rows = [[]], maxPerPage = 10 }: Table) {
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState<Array<Array<any[]>>>([])

    useEffect(() => {
        const howManyPagination = Math.floor(rows.length / maxPerPage);
        const restPagination = rows.length % maxPerPage;
        const newPagination: any[] = [];

        Array.from({ length: howManyPagination }).forEach((_, index) => {
            const sliceRows = rows.slice((maxPerPage * index), (maxPerPage * (index + 1)));
            newPagination.push(sliceRows);
        })

        if (!!restPagination) {
            const sliceRows = rows.slice(rows.length - restPagination, rows.length);
            newPagination.push(sliceRows);
        }

        setPagination(newPagination)
    }, [])

    // Lida com o clique no botão proxima página e página anterior...
    const handleNextAndPreviousPage = (e: MouseEvent<HTMLOrSVGElement>) => {
        const tab = e.currentTarget.dataset.tab;

        if (tab === "previous") {
            setCurrentPage(currentPage => {
                if (currentPage > 0) return currentPage - 1;
                else return pagination.length - 1
            })
        } else {
            setCurrentPage(currentPage => {
                if (currentPage < (pagination.length - 1)) return currentPage + 1;
                else return 0
            })
        }
    }

    return (
        <div className="w-full flex flex-col items-center">
            {!!pagination[currentPage] ?
                <>
                    <table className="block overflow-x-auto whitespace-nowrap">
                        <thead className="w-full bg-primary-100/30 border-2 border-primary-100/60">
                            <tr className="">
                                {titleColumn.map((title) => <th key={v4()} className="uppercase p-2 px-3 border-r border-primary-100/40">{title}</th>)}
                            </tr>
                        </thead>
                        <tbody className="w-full divide-y divide-gray_light">
                            {pagination[currentPage].map((data, index) =>
                                <tr
                                    key={v4()}
                                    data-color={index % 2 === 0}
                                    className="w-full data-[color=true]:bg-primary-50/10 h-[30px] table-auto"
                                >
                                    {data.map(d => <td key={v4()} className="text-center lowercase max-w-20 overflow-hidden whitespace-nowrap text-ellipsis">{d}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div
                        data-pagination={pagination.length > 1}
                        className="w-full flex gap-4 items-center justify-center p-4 data-[pagination=false]:hidden"
                    >
                        <FaArrowCircleLeft
                            className="cursor-pointer"
                            data-tab="previous"
                            onClick={handleNextAndPreviousPage}
                        />
                        <span>{currentPage + 1} - {pagination.length}</span>
                        <FaArrowCircleRight
                            className="cursor-pointer"
                            data-tab="next"
                            onClick={handleNextAndPreviousPage}
                        />
                    </div>
                </>
                :
                <h2>Você ainda não coletou nenhum lead</h2>}
        </div>
    )
};