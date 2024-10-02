import { useContext, useEffect, lazy, useRef, RefObject } from "react";
import { authenticateClient } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import { Loading } from "../../components/Loading/Loading";
import { Client } from "../../@types/Client.types";
import { ModalContext } from "../../context/ModalContext";
import { PopUp } from "../../components/modal/templates/PopUp";
import { ModalSaveCpfOrCnpj } from "./components/ModalSaveCpfOrCnpj/ModalSaveCpfOrCnpj";
import { convertDateInHour } from "../../functions/convertDateInHour";

const MainPanelClient = lazy(() => import("./components/MainPanelClient/MainPanelClient"));
const NavigatePanelClient = lazy(() => import("./components/NavigatePanelClient/NavigatePanelClient"));

function Panel() {
    const { setClient, client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext);
    const panelContainerRef: RefObject<HTMLDivElement> = useRef(null)
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)

            // Busca os dados do cliente;
            const token = localStorage.getItem("token");

            if (!token) return;

            const clientIsLogged: { client: Client, message: string } | void = await authenticateClient(token);

            if (clientIsLogged) {
                // Verifica se o cliente já possui um CPF OU CNPJ cadastrado, caso não possu-a será enviado um aviso para que ele inserira seus dados
                if (!clientIsLogged.client?.cpf_cnpj && convertDateInHour(clientIsLogged.client.created_at) > 24) {
                    setModalContent({
                        componentName: "modal_save_cpf_cnpj",
                        components:
                            <PopUp>
                                <ModalSaveCpfOrCnpj modalName="modal_save_cpf_cnpj" />
                            </PopUp>
                    })
                };

                setClient(clientIsLogged.client);
            }
            else navigate("/login")
        })();
    }, []);

    return (
        <div
            ref={panelContainerRef}
            className="w-screen min-h-screen flex items-center text-primary-100 dark:text-light bg-light dark:bg-dark"
        >
            {!client ?
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