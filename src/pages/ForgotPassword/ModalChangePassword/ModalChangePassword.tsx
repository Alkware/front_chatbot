import { useForm } from "react-hook-form";
import { Button } from "../../../components/button/Button";
import { InputPassword } from "../../Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/ConfigProfile/components/ChangePassword/components/InputPassword/InputPassword";

interface ModalChangePassword {
    onSubmit: (data: any) => Promise<void>;
}

export function ModalChangePassword({ onSubmit }: ModalChangePassword) {
    const form = useForm();


    return (
        <div className="p-4">
            <h2 className="text-center text-xl font-bold mb-8">Crie uma nova senha:</h2>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <InputPassword
                        name="password"
                        form={form}

                    />
                    <InputPassword
                        name="confirm"
                        form={form}
                    />
                </div>
                <Button
                    customClass="mx-auto mt-8"
                >Criar senha</Button>
            </form>
        </div>
    )
};