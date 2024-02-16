import { ChangeEvent, InputHTMLAttributes, RefObject, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { uploadImage } from "../../../../api/uploadImages";
import { RiUpload2Line } from "react-icons/ri";

interface FormFile extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    sizeContainer: `${string}px`,
}

export function FormFile(props: FormFile) {
    const { register, watch, unregister } = useFormContext();
    const refUploadImg: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const preview = refUploadImg.current?.querySelector("div#preview-img");
        const label = refUploadImg.current?.querySelector("label");
        const img = preview?.querySelector("img");
        const logo = watch(props.name);

        if (logo) {
            preview?.classList.remove("hidden")
            preview?.classList.add("flex");
            label?.classList.remove("grayscale", "filter")

            img && (img.src = logo)
        }
    }, [watch()])

    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const containerUpload = e.currentTarget.closest(`div[data-id='${props.name}']`);
        const preview = containerUpload?.querySelector("div#preview-img");
        const img = preview?.querySelector("img");
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
            }

        }
    }



    return (
        <div
            className="flex justify-evenly items-center"
            data-id={props.name}
            ref={refUploadImg}
        >
            <label
                htmlFor={props.name}
                className=
                "w-[120px] h-[120px] relative overflow-hidden border border-dashed border-primary-100 bg-zinc-600/40 rounded-full p-2 cursor-pointer text-center flex jsutify-center items-center bg-[url(https://i.ibb.co/6gFGb2q/wipzee-logo-1-removebg-preview.png)] bg-no-repeat bg-cover bg-opacity-15 filter grayscale"
                style={{ width: props.sizeContainer, height: props.sizeContainer }}
            >
                <span className="w-full text-white bg-black bg-opacity-65 rounded-xl font-bold flex flex-col justify-center items-center">
                    <RiUpload2Line className="text-3xl font-bold" />
                    <span className="text-xs">upload</span>
                </span>

                <input
                    id={props.name}
                    type="file"
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={handleUploadImage}
                />

                <div id="preview-img" className="absolute left-0 top-0 hidden">
                    <img
                        className="w-full h-full object-cover"
                    />
                </div>
            </label>

        </div>

    )
};