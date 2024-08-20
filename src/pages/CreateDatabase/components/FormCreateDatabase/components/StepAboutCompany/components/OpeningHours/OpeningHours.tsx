import { useContext, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Select } from "../../../../../../../../components/Select/Select";
import { Client_Company } from "../../../../../../../../@types/clientCompany.types";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";
import { useForm } from "react-hook-form";
import { Button } from "../../../../../../../../components/button/Button";
import { SubTitle } from "../../../../../../../../components/SubTitle/SubTitle";
import { Title } from "../../../../../../../../components/Title/Title";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../variables/variables";

const weekdays = [
    { text: "Todos os dias", value: "Todos os dias" },
    { text: "Segunda à Sexta-feira", value: "Seg. a Sex" },
    { text: "Segunda à Sábado", value: "Seg. a Sab" },
    { text: "Segunda-feira", value: "Seg" },
    { text: "Terça-feira", value: "Ter" },
    { text: "Quarta-feira", value: "Qua" },
    { text: "Quinta-feira", value: "Qui" },
    { text: "Sexta-feira", value: "Sex" },
    { text: "Sábado", value: "Sab" },
    { text: "Domingo", value: "Dom" },
];

const hours = [
    { text: "06:00", value: "06:00" },
    { text: "06:30", value: "06:30" },
    { text: "07:00", value: "07:00" },
    { text: "07:30", value: "07:30" },
    { text: "08:00", value: "08:00" },
    { text: "08:30", value: "08:30" },
    { text: "09:00", value: "09:00" },
    { text: "09:30", value: "09:30" },
    { text: "10:00", value: "10:00" },
    { text: "10:30", value: "10:30" },
    { text: "11:00", value: "11:00" },
    { text: "11:30", value: "11:30" },
    { text: "12:00", value: "12:00" },
    { text: "12:30", value: "12:30" },
    { text: "13:00", value: "13:00" },
    { text: "13:30", value: "13:30" },
    { text: "14:00", value: "14:00" },
    { text: "14:30", value: "14:30" },
    { text: "15:00", value: "15:00" },
    { text: "15:30", value: "15:30" },
    { text: "16:00", value: "16:00" },
    { text: "16:30", value: "16:30" },
    { text: "17:00", value: "17:00" },
    { text: "17:30", value: "17:30" },
    { text: "18:00", value: "18:00" },
    { text: "18:30", value: "18:30" },
    { text: "19:00", value: "19:00" },
    { text: "19:30", value: "19:30" },
    { text: "20:00", value: "20:00" },
    { text: "20:30", value: "20:30" },
    { text: "21:00", value: "21:00" },
    { text: "21:30", value: "21:30" },
    { text: "22:00", value: "22:00" },
    { text: "22:30", value: "22:30" },
    { text: "23:00", value: "23:00" },
    { text: "23:30", value: "23:30" },
    { text: "00:00", value: "00:00" },
    { text: "00:30", value: "00:30" },
    { text: "01:00", value: "01:00" },
    { text: "01:30", value: "01:30" },
    { text: "02:00", value: "02:00" },
    { text: "02:30", value: "02:30" },
    { text: "03:00", value: "03:00" },
    { text: "03:30", value: "03:30" },
    { text: "04:00", value: "04:00" },
    { text: "04:30", value: "04:30" },
    { text: "05:00", value: "05:00" },
    { text: "05:30", value: "05:30" },
]

interface OpeningHours {
    name: string,
    company: Client_Company | undefined
}

export function OpeningHours({ name, company }: OpeningHours) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const [hoursSaved, setHours] = useState(company?.support_hours || []);
    const form = useForm();

    /**
     * Função responsável por exibir a modal para ser adicionado novos horarios...
     */
    const handleDisplayAddHours = () => {
        /**
         * Função responsável por adicionar um novo horario...
         * @param {Support_hours} data Objeto os dados do novo horário a ser adicionado
         */
        const handleAddHour = (data: any) => {
            // Atualiza o suporte humano no localstorage...
            const company_info = JSON.parse(localStorage.getItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
            company_info[name] = company_info[name] ? [...company_info[name], data] : [data];
            localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(company_info));
            // Atualiza o suporye humano no stage...
            setHours(values => [...values, data]);
            clearModal("modal_display_modal");
        }

        // modal...
        setModalContent({
            componentName: "modal_display_modal",
            components:
                <PopUp>
                    <Title>Adicione novo horário:</Title>
                    <form
                        className="flex gap-4 p-4 items-center"
                        onSubmit={form.handleSubmit(handleAddHour)}
                    >
                        <Select
                            name={`day`}
                            options={weekdays}
                            title="Selecione o dia"
                            formContext={form}
                        />

                        <Select
                            name={`start`}
                            options={hours}
                            title="Quando começa"
                            formContext={form}
                        />
                        <span>Até</span>
                        <Select
                            name={`end`}
                            options={hours}
                            title="Quando termina"
                            formContext={form}
                        />
                        <Button>
                            <MdAdd
                                className="text-2xl p-1 cursor-pointer bg-primary-100 rounded-full fill-primary-300"
                            />
                        </Button>
                    </form>
                </PopUp>
        })
    }

    /**
     * Função responsável por deletar um horario na lista de atendimento do cliente.
     * @param {number} index Index do horario a ser deletado
     */
    const handleDeleteHour = (index: number) => {
        const company_info = JSON.parse(localStorage.getItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
        company_info[name] = company_info[name].filter((_: any, i: number)=> i !== index);
        localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(company_info));

        setHours(hours => hours.filter((_, i) => i !== index ));
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
                    {hoursSaved.map((hour, index) =>
                        <div 
                            data-color={index % 2 === 0}
                            className="w-full flex gap-4 items-center bg-primary-200 data-[color=true]:bg-primary-300 px-4"
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
                                onClick={()=> handleDeleteHour(index)}
                                className="w-20 text-2xl cursor-pointer rounded-full fill-red-400"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};