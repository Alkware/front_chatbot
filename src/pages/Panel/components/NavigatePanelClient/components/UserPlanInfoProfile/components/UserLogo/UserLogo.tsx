import { RefObject, useContext, useRef } from "react"
import { ClientContext } from "../../../../../../../../context/ClientContext"
import { uploadImage } from "../../../../../../../../api/uploadImages";
import { updateClient } from "../../../../../../../../api/client";
import { useSearchParams } from "react-router-dom";
import { RESIZE_MENU } from "../../../../../../../../variables/variables";


export function UserLogo() {
    const { client } = useContext(ClientContext)
    const refPreviewImage: RefObject<HTMLLabelElement> = useRef(null);
    const [params] = useSearchParams();
    const isMenuResized = params.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.DEFAULT_VALUES.DEFAULT ? true : false;

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
            data-ismenuresized={isMenuResized}
            className="w-[100px] h-[100px] md:w-[40px] md:h-[40px] md:data-[ismenuresized=true]:w-[80px] md:data-[ismenuresized=true]:h-[80px] rounded-full overflow-hidden cursor-pointer border-4 border-primary-100 dark:border-light"
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
                    className="w-full h-full object-contain"
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