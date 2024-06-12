import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { Button } from "../../../../../../../../../../components/button/Button";
import { FaSave } from "react-icons/fa";
import { InputPassword } from "./components/InputPassword/InputPassword";
import { changePasswordClient } from "../../../../../../../../../../api/client";
import { useContext } from "react";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";

export function ChangePassword() {
    const { setValue } = useFormContext();
    const formPassword = useForm();
    const { handleSubmit } = formPassword;
    const { client } = useContext(ClientContext);
    const { setModalContent, clearModal } = useContext(ModalContext)


    const handleChangePassword = async (data: any) => {
        if (!client) throw new Error("Client not founded.");
        if(data.new_password.length < 8 || data.current_password.length < 8){
            const existPasswordEmpty = !data.new_password.length || !data.current_password.length;
            const message = existPasswordEmpty ? "Preencha todos os dados" : "Informe uma senha com mais de 8 caracteres"

            setModalContent({
                componentName: "modal_error_fill_data",
                components:
                    <PopOver
                        message={message}
                        componentName="modal_error_fill_data"
                        type="WARNING"
                    />
            })
            return
        }

        if (data.new_password !== data.confirm_password) {
            setModalContent({
                componentName: "modal_error_new_password",
                components:
                    <PopOver
                        message="Sua confirmação de senha não é idêntica a sua nova senha!"
                        componentName="modal_error_new_password"
                        type="ERROR"
                    />
            })
            return
        }

        data.client_id = client.id;
        const response = await changePasswordClient(data);

        if (!response) {
            setModalContent({
                componentName: "modal_error_password",
                components: <PopOver message="A sua atual senha está incorreta!" componentName="modal_error_password" type="ERROR" />
            })
        }

        if (response?.status === 200) {
            setValue("password", data.new_password);

            setModalContent({
                componentName: "modal_change_password_success",
                components: <PopOver
                    message="Senha atualizada com sucesso!"
                    componentName="modal_change_password_success"
                    functionAfterComplete={()=> clearModal(null, { clearLast: true })}
                />
            })
        }

    }
    return (
        <FormProvider {...formPassword}>
            <form
                className="flex min-w-[200px] flex-col gap-8 p-4"
                onSubmit={handleSubmit(handleChangePassword)}
            >
                <div className="w-full flex gap-4 justify-between items-center">
                    <h2 className="whitespace-nowrap font-medium ">Sua senha atual:</h2>
                    <InputPassword name={"current_password"} />
                </div>

                <div className="w-full flex gap-4 justify-between items-center">
                    <h2 className="whitespace-nowrap font-medium ">Nova senha:</h2>
                    <InputPassword name={"new_password"} />
                </div>

                <div className="w-full flex gap-4 justify-between items-center">
                    <h2 className="whitespace-nowrap font-medium ">Confirme sua senha:</h2>
                    <InputPassword name={"confirm_password"} />
                </div>

                <Button
                    customClass="flex items-center gap-2"
                ><FaSave /> Salvar</Button>
            </form >
        </FormProvider>
    )
};