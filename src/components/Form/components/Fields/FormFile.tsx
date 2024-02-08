import { ChangeEvent, InputHTMLAttributes, RefObject, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { uploadImage } from "../../../../api/uploadImages";

interface FormFile extends InputHTMLAttributes<HTMLInputElement> {
    name: string
}

export function FormFile(props: FormFile) {
    const { register, watch, unregister } = useFormContext();
    const refUploadImg: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const preview = refUploadImg.current?.querySelector("div#preview-img");
        const img = preview?.querySelector("img");
        const logo = watch(props.name);

        if (logo) {
            preview?.classList.remove("hidden")
            preview?.classList.add("flex");

            img && (img.src = logo)
        }
    }, [watch()])

    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const preview = refUploadImg.current?.querySelector("div#preview-img");
        const img = preview?.querySelector("img");
        const titleLabel = refUploadImg.current?.querySelector("label > span");
        titleLabel && (titleLabel.textContent = "Carregando...");
        const files = e.target.files

        if (files?.length) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload = (e) => {
                img && (img.src = e.target?.result as string)
            }

            const response = await uploadImage(files[0]);
            if (response?.status === 200) {
                unregister(props.name);
                register(props.name, { value: response.data.url })
                titleLabel && (titleLabel.textContent = "Mudar o avatar");
            }
        }
    }



    return (
        <div
            className="w-full flex justify-evenly items-center mt-4"
            ref={refUploadImg}
        >
            <label
                htmlFor="upload"
                className="border border-dashed border-primary-100 bg-zinc-600/40 rounded-md p-4 cursor-pointer flex gap-4 items-center"
            >
                <span>
                    Faça o upload da sua logo
                </span>
                <input
                    id="upload"
                    type="file"
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={handleUploadImage}
                />
            </label>

            <div
                className="hidden w-[100px] h-[100px] relative justify-center items-center rounded-full overflow-hidden"
                id="preview-img"
            >
                <img src="https://via.placeholder.com/100" alt="" />
            </div>

        </div>

    )
};