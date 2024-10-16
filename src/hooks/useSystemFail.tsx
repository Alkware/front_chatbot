import { useContext } from "react";
import { createLog } from "../api/log";
import { ModalContext } from "../context/ModalContext";
import { PopOver } from "../components/modal/templates/PopOver"

export function useSystemFail() {
    const { setModalContent } = useContext(ModalContext)

    const dispatchSystemError = ({ message, path }: { message: string, path: string }) => {
        createLog({
            level: "danger",
            log: message,
            path,
            sector: "Plataforma"
        });

        setModalContent({
            componentName: "modal_failed",
            components: <PopOver componentName="modal_failed" message={message} type="ERROR"  />
        })

    }

    return { dispatchSystemError };
}