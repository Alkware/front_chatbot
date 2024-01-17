import { RefObject, useEffect, useRef, useState } from "react";
import { uploadImage } from "../../../../api/uploadImages";
import { registerDataLocalStorage } from "../../../../functions/registerDataLocalStorage";
import { useSearchParams } from "react-router-dom";

interface FormFile {
    fieldName: string
    formName?: string
    defaultValue?: string,
}

export function FormFile({ fieldName, formName, defaultValue }: FormFile) {
    const refPreviewImage: RefObject<HTMLDivElement> = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [logo, setLogo] = useState(defaultValue);

    useEffect(() => {
        if(!formName) throw new Error("FormName is missing!")

        if (defaultValue) {
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
                if(data){
                    //registra a imagem no localstorage
                    registerDataLocalStorage({ dataset: { field_name: "logo" }, value: data.url }, formName)
                    //Remove o loading assim que a imagem é carregada
                    refPreviewImage.current?.querySelector("div#loading")?.classList.remove("flex")
                    refPreviewImage.current?.querySelector("div#loading")?.classList.add("hidden")
                    // Atualiza a logo no simulador de chat
                    const actions = searchParams.get("actions") || "0"
                    const increaseCharacter = Number(actions) + 1
                    searchParams.set("actions", increaseCharacter.toString())
                    setSearchParams(searchParams)
                    //Atauliza a logo da imagem exemplo 
                    setLogo(data.url)
                }
            }
        } else alert("erro ao enviar a imagem");
    }



    return (
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
                        data-isdefaultvalue={logo}
                        src={logo}
                        alt=""
                        className="w-full h-full object-cover data-[isdefaultvalue]:block hidden"
                    />
                    <div
                        id="loading"
                        className="w-full h-full bg-zinc-800/50 absolute flex justify-center items-center"
                    >
                        <div className="w-[20px] h-[20px] border-2 border-t-blue-600 rounded-full animate-spin">
                        </div>
                    </div>
                </div>
            </label>

        </div>

    )
};