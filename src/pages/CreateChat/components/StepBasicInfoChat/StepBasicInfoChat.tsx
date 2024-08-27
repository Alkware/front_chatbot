import { useFormContext } from "react-hook-form";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { UploadUniqueFile } from "../../../../components/UploadUniqueImage/UploadUniqueImage";
import { LinkedImage } from "../../../../@types/images.types";

interface StepBasicInfoChat {
    client_id: string;
    imageDefault?: LinkedImage[]
}

export function StepBasicInfoChat({ client_id, imageDefault }: StepBasicInfoChat) {
    const form = useFormContext();
    const isCreateChat = window.location.href.includes("create-chat");

    return (
        <>
            <UploadUniqueFile
                name="logo_id"
                client_id={client_id}
                formContext={form}
                imageDefault={imageDefault}
            />
            <Input
                name="project_name"
                title="Escreva o nome do seu chat"
                widthContainer="w-full"
            />
            <TextArea
                name="chat_input_message.0"
                title="Digite a primeira mensagem do seu chat"
                maxText={100}
            />
            <div
                data-display={isCreateChat}
                className="data-[display=true]:hidden"
            >
                <TextArea
                    name="bio"
                    title="Digite uma descrição para seu chat"

                />
            </div>
        </>
    )
};