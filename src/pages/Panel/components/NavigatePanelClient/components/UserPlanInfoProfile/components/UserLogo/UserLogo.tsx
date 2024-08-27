import { useContext, useState } from "react"
import { ClientContext } from "../../../../../../../../context/ClientContext"
import { useSearchParams } from "react-router-dom";
import { RESIZE_MENU } from "../../../../../../../../variables/variables";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";
import { FileLibrary } from "../../../../../../../../components/FileLibrary/FileLibrary";
import { LinkedImage } from "../../../../../../../../@types/images.types";
import { updateClient } from "../../../../../../../../api/client";
import { Client } from "../../../../../../../../@types/Client.types";

export function UserLogo() {
    const { client } = useContext(ClientContext);
    const { setModalContent } = useContext(ModalContext);
    const [logo, setLogo] = useState<LinkedImage[] | undefined>(client?.logo ? [{ image: client.logo }] : []);
    const [params] = useSearchParams();
    const isMenuResized = params.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.VALUE;

    // const handleUploadImage = async (e: any) => {
    //     const files = e.target.files

    //     if (files.length) {
    //         if (files[0].size < 4000000) {
    //             const reader = new FileReader();
    //             reader.onload = (e) => {
    //                 if (refPreviewImage.current) {
    //                     const img = refPreviewImage.current.querySelector("img");
    //                     if (img && e.target?.result)
    //                         img.src = e.target.result.toString();
    //                 }
    //                 refPreviewImage.current?.classList.add(`flex`)
    //                 refPreviewImage.current?.classList.remove(`hidden`)
    //                 refPreviewImage.current?.querySelector("div#loading")?.classList.add("flex")
    //                 refPreviewImage.current?.querySelector("div#loading")?.classList.remove("hidden")
    //             }
    //             reader.readAsDataURL(files[0])


    //             const response = await uploadImage(files[0]);
    //             if (response?.data && client) {
    //                 await updateClient({ client_id: client?.id, logo: response.data.url })
    //                 refPreviewImage.current?.querySelector("div#loading")?.classList.remove("flex")
    //                 refPreviewImage.current?.querySelector("div#loading")?.classList.add("hidden")

    //             }
    //         }
    //     }
    // }

    const handleUploadImage = () => {
        if (!client) return;
        setModalContent({
            componentName: "modal_display_upload_image",
            components:
                <PopUp>
                    <FileLibrary
                        client_id={client.id}
                        setFiles={setLogo}
                        onAction={handleSelectImage}
                    />
                </PopUp>
        })
    }

    const handleSelectImage = async (logo_id: string[]) => {
        if(!client) return;
        const clientResponse: Client | void = await updateClient(client.id, { logo_id: logo_id[0] });
        clientResponse && setLogo([{ image: clientResponse.logo }])
    } 

    return (
        <div
            data-ismenuresized={isMenuResized}
            className="w-[100px] h-[100px] md:w-[40px] md:h-[40px] md:data-[ismenuresized=false]:w-[80px] md:data-[ismenuresized=false]:h-[80px] rounded-full overflow-hidden cursor-pointer border-4 border-primary-100 dark:border-light"
        >
            <img
                src={logo?.length ? logo[0].image.url : "https://via.placeholder.com/100"}
                alt=""
                className="w-full h-full object-contain"
                onClick={handleUploadImage}
            />

            <div
                id="loading"
                className="w-full h-full bg-zinc-800/50 absolute top-0 left-0 justify-center items-center hidden"
            >
                <div className="w-[40px] h-[40px] border-2 border-t-primary-300 rounded-full animate-spin">
                </div>
            </div>
        </div>
    )
};