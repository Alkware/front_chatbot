import { useContext, useEffect, useState } from "react";
import { authenticateClient } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import { MainPanelClient } from "./components/MainPanelClient";
import NavigatePanelClient from "./components/NavigatePanelClient";



function Panel() {
    const { setClient } = useContext(ClientContext)
    const [access, setAccess] = useState<Boolean>();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token);
            if (clientIsLogged) {
                setClient(clientIsLogged.data.client)
                setAccess(true)
            }
            else navigate("/login")
        })();
    }, [])

    return (
        access &&
        <div
            className="w-screen h-screen overflow-hidden flex justify-start items-start  text-dark dark:text-light"
        >
            <NavigatePanelClient  />
            <MainPanelClient />
        </div>
    )
}

export default Panel;