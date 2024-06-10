import { Dispatch, SetStateAction, useContext } from "react";
import { Notification_client } from "../../../../../../../../../../../../@types/notification_client";
import { Button } from "../../../../../../../../../../../../components/button/Button";
import { MdClose } from "react-icons/md";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";

interface DisplayNotification {
    notification: Notification_client;
    setDisplayNotification: Dispatch<SetStateAction<boolean | undefined>>
}

export function DisplayNotification({ notification, setDisplayNotification }: DisplayNotification) {
    const { clearModal } = useContext(ModalContext);

    const handleClickAction = () => {
        eval(notification.notification.code)
        setDisplayNotification(false)
    }



    return (
        <div className="flex flex-col justify-start md:justify-center items-center h-screen md:h-auto md:min-w-[500px] md:max-w-[80vw] gap-4 relative p-4">
            <MdClose
                className="absolute top-2 right-2 text-2xl bg-primary-100/60 rounded-full cursor-pointer"
                onClick={()=> clearModal(null, { clearLast: true })}
            />
            <h2 className="w-full text-2xl text-center font-bold py-6">{notification.notification.title}</h2>
            <p
                dangerouslySetInnerHTML={{ __html: notification.notification.describe }}
            ></p>

            <div className="flex p-4">
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
