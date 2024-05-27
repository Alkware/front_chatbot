import { useContext, useEffect, lazy } from "react";
import { authenticateClient } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";

const MainPanelClient = lazy(() => import("./components/MainPanelClient/MainPanelClient"));
const NavigatePanelClient = lazy(() => import("./components/NavigatePanelClient/NavigatePanelClient"));

function Panel() {
    const { setClient } = useContext(ClientContext)
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token);
            if (clientIsLogged) {
                setClient(clientIsLogged.data.client)
            }
            else navigate("/login")
        })();
    }, []);

    return (
        <div
            className="w-screen min-h-screen flex justify-start md:justify-center items-start text-primary-100 dark:text-light bg-light dark:bg-dark"
        >
            <NavigatePanelClient />
            <MainPanelClient />
        </div>
    )
}

export default Panel;