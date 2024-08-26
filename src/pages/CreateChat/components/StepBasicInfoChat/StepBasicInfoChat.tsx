import { useFormContext } from "react-hook-form";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { UploadUniqueFile } from "../../../../components/uploadUniqueImage/uploadUniqueImage";
import { LinkedImage } from "../../../../@types/images.types";

interface StepBasicInfoChat {
    client_id: string;
    imageDefault?: LinkedImage[]
}

export function StepBasicInfoChat({ client_id, imageDefault }: StepBasicInfoChat) {
    const form = useFormContext();

    return (
        <>
            <UploadUniqueFile
                name="step_0.logo_id"
                client_id={client_id}
                formContext={form}
                imageDefault={imageDefault}
            />
            <Input
                name="step_0.project_name"
                title="Escreva o nome do seu chat"
                widthContainer="w-full"
            />
            <TextArea
                name="step_0.chat_input_message.0"
                title="Digite a primeira mensagem do seu chat"
                maxText={100}
            />
            <TextArea
                name="step_1.bio"
                title="Digite uma descrição para seu chat"
            />
        </>
    )
};