import { RefObject, useContext, useRef } from "react"
import { ClientContext } from "../../../../../../../../context/ClientContext"
import { IoIosSave } from "react-icons/io";
import { updateClient } from "../../../../../../../../api/client";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";

export function ClientName() {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)
    const contentRef: RefObject<HTMLDivElement> = useRef(null)

    const handleEditClientName = ({ currentTarget }: any) => {
        currentTarget.dataset.overlay = false
        currentTarget.style.display = false;
        const input = contentRef.current?.querySelector("input")
        const div = contentRef.current
        const iconSave: any = contentRef.current?.querySelector("div[data-save]");
        if (input && div && iconSave) {
            div.classList.add("border")
            input.classList.remove("disabled")
            iconSave.dataset.save = true
        }
    }

    const handleSaveClientName = async () => {
        const input = contentRef.current?.querySelector("input")
        const div = contentRef.current
        const iconSave: any = contentRef.current?.querySelector("div[data-save]")
        const overlay: any = contentRef.current?.querySelector("div[data-overlay]")

        if (client) {
            const fullname = input?.value.split(" ");
            const [firstName, secondName] = fullname ? fullname : []

            if (firstName && secondName) {
                await updateClient({ client_id: client?.id, fullname: input?.value })

                if (input && div && iconSave) {
                    div.classList.remove("border")
                    input.classList.add("disabled")
                    iconSave.dataset.save = false
                    overlay.dataset.overlay = true
                    input.blur()
                }
            } else {
                setModalContent({
                    componentName: "modal_error_name",
                    components:
                        <PopOver
                            message="Digite seu nome e sobrenome"
                            type="WARNING"
                            componentName="modal_error_name"
                        />
                })
            }
        }
    }
    return (
        <TipContainer tip="2 cliques para editar seu nome">
            <div
                className="w-full px-2 flex justify-center gap-2 items-center rounded-lg relative"
                ref={contentRef}
            >
                <div
                    className="w-full h-full absolute data-[overlay=false]:hidden"
                    onDoubleClick={handleEditClientName}
                    data-testid="test-display"
                    data-overlay={true}
                ></div>

                <input
                    type="text"
                    className="text-xl bg-transparent text-center font-bold cursor-default whitespace-nowrap text-ellipsis overflow-hidden"
                    onKeyDown={(e) => e.code === "Enter" && handleSaveClientName()}
                    defaultValue={client?.fullname}
                />

                <div
                    data-save={false}
                    onClick={handleSaveClientName}
                    className="bg-light rounded-full justify-center items-center hidden data-[save=true]:flex"
                >
                    
                    <IoIosSave
                        className="fill-green-500 text-2xl cursor-pointer"
                        data-testid="button-save"
                    />

                </div>
            </div>
        </TipContainer>
    )
};