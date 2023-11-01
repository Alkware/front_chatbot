import { useContext, useEffect, useState } from "react";
import Login from "../pages/Login/Login";
import Panel from "../pages/panel/Panel";
import { ClientContext } from "../context/ClientContext";
import { authenticateClient } from "../api/client";

function PrivateLoginPanel() {
    const { setClient } = useContext(ClientContext)
    const [ hasAccess, setAccess ] = useState<boolean>()

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token") || "";
            const tokenIsValid = await authenticateClient(token)

            if (tokenIsValid && tokenIsValid.status === 200) {
                const { client } = tokenIsValid.data
                setClient(client)
                setAccess(true)
            }else setAccess(false)
        })()
    }, [])

    return hasAccess !== undefined ? hasAccess ? <Panel /> : <Login /> : null
}

export default PrivateLoginPanel;