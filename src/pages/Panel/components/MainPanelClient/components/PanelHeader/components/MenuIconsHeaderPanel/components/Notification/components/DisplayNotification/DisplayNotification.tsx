import { Dispatch, SetStateAction, useContext } from "react";
import { Notification_client } from "../../../../../../../../../../../../@types/notification_client";
import { Button } from "../../../../../../../../../../../../components/button/Button";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";

interface DisplayNotification {
    notification: Notification_client;
    setDisplayNotification: Dispatch<SetStateAction<boolean | undefined>>
}

export function DisplayNotification({ notification, setDisplayNotification }: DisplayNotification) {
    const { clearModal } = useContext(ModalContext);

    const handleClickAction = () => {
        // eval(notification.notification.code)
        setDisplayNotification(false)
    }

    return (
        <div className="w-screen flex flex-col justify-start md:justify-center items-center min-h-screen md:min-h-0 md:min-w-[500px] md:max-w-[80vw] gap-4 relative p-4">
            <h2 className="w-full text-2xl text-center font-bold py-6">{notification.notification.title}</h2>
            <p
                dangerouslySetInnerHTML={{ __html: notification.notification.describe }}
                className="max-h-[70vh] overflow-auto"
            ></p>

            <div className="flex p-4 gap-8 items-center ">
                <span
                    className="underline opacity-80 cursor-pointer"
                    onClick={() => clearModal(null, { clearLast: true })}
                >Fechar</span>
                {
                    !!notification.notification.code &&
                    (
                        <Button
                            onClick={handleClickAction}
                        >
                            {notification.notification.cta_text}
                        </Button>
                    )
                }
            </div>
        </div>
    )
};
