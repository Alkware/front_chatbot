import { useSearchParams } from "react-router-dom";
import { InputFileForm } from "../../Components/InputFileForm";
import { InputTextForm } from "../../Components/InputTextForm";
import { TextareaForm } from "../../Components/TextareaForm";
import { STEP_NAME_URL } from "../../../../pages/CreateChat/components/ButtonSteps";

export function GeneralInformation() {
    const [params] = useSearchParams();
    const chat = JSON.parse(localStorage.getItem("chat") || "{}")


    return (
        <div
            data-display={params.get(STEP_NAME_URL) ? params.get(STEP_NAME_URL) === "0" : true}
            className="w-full h-full flex-col items-center animate-display-screen hidden data-[display='true']:flex"
        >
            <InputTextForm
                field_name="project_name"
                title="Digite o nome do seu chat:"
                defaultValue={chat["project_name"]}
            />

            {/* <TextareaForm
                field_name="bio"
                height={100}
                title="Digite a bio do seu chat"
                defaultValue={chat["bio"]}
            /> */}

            <InputFileForm
                defaultValue={chat["logo"]}
            />

        </div>
    )
};