import { useContext, useEffect, useState } from "react";
import { Container } from "../../../../../../../../components/Container/Container";
import { Table } from "../../../../../../../../components/Table/Table";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { SelectTime } from "../../../../../../../../components/SelectTime/SelectTime";
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";
import { Options, Select } from "../../../../../../../../components/Select/Select";
import { useSearchParams } from "react-router-dom";
import { Project } from "../../../../../../../../@types/Project";
import { convertDateInHour } from "../../../../../../../../functions/convertDateInHour";
import { FaArrowRotateLeft } from "react-icons/fa6";

interface Leads { }

export function Leads({ }: Leads) {
    const { client } = useContext(ClientContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const titles = ["nome", "e-mail", "Telefone"];
    const [rows, setRows] = useState<Array<string[]>>([[]]);

    // Cria uma lista de objeto para ser usado em um select...
    const projects_list: Options[] | undefined = client?.plan_management.project?.map((project: Project) => {
        return {
            id: project.project_name.replaceAll(" ", "_"),
            value: project.project_name,
            text: project.project_name
        }
    });

    useEffect(() => {
        // Obtem o filtro de tempo dos chats...
        const time = searchParams.get("filter_time")
        // Obtem o projeto selecionado...
        const projectParam = searchParams.get("project")
        // List de projetos...
        var projects = client?.plan_management.project || [];

        // Filtra por projeto...
        if (projectParam) projects = projects.filter((project) => project.project_name.replaceAll(" ", "_") === projectParam && project);

        // Cria a lista de leads coletados...
        const rows = projects.flatMap(project => project.message_manager.flatMap(manager => manager.lead_collected.map(lead => {
            return !time || convertDateInHour(lead.time) <= Number(time) ? [lead.name || "-", lead.email || "-", lead.cell_phone || "-"] : []
        })));

        setRows(rows);
    }, [searchParams])



    // Função responsável por filtrar os leads por chat...
    const handleSelectProject = (id: string) => {
        searchParams.set("project", id.replaceAll(" ", "_"))
        setSearchParams(searchParams)
    }

    // Função responsável por remover a query params 'filter_time' da URL...
    const onDelete = () => {
        searchParams.delete("project")
        setSearchParams(searchParams)
    }

    return (
        <Container title="Leads coletados" className="flex items-center">
            <div className="w-[90%] flex flex-col-reverse md:flex-row md:justify-end gap-2 md:gap-8 md:h-[40px] px-4 md:px-0">
                <TipContainer tip="Selecione um chat">
                    <Select
                        name="select_chat"
                        title="Selecione um chat"
                        options={projects_list || []}
                        onSelected={handleSelectProject}
                        onDelete={onDelete}
                    />
                </TipContainer>
                <TipContainer tip="Selecione uma data  como filtro">
                    <SelectTime />
                </TipContainer>
                <TipContainer
                    tip="Atualize seus chats"
                    positionX="LEFT"
                >
                    <div
                        className="p-2 bg-light dark:bg-gray border border-primary-100 rounded-md cursor-pointer"
                    >
                        <FaArrowRotateLeft className="text-nxl" />
                    </div>
                </TipContainer>
            </div>
            <div className="w-[90%]">
                <Table
                    titleColumn={titles}
                    rows={rows}
                />
            </div>
        </Container>
    )
};