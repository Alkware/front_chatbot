import { Notification_client } from "../../../../../../../../../../../../@types/notification_client";
import { Button } from "../../../../../../../../../../../../components/button/Button";

export function DisplayNotification({ notification }: { notification: Notification_client }) {
    return (
        <div className="flex flex-col justify-center items-center gap-4 min-w-[500px]">
            <h2 className="w-full text-2xl text-center font-bold">{notification.notification.title}</h2>
            <p
                dangerouslySetInnerHTML={{ __html: notification.notification.describe }}
            ></p>
            <div className="flex p-4">
                {
                    !!Object.keys(notification.notification.call_to_action).length &&
                    (
                        <Button
                            onClick={()=> window.open(notification.notification.call_to_action.link)}
                        >
                            {notification.notification.call_to_action.text}
                        </Button>
                    )
                }
            </div>
        </div>
    )
};
