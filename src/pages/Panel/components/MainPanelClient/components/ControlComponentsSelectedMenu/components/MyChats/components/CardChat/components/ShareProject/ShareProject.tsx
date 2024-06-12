import { RefObject, useContext, useRef } from "react";
import { FaArrowUpRightFromSquare, FaCopy } from "react-icons/fa6";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";
import { TipContainer } from "../../../../../../../../../../../../components/TipContainer/TipContainer";
import { TutoralContainer } from "../../../../../../../../../../../../components/TutoralContainer/TutoralContainer";
import { QrCode } from "./components/QrCode/QrCode";
import { MdLogout } from "react-icons/md";

interface ShareProject {
    slug: string
}

export function ShareProject({ slug }: ShareProject) {
    const { setModalContent, clearModal } = useContext(ModalContext)
    const linkRef: RefObject<HTMLInputElement> = useRef(null)
    const widgetRef: RefObject<HTMLInputElement> = useRef(null)

    const handleFollowLink = () => {
        clearModal(null, { clearAll: true })
        window.open(`https://chat.wipzee.com/${slug}`)
    }

    const handleCopyLink = () => {
        try {
            const input = linkRef.current

            if (input) {
                input.classList.toggle("disabled")
                input.disabled = false;

                input.select();

                var successful = document.execCommand('copy');

                if (successful)
                    setModalContent({
                        componentName: "modal_copy_link",
                        components: <PopOver message="Link Copiado!" type="INFORMATION" componentName="modal_copy_link" />
                    })

                input.classList.toggle("disabled")
                input.disabled = true;
            }
        } catch (err) {
            setModalContent({
                componentName: "modal_failed_copy_link",
                components: <PopOver message="Falha ao copiar o link!" type="ERROR" componentName="modal_failed_copy_link" />
            })
        }
    }

    const handleCopyWidget = () => {
        try {
            const input = widgetRef.current

            if (input) {
                input.classList.toggle("disabled")
                input.disabled = false;

                input.select();

                var successful = document.execCommand('copy');

                if (successful)
                    setModalContent({
                        componentName: "modal_copy_widget",
                        components: <PopOver message="Widget Copiado!" type="INFORMATION" componentName="modal_copy_widget" />
                    })

                input.classList.toggle("disabled")
                input.disabled = true;
            }
        } catch (err) {
            setModalContent({
                componentName: "modal_failed_copy_widget",
                components: <PopOver message="Falha ao copiar o link!" type="ERROR" componentName="modal_failed_copy_widget" />
            })
        }
    }

    return (
        <div className="w-full h-screen md:h-auto flex flex-col gap-8 relative md:static p-4">
            <MdLogout 
                className="text-4xl rotate-180 md:hidden absolute"
                onClick={()=> clearModal(null, { clearLast: true})}
            />

            <div className="w-full flex flex-col gap-2 mt-12 md:mt-0">
                <h2 className="w-4/5 text-center uppercase">Link do seu chat</h2>

                <div className="w-full flex justify-between">
                    <input
                        ref={linkRef}
                        className="w-4/5 border border-light/20 p-2 rounded-xl disabled"
                        disabled={true}
                        defaultValue={`https://chat.wipzee.com/${slug}`}
                    />
                    <div className="flex justify-center items-center gap-4">
                        <TipContainer
                            tip="Copie seu link"
                        >
                            <FaCopy onClick={handleCopyLink} className=" text-2xl cursor-pointer" />
                        </TipContainer>
                        <TutoralContainer
                            title="Vamos abrir seu chat"
                            text="Clique no icone acima para abrir seu chat em uma nova guia para testa-lo"
                            positionX="LEFT"
                        >
                            <TipContainer
                                tip="Abra seu chat"
                            >
                                <FaArrowUpRightFromSquare onClick={handleFollowLink} className=" text-xl cursor-pointer" />
                            </TipContainer>
                        </TutoralContainer>
                    </div>
                </div>
                <span className="w-4/5 text-center opacity-60">Esse será o link que você enviará aos usuários que irão acessar seu chat.</span>
            </div>

            <div className="w-full flex flex-col gap-2">
                <h2 className="w-4/5 text-center uppercase">Código do Widget</h2>

                <div className="w-full flex justify-between">
                    <input
                        ref={widgetRef}
                        className="w-4/5 border border-light/20 p-2 rounded-xl disabled"
                        disabled={true}
                        defaultValue={`<script src="https://widget.wipzee.com/${slug}" defer></script>`}
                    />
                    <div className="w-1/5 flex justify-center items-center gap-4">
                        <FaCopy onClick={handleCopyWidget} className=" text-2xl cursor-pointer" />
                    </div>
                </div>
                <span className="w-4/5 text-center opacity-60">
                    Copie e cole esse código no head do html do seu site.
                </span>
            </div>

            <div className="w-full flex flex-col gap-2">
                <h2 className="w-4/5 text-center uppercase">QR CODE</h2>

                <QrCode
                    width={200}
                    text={`https://chat.wipzee.com/${slug}`}
                />
                
                <span className="w-4/5 text-center opacity-60">
                    Use esse QR CODE para acessar seu site facilmente
                </span>
            </div>
        </div>
    )
};