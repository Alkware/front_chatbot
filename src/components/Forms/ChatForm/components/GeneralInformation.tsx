import { InputFileForm } from "../../Components/InputFileForm";
import { InputTextForm } from "../../Components/InputTextForm";
import { TextareaForm } from "../../Components/TextareaForm";

export function GeneralInformation() {
    const chat = JSON.parse(localStorage.getItem("chat") || "{}")

    return (
        <div
            className="w-full h-full flex flex-col items-center animate-display-screen"
            id="container"
            data-index="general_information"
        >
            <InputTextForm
                field_name="project_name"
                title="Digite o nome do seu chat:"
                defaultValue={chat["project_name"]}
            />

            <TextareaForm
                field_name="bio"
                height={100}
                title="Digite a bio do seu chat"
                defaultValue={chat["bio"]}
            />

            <InputFileForm 
                defaultValue={chat["logo"]}
            />

        </div>
    )
};