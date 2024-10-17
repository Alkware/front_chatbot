import { useContext } from "react";
import { createLog } from "../api/log";
import { ModalContext } from "../context/ModalContext";
import { PopOver } from "../components/modal/templates/PopOver"

type SystemErrorType = {
    displayModalContent?: boolean;
    message: string, 
    path: string 
}

export function useSystemFail() {
    const { setModalContent } = useContext(ModalContext)

    const dispatchSystemError = ({ message, path, displayModalContent = false }: SystemErrorType ) => {
        createLog({
            level: "danger",
            log: message,
            path,
            sector: "Plataforma"
        });

        if(displayModalContent){
            setModalContent({
                componentName: "modal_failed",
                components: <PopOver componentName="modal_failed" message={message} type="ERROR"  />
            })
        }
 

    }

    return { dispatchSystemError };
}