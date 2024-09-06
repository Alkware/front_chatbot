import { useContext, useEffect, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Client_Company, Support_hours } from "../../../../../../../../@types/clientCompany.types";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";
import { Button } from "../../../../../../../../components/button/Button";
import { SubTitle } from "../../../../../../../../components/SubTitle/SubTitle";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../variables/variables";
import { FormAddHour } from "./components/FormAddHour/FormAddHour";

interface OpeningHours {
    name: string;
    company: {
        current?: Client_Company;
        companies: Client_Company[] | undefined;
    } | undefined
}

export function OpeningHours({ name, company }: OpeningHours) {
    const { setModalContent } = useContext(ModalContext);
    const [hoursSaved, setHours] = useState<Support_hours[]>();

    useEffect(() => {
        if (!company) return;
        setHours(company.current?.support_hours)
    }, [company])

    /**
     * Função responsável por exibir a modal para ser adicionado novos horarios...
     */
    const handleDisplayAddHours = () => {
        // modal...
        setModalContent({
            componentName: "modal_display_modal",
            components:
                <PopUp>
                    <FormAddHour
                        name={name}
                        setHours={setHours}
                    />
                </PopUp>
        })
    }

    /**
     * Função responsável por deletar um horario na lista de atendimento do cliente.
     * @param {Support_hours} hour Informações do horário a ser deletado.
     */
    const handleDeleteHour = (hour: Support_hours) => {
        const company_info = JSON.parse(localStorage.getItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE) || "{}");

        setHours(hours => {
            if (hours) {
                const newHour = hours.filter((info: Support_hours) => info.id !== hour.id)
                company_info[name] = newHour;
                localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(company_info));
                return newHour
            } else return []
        });

    }

    return (
        <div>
            <h2 className="my-4 text-xl font-bold text-primary-100 dark:text-light">Qual seu horário para suporte humano?</h2>
            <div
                className="w-full flex flex-col items-start gap-2 md:gap-4"
            >
                <Button
                    type="button"
                    onClick={handleDisplayAddHours}
                ><MdAdd /> Adicionar horário</Button>
                <div className="w-full md:w-[400px] flex flex-col items-start my-1 mb-4 md:m-0">
                    {hoursSaved?.map((hour, index) =>
                        <div
                            key={index}
                            data-color={index % 2 === 0}
                            className="w-full flex gap-4 items-center bg-primary-300 data-[color=true]:bg-primary-200 px-4"
                        >
                            <div className="w-full flex flex-col items-center p-1">
                                <SubTitle className="whitespace-nowrap text-xs">Dia(s) da semana</SubTitle>
                                <span className="font-bold whitespace-nowrap">{hour.day}</span>
                            </div>
                            <div className="w-full flex flex-col items-center p-1">
                                <SubTitle className="whitespace-nowrap text-xs">Ínicio</SubTitle>
                                <span className="font-bold whitespace-nowrap">{hour.start}</span>
                            </div>
                            <div className="w-full flex flex-col items-center p-1">
                                <SubTitle className="whitespace-nowrap text-xs">Fim</SubTitle>
                                <span className="font-bold whitespace-nowrap">{hour.end}</span>
                            </div>
                            <MdDelete
                                onClick={() => handleDeleteHour(hour)}
                                className="w-20 text-2xl cursor-pointer rounded-full fill-red-400"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};