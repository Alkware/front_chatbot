import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { Root } from "../../../../components/Form/FormRoot";
import { SimulatorSlugUrl } from "../../../../components/Simulators/SimulatorSlugUrl/SimulatorSlugUrl";

interface StepAdvancedInfoChat { }

export function StepAdvancedInfoChat({ }: StepAdvancedInfoChat) {
    return (
        <Root.Container className="flex flex-col items-center p-2" >
            <Input
                name="slug"
                title="Altere a slug do seu chat"
            />

            <SimulatorSlugUrl />

            <div className="w-4/5 md:w-auto flex flex-col items-center md:items-start">
                <span className="font-medium uppercase">Lembre-se</span>
                <span className="opacity-70 text-center md:text-left">
                    Ao trocar a slug do seu chat, todos seus clientes que possuirem a URL antiga, podem perder acesso ao seu chat utilizando a antiga URL.
                </span>
            </div>
        </Root.Container>
    )
};