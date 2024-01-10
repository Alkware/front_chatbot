import { RefObject, useEffect, useRef } from "react";
import { uploadImage } from "../../../../api/uploadImages";

interface FormFile {
    getValues?: any,
    register?: any
    fieldName: string
}

export function FormFile({ getValues, fieldName, register }: FormFile) {
    const refPreviewImage: RefObject<HTMLDivElement> = useRef(null);

    console.log(getValues)

    useEffect(() => {
        if (getValues && getValues('logo')) {
            refPreviewImage.current?.classList.add(`flex`)
            refPreviewImage.current?.classList.remove(`hidden`)
            refPreviewImage.current?.querySelector("div#loading")?.classList.remove("flex")
            refPreviewImage.current?.querySelector("div#loading")?.classList.add("hidden")
        }
    }, [])

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

                const form = new FormData();
                form.append('image', files[0]);
                const { data } = await uploadImage(form);
                register(fieldName, { [fieldName]: data.url })
                // RegisterDataLocalStorage(searchParams, setSearchParams, { dataset: { field_name: "logo" }, value: data.url })
                if (data) {
                    refPreviewImage.current?.querySelector("div#loading")?.classList.remove("flex")
                    refPreviewImage.current?.querySelector("div#loading")?.classList.add("hidden")
                }
            }
        } else alert("erro ao enviar a imagem");
    }



    return (
        getValues &&
        <div className="w-full flex justify-evenly items-center mt-4">
            <label
                className="border border-dashed border-primary-100 bg-zinc-600/40 rounded-md p-4 cursor-pointer flex gap-4 items-center"
                onChange={handleUploadImage}
            >
                Faça o upload da sua logo
                <input
                    type="file"
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .webp"
                />
                <div
                    ref={refPreviewImage}
                    className="hidden w-[35px] h-[35px] rounded-full overflow-hidden bg-zinc-500 relative"
                >
                    <img
                        data-isdefaultvalue={getValues("logo")}
                        src={getValues("logo")}
                        alt=""
                        className="w-full h-full object-cover data-[isdefaultvalue]:block hidden"
                    />
                    <div
                        id="loading"
                        className="w-full h-full bg-zinc-800/50 absolute flex justify-center items-center"
                    >
                        <div className="w-[40px] h-[40px] border-2 border-t-blue-600 rounded-full animate-spin">
                        </div>
                    </div>
                </div>
            </label>

        </div>

    )
};