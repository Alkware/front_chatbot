import { useContext, useEffect, useState } from "react";
import PanelHeader from "./components/molecules/PanelHeader";
import MainPanelClient from "./components/organims/MainPanelClient";
import { authenticateClient } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";

function Panel() {
    const { setClient } = useContext(ClientContext)
    const [access, setAccess] = useState<Boolean>();
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token);
            if(clientIsLogged) {
                setClient(clientIsLogged.data.client)
                setAccess(true)
            }
            else navigate("/login")
        })();
    },[])


    return (
        access &&
        <div className="w-screen h-screen flex flex-col bg-dark ">

            <PanelHeader />

            <MainPanelClient />

        </div>
    )
}

export default Panel;