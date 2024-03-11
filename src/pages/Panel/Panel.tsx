import { Suspense, useContext, useEffect, lazy } from "react";
import { authenticateClient } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import { InputLoading } from "../../components/loading/InputLoading";

const MainPanelClient = lazy(() => import("./components/MainPanelClient/MainPanelClient"));
const NavigatePanelClient = lazy(() => import("./components/NavigatePanelClient/NavigatePanelClient"));

function Panel() {
    const { setClient, client } = useContext(ClientContext)
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
        <Suspense fallback={<InputLoading />}>
            {
                client &&
                <div
                    className="w-screen h-screen overflow-hidden flex justify-start items-start text-dark dark:text-light"
                >
                    <NavigatePanelClient />
                    <MainPanelClient />
                </div>
            }
        </Suspense>
    )
}

export default Panel;