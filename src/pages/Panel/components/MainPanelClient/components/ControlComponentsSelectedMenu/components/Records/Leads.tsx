import { useContext } from "react";
import { Container } from "../../../../../../../../components/Container/Container";
import { Table } from "../../../../../../../../components/Table/Table";
import { ClientContext } from "../../../../../../../../context/ClientContext";

interface Leads { }

export function Leads({ }: Leads) {
    const { client } = useContext(ClientContext);
    const titles = ["nome", "e-mail", "Telefone"]
    const rows = client?.plan_management.project.flatMap(project =>
        project.message_manager.flatMap(manager =>
            manager.lead_collected.map(lead => [lead.name || "-", lead.email || "-", lead.cell_phone || "-"])))

    return (
        <Container title="Leads coletados">
            <div className="w-[90%] mx-auto">
                <Table
                    titleColumn={titles}
                    rows={rows}
                />
            </div>
        </Container>
    )
};