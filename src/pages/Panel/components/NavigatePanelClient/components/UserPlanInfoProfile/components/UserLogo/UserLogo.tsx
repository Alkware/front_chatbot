import { RefObject, useContext, useRef } from "react"
import { ClientContext } from "../../../../../../../../context/ClientContext"
import { uploadImage } from "../../../../../../../../api/uploadImages";
import { updateClient } from "../../../../../../../../api/client";

interface UserLogo {
    menuIsOpen: boolean
}

export function UserLogo({ menuIsOpen }: UserLogo) {
    const { client } = useContext(ClientContext)
    const refPreviewImage: RefObject<HTMLLabelElement> = useRef(null);

    const handleUploadImage = async (e: any) => {
        const files = e.target.files

        if (files.length) {
            if (files[0].size < 4000000) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (refPreviewImage.current) {
                        const img = refPreviewImage.current.querySelector("img");
                        if (img && e.target?.result)
                            img.src = e.target.result.toString();
                    }
                    refPreviewImage.current?.classList.add(`flex`)
                    refPreviewImage.current?.classList.remove(`hidden`)
                    refPreviewImage.current?.querySelector("div#loading")?.classList.add("flex")
                    refPreviewImage.current?.querySelector("div#loading")?.classList.remove("hidden")
                }
                reader.readAsDataURL(files[0])


                const response = await uploadImage(files[0]);
                if (response?.data && client) {
                    await updateClient({ client_id: client?.id, logo: response.data.url })
                    refPreviewImage.current?.querySelector("div#loading")?.classList.remove("flex")
                    refPreviewImage.current?.querySelector("div#loading")?.classList.add("hidden")

                }
            }
        }
    }

    return (
        <div
            data-menuisopen={menuIsOpen}
            className="w-[40px] h-[40px] data-[menuisopen=true]:w-[100px] data-[menuisopen=true]:h-[100px] rounded-full overflow-hidden cursor-pointer border-4 border-primary-100 dark:border-light"
        >
            <label
                className="w-full h-full relative cursor-pointer"
                ref={refPreviewImage}
                onChange={handleUploadImage}
            >
                <input
                    type="file"
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .webp"
                />

                <img
                    src={client?.logo || "https://via.placeholder.com/100"}
                    alt=""
                    className="w-full h-full object-cover"
                />

                <div
                    id="loading"
                    className="w-full h-full bg-zinc-800/50 absolute top-0 left-0 justify-center items-center hidden"
                >
                    <div className="w-[40px] h-[40px] border-2 border-t-primary-300 rounded-full animate-spin">
                    </div>
                </div>
            </label>


        </div>
    )
};