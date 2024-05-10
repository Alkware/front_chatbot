import { ChangeEvent, RefObject, useContext, useEffect, useRef } from "react";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../../components/modal/templates/PopOver";
import { ClientContext } from "../../context/ClientContext";
import { authenticateClient } from "../../api/client";

export function ConfirmEmail() {
    const { client, setClient } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext);
    const containerInputRef: RefObject<HTMLDivElement> = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            // Gerencia o thema dark e light
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark);

            // busca os dados do cliente
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token);

            if (clientIsLogged) {

                if (!clientIsLogged.data.client.verified_email) {
                    setClient(clientIsLogged.data.client)
                } else {
                    setModalContent({
                        componentName: "modal_success_already_check_email",
                        components: <PopOver
                            componentName="modal_success_already_check_email"
                            message="Seu e-mail já foi verificado!"
                            type="WARNING"
                            functionAfterComplete={() => navigate("/panel?tab=0")}
                        />
                    });
                }
            }
            else navigate("/login")
        })();
    }, [])


    const handleClickInput = (e: ChangeEvent<HTMLInputElement>) => {
        const currentIndex = e.currentTarget.tabIndex;
        const currentValue = e.currentTarget.value;
        let nextInput: any;


        if (currentValue !== "") nextInput = containerInputRef.current?.querySelector(`input[tabindex='${currentIndex + 1}']`);
        if (nextInput) nextInput.focus();

        e.currentTarget.value = e.currentTarget.value.substring(0, 1);
    }


    const handleConfirmEmail = () => {
        setModalContent({
            componentName: "modal_success_confirm_email",
            components: <PopOver
                componentName="modal_success_confirm_email"
                message="E-mail confirmado com sucesso!"
                functionAfterComplete={() => navigate("/panel?tab=0")}
            />
        });
    }


    return (
        client &&
        <div
            className="w-screen min-h-screen flex flex-col items-center justify-center relative bg-[url(https://i.ibb.co/2vrnfCz/Untitled-design-8.png)] dark:bg-[url(https://i.ibb.co/vxGTSd0/Untitled-design-4.png)] bg-no-repeat bg-cover"
        >
            <div className="bg-primary-50 dark:bg-primary-200 max-w-[60vw] text-dark dark:text-light flex flex-col items-center gap-4 p-4 rounded-md">
                <h2>Confirme seu e-mail</h2>
                <p>Enviaremos um código para o email {client.email}</p>
                <div
                    className="flex gap-2"
                    ref={containerInputRef}
                >
                    {
                        Array.from({ length: 6 }).map((_, index) =>
                            <input
                                tabIndex={index}
                                key={index}
                                type="text"
                                className="text-center"
                                onChange={handleClickInput}
                            />
                        )
                    }
                </div>
                <Button
                    customClass="mt-8"
                    onClick={handleConfirmEmail}
                >Confirmar</Button>
                <span
                className="underline opacity-60 cursor-pointer"
                >
                    Não é o seu e-mail?</span>
            </div>
        </div>
    )
};