import { useSearchParams } from "react-router-dom";
import { Root } from "../../../../components/Form/FormRoot";
import { CHAT_ICONS_MODELS, ICON_NAME_URL } from "../../../../variables/variables";
import { useFormContext } from "react-hook-form";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";

interface StepCustomChat { }

export function StepCustomChat({ }: StepCustomChat) {
    const [params, setParams] = useSearchParams();
    const form = useFormContext();
    const currentIcon = Number(params.get(ICON_NAME_URL)) || 0


    const handleSelectIcon = (id: number) => {
        params.set(ICON_NAME_URL, id.toString())
        setParams(params)
        form.unregister("chat_appearance.chat_icon");
        form.register("chat_appearance.chat_icon", { value: id })
    }

    return (
        <Root.Container className="w-full flex flex-col items-center gap-8" >

            <div className="flex flex-col justify-center gap-4">
                <h2 className="text-center text-xl">Escolha um icone para seu chat</h2>
                <div className="flex justify-center gap-2 md:gap-4 text-5xl">
                    {
                        CHAT_ICONS_MODELS.map(({ Icon, id }, index: number) =>
                            <Icon
                                key={id}
                                data-iscurrent={(currentIcon - 1) === index}
                                className="hover:bg-primary-100 data-[iscurrent=true]:bg-primary-100 cursor-pointer rounded-full p-2"
                                onClick={() => handleSelectIcon(id)}
                            />
                        )
                    }
                </div>
            </div>

            <Input
                name="chat_appearance.icon_text"
                title="Digite o texto que será exibido ao lado do icon"
            />

            {/* <Root.Container
            className="w-full flex"
            title="Defina as cores do seu chat"
        >
            <Root.Color
                name="chat_appearance.primary_color"
                title="Escolha a cor primária do seu chat"
            />

            <Root.Color
                name="chat_appearance.second_color"
                title="Escolha a cor secundária do seu chat"
            />

            <Root.Color
                name="chat_appearance.background"
                title="Escolha a cor do background do seu chat"
            />

        </Root.Container> */}


        </Root.Container>
    )
};