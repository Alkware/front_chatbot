import { Dispatch, SetStateAction } from "react";
import { Notification_client } from "../../../../../../../../../../../../@types/notification_client";
import { Button } from "../../../../../../../../../../../../components/button/Button";

interface DisplayNotification {
    notification: Notification_client;
    setDisplayNotification: Dispatch<SetStateAction<boolean | undefined>>
}

export function DisplayNotification({ notification, setDisplayNotification }: DisplayNotification) {

    const handleClickAction = () => {
        eval(notification.notification.code)
        setDisplayNotification(false)
    }



    return (
        <div className="flex flex-col justify-center items-center gap-4 min-w-[500px] max-w-[80vw] relative">
            <h2 className="w-full text-2xl text-center font-bold">{notification.notification.title}</h2>
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
