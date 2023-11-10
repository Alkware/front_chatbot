import { AddInputForm } from "../ComponentsForms/AddInputForm";
import { InputTextForm } from "../ComponentsForms/InputTextForm";

interface GeneralInformationTypes {
    register: any,
    control: any,
}

export function GeneralInformation({ register, control }: GeneralInformationTypes) {
    return (
        <div
            className="w-full h-full flex flex-col items-center"
            id="container"
            data-index="general_information"
        >
            <h2 className="w-full text-center text-2xl p-4">Informações gerais do chat</h2>
            
            <InputTextForm
                register={register}
                field_name="project_name"
                placeholder="Ex: Calçados da ana"
                title="Digite o nome do seu chat:"
            />

            <InputTextForm
                field_name="logo"
                placeholder="ex.: https://imagem.png"
                register={register}
                title="Url da logo do seu chat"
            />

            <InputTextForm
                field_name="bio"
                placeholder="ex.: Olá, meu nome é ana e seja muito bem-vinda a minha loja de sapatos."
                title="Digite a bio do seu chat"
                register={register}
            />

            <AddInputForm 
                register={register}
                control={control}
            />
        </div>
    )
};