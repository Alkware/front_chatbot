import { createContext, useState } from "react";
import { clientTypes } from "../@types/clientTypes";

interface ClientContextTypes {
    client: clientTypes | undefined,
    setClient: React.Dispatch<React.SetStateAction<clientTypes | undefined>>
}

export const ClientContext = createContext<ClientContextTypes>({
    client: undefined,
    setClient: () => { }
});

function ClientProvider({ children }: any) {
    const [client, setClient] = useState<clientTypes>();

    return (
        <ClientContext.Provider value={{ client, setClient }}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientProvider;