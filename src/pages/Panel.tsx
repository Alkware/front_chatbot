import { useContext, useEffect } from "react";
import { authenticateClient } from "../api/client";
import { useNavigate } from "react-router-dom";
import PanelHeader from "../components/templates/PanelHeader";
import MainPanelClient from "../components/templates/MainPanelClient";
import { ClientContext } from "../context/ClientContext";

function Panel() {
    const { setClient } = useContext(ClientContext)
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            const token = localStorage.getItem("token") || "";

            const tokenIsValid = await authenticateClient(token)

            if (tokenIsValid && tokenIsValid.status === 200) {
                const { client } = tokenIsValid.data
                setClient(client)
            } else navigate("/login")

        })()
    }, [])


    return (
        <div className="w-screen h-screen flex flex-col bg-dark ">

            <PanelHeader />

            <MainPanelClient />

        </div>
    )
}

export default Panel;