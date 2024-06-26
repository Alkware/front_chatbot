import { FaBell } from "react-icons/fa";
import { Button } from "../../../../../../../../../../components/button/Button";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { MdLogout, MdNotificationImportant, MdNotifications } from "react-icons/md";
import { formatDate } from "../../../../../../../../../../functions/formatDate";
import { Notification_client } from "../../../../../../../../../../@types/notification_client";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp";
import { DisplayNotification } from "./components/DisplayNotification/DisplayNotification";
import { updateReadAllNotifications, updateReadNotification } from "../../../../../../../../../../api/notification";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";

export function Notification() {
    const { client } = useContext(ClientContext);
    const { setModalContent } = useContext(ModalContext)
    const [displayNotification, setDisplayNotification] = useState<boolean>();
    const [notifications, setNotifications] = useState<Notification_client[]>();
    const notification_number = notifications?.filter(notification => !notification.read)

    useEffect(() => {
        const sortNotifications = client?.notification_client?.sort((a, b) => {
            if (!a.read && b.read) return -1
            else if (a.read && !b.read) return 1
            else return 0
        })
        setNotifications(sortNotifications)
    }, [])


    // Função responsável por lidar com o clique do usuário na notificação...
    const handleClickNotification = async (notification: Notification_client) => {
        // Atualiza a notificação como lida.
        const response = await updateReadNotification(notification.id);
        if (response?.status === 200) {
            // Atualiza a quantidade de notificação no icone de notificação.
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

            // Exibi o modal com o conteúdo da notificação...
            setModalContent({
                componentName: "modal_display_notification",
                components:
                    <PopUp>
                        <DisplayNotification
                            notification={notification}
                            setDisplayNotification={setDisplayNotification}
                        />
                    </PopUp>
            })
        }
    }

    // Função responsável por marcar todas as notificações como lidas
    const handleAllNotificationsMarkedAsRead = async () => {
        if (!client) return;

        const response = await updateReadAllNotifications(client.id);

        if (response) {
            // Atualiza a quantidade de notificação no icone de notificação.
            setNotifications(values => {
                if (values) {
                    return values.map(value => {
                        value.read = true;
                        return value
                    })

                }
            })
        } else  // Exibi o modal informando que não foi possivel marcar como lida todas as notificações...
            setModalContent({
                componentName: "modal_failed_marked_read_notification",
                components:
                    <PopOver
                        componentName="modal_failed_marked_read_notification"
                        type="WARNING"
                        message="Não foi possível marcar todas as notificações como lida, por favor tente mais tarde!"
                    />
            })


    }

    return (
        <div className="relative">
            <div
                className="bg-primary-100 border border-light/50 rounded-full p-1"
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

            {/* Modal que mostra todas as notificação do usuário  */}
            <div
                data-display={!!displayNotification}
                className="w-full h-screen md:h-auto md:min-w-[400px] data-[display=false]:hidden flex flex-col fixed md:absolute z-50 md:rounded-md bg-primary-100 p-4 top-0 md:top-auto right-0 md:translate-x-[122px] md:my-2"
            >
                <MdLogout
                    className=" text-4xl absolute top-2 right-3  md:hidden"
                    onClick={() => setDisplayNotification(v => !v)}
                />
                <div className="w-full flex justify-between items-center border-b border-white/30 my-8 md:my-0">
                    <h2 className="text-xl font-bold text-light">Notificações</h2>
                    <Button onClick={handleAllNotificationsMarkedAsRead}>Marcar todas como lida</Button>
                </div>
                <div className="w-full flex flex-col  md:max-h-[300px] overflow-auto">
                    {
                        notifications?.length ? notifications?.map((notification) =>
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
                                    className="flex flex-col data-[isread=true]:opacity-60 text-light"
                                >
                                    <h2 className="font-medium text-lg">{notification.notification.title}</h2>
                                    <div className="flex gap-2 items-end px-2">
                                        <p className="w-2/3 line-clamp-1 opacity-90" dangerouslySetInnerHTML={{ __html: notification.notification.describe }}></p>
                                        <span className="text-xs opacity-70">{formatDate(notification.notification.created_at).dateFormat_A}</span>
                                    </div>
                                </div>
                            </div>
                        )
                            :
                            <h2 className="w-full text-center py-4">Você ainda não recebeu nenhuma notificação!</h2>
                    }
                </div>
            </div>
        </div>
    )
};