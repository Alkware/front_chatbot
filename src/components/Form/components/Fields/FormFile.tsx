import { ChangeEvent, InputHTMLAttributes, RefObject, useContext, useEffect, useRef } from "react";
import { FieldValues, UseFormReturn, useFormContext } from "react-hook-form";
import { uploadImage } from "../../../../api/images";
import { RiUpload2Line } from "react-icons/ri";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../modal/templates/PopOver";
import { loading } from "../../../../functions/loading";

interface FormFile extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    sizeContainer: `${string}px`,
    formContext?: UseFormReturn<FieldValues>;
}

export function FormFile({ name, sizeContainer, formContext }: FormFile) {
    const { setModalContent } = useContext(ModalContext)
    const context = formContext || useFormContext();
    const { watch, unregister, register } = context;

    const refUploadImg: RefObject<HTMLDivElement> = useRef(null);
    const loadingRef: RefObject<HTMLLabelElement> = useRef(null);

    useEffect(() => {
        const preview = refUploadImg.current?.querySelector("div#preview-img");
        const label = refUploadImg.current?.querySelector("label");
        const img = preview?.querySelector("img");
        const logo = watch(name);

        if (logo) {
            preview?.classList.remove("hidden")
            preview?.classList.add("flex");
            label?.classList.remove("grayscale", "filter")

            img && (img.src = logo)
        }
    }, [watch()])

    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        loading(loadingRef?.current, true, { blur: "sm" });

        const containerUpload = refUploadImg.current;
        const preview = containerUpload?.querySelector("div#preview-img");
        const img = preview?.querySelector("img");
        const files = e.target.files

        // Antes de fazer o upload
        const containerLoading = refUploadImg.current?.querySelector("span#container");
        const iconUpload = containerLoading?.querySelector("#icon-upload")
        const text = containerLoading?.querySelector("span")
        iconUpload?.classList.add("hidden")

        if (files?.length) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload = (e) => {
                img && (img.src = e.target?.result as string)
            }

            const response = await uploadImage(files[0]);

            if (response && response?.status === 200) {
                unregister(name);
                register(name, { value: response.data.url })
                loading(loadingRef?.current, false);
            } else {
                setModalContent({
                    componentName: "modal_error_upload_img",
                    components:
                        <PopOver
                            message="Não foi possivel fazer o upload da sua imagem, tente redimenciona-la ou use outra imagem."
                            componentName="modal_error_upload_img"
                            type="ERROR"
                        />
                });

                if (text) {
                    text.textContent = "upload"
                    iconUpload?.classList.remove("hidden")
                    loading(loadingRef?.current, false);
                }

            }

        }
    }



    return (
        <div
            className="flex justify-evenly items-center"
            data-id={name}
            ref={refUploadImg}
        >
            <label
                ref={loadingRef}
                htmlFor={name}
                className=
                "w-[120px] h-[120px] relative overflow-hidden border border-dashed border-primary-100 bg-zinc-600/40 rounded-full p-2 cursor-pointer text-center flex justify-center items-center bg-[url(https://i.ibb.co/6gFGb2q/wipzee-logo-1-removebg-preview.png)] bg-no-repeat bg-cover bg-opacity-15 filter grayscale"
                style={{ width: sizeContainer, height: sizeContainer }}
            >
                <span
                    className="w-full text-white bg-black bg-opacity-65 rounded-xl font-bold flex flex-col justify-center items-center"
                    id="container"
                >
                    <RiUpload2Line
                        className="text-3xl font-bold"
                        id="icon-upload"
                    />
                    <span className="text-xs">upload</span>
                </span>

                <input
                    id={name}
                    type="file"
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={handleUploadImage}
                />

                <div id="preview-img" className="w-full h-full absolute left-0 top-0 hidden">
                    <img
                        className="w-full h-full object-cover"
                    />
                </div>
            </label>

        </div>

    )
};