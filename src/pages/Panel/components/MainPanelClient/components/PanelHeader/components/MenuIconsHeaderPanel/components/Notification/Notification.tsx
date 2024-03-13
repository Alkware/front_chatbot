import { FaBell } from "react-icons/fa";
import { Button } from "../../../../../../../../../../components/button/Button";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { MdNotificationImportant, MdNotifications } from "react-icons/md";
import { formatDate } from "../../../../../../../../../../functions/formatDate";
import { Notification_client } from "../../../../../../../../../../@types/notification_client";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp";
import { DisplayNotification } from "./components/DisplayNotification/DisplayNotification";
import { updateReadNotification } from "../../../../../../../../../../api/notification";

export function Notification() {
    const { client } = useContext(ClientContext);
    const { setModalContent } = useContext(ModalContext)
    const [displayNotification, setDisplayNotification] = useState<Boolean>();
    const [notifications, setNotifications] = useState<Notification_client[]>();
    const notification_number = notifications?.filter(notification => !notification.read)

    useEffect(() => {
        const sortNotifications = client?.notification_client?.sort((a, b) => {
            if(!a.read && b.read) return -1
            else if(a.read && !b.read) return 1
            else return 0
        })
        setNotifications(sortNotifications)
    }, [])


    const handleClickNotification = async (notification: Notification_client) => {
        // Atualiza a notificação como lida.
        const response = await updateReadNotification(notification.id);
        if (response?.status === 200) {
            // Atualiza a quantidade de nootificação no icone de notificação.
            setNotifications(values => {
                if (values) {
                    const filterNotification = values.filter(v => v.id !== notification.id);
                    const findNotification = values.find(v => v.id === notification.id);
                    if (findNotification) {
                        findNotification.read = true;
                        filterNotification.push(findNotification);
                        return filterNotification
                    }
                }
            })

            setModalContent({
                componentName: "modal_display_notification",
                components:
                    <PopUp>
                        <DisplayNotification
                            notification={notification}
                        />
                    </PopUp>
            })
        }

    }

    return (
        <div className="relative">
            <div
                className="bg-primary-100 rounded-full p-1"
                onClick={() => setDisplayNotification(v => !v)}
            >
                <span
                    data-isnotification={!!notification_number?.length}
                    className="w-[20px] h-[20px] data-[isnotification=false]:hidden flex justify-center items-center text-xs bg-red-800 border border-primary-300 rounded-full absolute -top-[10px] -right-[10px]"
                >
                    {notification_number?.length}
                </span>
                <FaBell
                    className="text-2xl fill-light cursor-pointer"
                />
            </div>

            <div
                data-display={!!displayNotification}
                className="data-[display=false]:hidden flex flex-col absolute z-50 rounded-md bg-primary-100 p-4 right-0 translate-x-[122px] my-2 min-w-[400px]"
            >
                <div className="w-full flex justify-between items-center border-b border-white/30">
                    <h2 className="text-xl font-bold">Notificações</h2>
                    <Button>Marcar todas como lida</Button>
                </div>
                <div className="w-full flex flex-col">
                    {
                        notifications?.map((notification) =>
                            <div
                                className="flex gap-4 items-center min-h-[60px] border-b border-white/30 hover:bg-primary-200/50 transition-colors cursor-pointer"
                                key={notification.id}
                                onClick={() => handleClickNotification(notification)}
                            >
                                <div className="min-w-1/3">
                                    {
                                        !!notification.read ?
                                            <MdNotifications className="text-2xl fill-zinc-300" />
                                            :
                                            <MdNotificationImportant className="text-2xl fill-orange-400" />
                                    }
                                </div>

                                <div
                                    data-isread={!!notification.read}
                                    className="flex flex-col data-[isread=true]:opacity-60"
                                >
                                    <h2 className="font-medium text-lg">{notification.notification.title}</h2>
                                    <div className="flex gap-2 items-end px-2">
                                        <p className="w-2/3 line-clamp-1 opacity-90">{notification.notification.describe}</p>
                                        <span className="text-xs opacity-70">{formatDate(notification.notification.created_at).dateFormat_A}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};