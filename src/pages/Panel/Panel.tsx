import { useContext, useEffect, lazy } from "react";
import { authenticateClient } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import { Loading } from "../../components/Loading/Loading";

const MainPanelClient = lazy(() => import("./components/MainPanelClient/MainPanelClient"));
const NavigatePanelClient = lazy(() => import("./components/NavigatePanelClient/NavigatePanelClient"));

function Panel() {
    const { setClient, client } = useContext(ClientContext)
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)


            // Busca os dados do cliente;
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token);
            if (clientIsLogged) {
                setClient(clientIsLogged.data.client)
            }
            else navigate("/login")
        })();
    }, []);

    return (
        <div className="w-screen min-h-screen flex items-center text-primary-100 dark:text-light bg-light dark:bg-dark">
            {
                !client ?
                    <Loading />
                    :
                    <div
                        className="w-full h-full flex justify-start md:justify-center items-start"
                    >
                        <NavigatePanelClient />
                        <MainPanelClient />

                    </div>
            }

        </div>
    )
}

export default Panel;