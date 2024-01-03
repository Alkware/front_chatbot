import { InputFileForm } from "../ComponentsForms/InputFileForm";
import { InputTextForm } from "../ComponentsForms/InputTextForm";
import { TextareaForm } from "../ComponentsForms/TextareaForm";

export function GeneralInformation() {
    return (
        <div
            className="w-full h-full flex flex-col items-center animate-display-screen"
            id="container"
            data-index="general_information"
        >
            <InputTextForm
                field_name="project_name"
                title="Digite o nome do seu chat:"
            />

            <TextareaForm
                field_name="bio"
                height={100}
                title="Digite a bio do seu chat"
            />

            <InputFileForm 
                field_name="logo"
            />

        </div>
    )
};