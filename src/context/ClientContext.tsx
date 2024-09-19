import { createContext, useState } from "react";
import { Client } from "../@types/Client.types";

interface ClientContextTypes {
    client: Client | undefined,
    setClient: React.Dispatch<React.SetStateAction<Client | undefined>>
}

export const ClientContext = createContext<ClientContextTypes>({
    client: undefined,
    setClient: () => { }
});

function ClientProvider({ children }: any) {
    const [client, setClient] = useState<Client>();

    return (
        <ClientContext.Provider value={{ client, setClient }}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientProvider;