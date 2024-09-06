import { v4 } from "uuid";
import { Select } from "../../../../../../../../../../components/Select/Select";
import { Title } from "../../../../../../../../../../components/Title/Title";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../../../variables/variables";
import { Button } from "../../../../../../../../../../components/button/Button";
import { MdAdd } from "react-icons/md";
import { Support_hours } from "../../../../../../../../../../@types/clientCompany.types";



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

interface FormAddHour {
    name: string,
    setHours: Dispatch<SetStateAction<Support_hours[] | undefined>>
}

export function FormAddHour({ name, setHours }: FormAddHour) {
    const { clearModal } = useContext(ModalContext);
    const form = useForm();

    /**
 * Função responsável por adicionar um novo horario...
 * @param {Support_hours} data Objeto os dados do novo horário a ser adicionado
 */
    const handleAddHour = (data: any) => {
        // Adiciona um id unico para o novo horário...
        data.id = v4();
        // Atualiza o suporte humano no localstorage...
        const company_info = JSON.parse(localStorage.getItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
        company_info[name] = company_info[name] ? [...company_info[name], data] : [data];
        localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(company_info));
        // Atualiza o suporye humano no stage...
        setHours(values => values ? [...values, data] : [data]);
        clearModal("modal_display_modal");
    }

    return (
        <div className="flex flex-col p-4">
            <Title>Adicione novo horário:</Title>
            <form
                className="flex flex-col gap-2 p-4 items-center"
                onSubmit={form.handleSubmit(handleAddHour)}
            >
                <Select
                    name={`day`}
                    options={weekdays}
                    title="Selecione o dia"
                    formContext={form}
                    className="min-w-[300px]"
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
                <Button customClass="mt-8">
                    <MdAdd
                        className="text-2xl p-1 cursor-pointer bg-primary-100 rounded-full fill-white"
                    />
                    Adicionar horário
                </Button>
            </form>
        </div>
    )
};