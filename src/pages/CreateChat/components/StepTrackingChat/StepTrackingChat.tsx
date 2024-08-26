import { Input } from "../../../../components/Form/components/Fields/Input/Input";

interface StepTrackingChat { }

export function StepTrackingChat({ }: StepTrackingChat) {
    return (
        <Input
            name="step_2.facebook_pixel"
            title="Adicione o pixel do seu facebook"
        />
    )
};