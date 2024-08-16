import { useFieldArray, useFormContext } from "react-hook-form";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { useEffect } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Select } from "../../../../../../../../components/Select/Select";

const weekdays = [
    { text: "Segunda-feira", value: "Seg" },
    { text: "Terça-feira", value: "Ter" },
    { text: "Quarta-feira", value: "Qua" },
    { text: "Quinta-feira", value: "Qui" },
    { text: "Sexta-feira", value: "Sex" },
    { text: "Sábado", value: "Sab" },
    { text: "Domingo", value: "Dom" },
    { text: "Segunda à Sexta-feira", value: "Seg. a Sex" },
    { text: "Segunda à Sábado", value: "Seg. a Sab" },
    { text: "Todos os dias", value: "Todos os dias" },
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


export function OpeningHours() {
    const { control } = useFormContext();


    const { fields, append, remove } = useFieldArray({
        control,
        name: "step_3.support_hours"
    })

    useEffect(() => {
        !fields.length && append({ day: "", start: "", end: "" });
    }, []);

    return (
        <div>
            <h2 className="my-4 text-xl font-bold text-primary-100 dark:text-light">Qual seu horário para suporte humano?</h2>
            <div className="w-full flex flex-col gap-2 md:gap-4">
                {
                    fields.map((field, index) =>
                        <Root.Container
                            key={field.id}
                            className="w-full flex flex-col md:flex-row gap-1 md:gap-4 items-center"
                        >
                            <Select
                                name={`step_0.support_hours.${index}.day`}
                                options={weekdays}
                                title="Selecione o dia"
                            />

                            <Select
                                name={`step_0.support_hours.${index}.start`}
                                options={hours}
                                title="Quando começa"
                            />
                            <span>Até</span>
                            <Select
                                name={`step_0.support_hours.${index}.end`}
                                options={hours}
                                title="Quando termina"
                            />
                            <div className="w-full md:w-[200px] flex justify-end my-1 mb-4 md:m-0 gap-2">
                                <MdAdd
                                    data-islast={ index === (fields.length - 1)}
                                    onClick={() => append({ day: "", start: "", end: "" })}
                                    className="hidden data-[islast=true]:block text-2xl p-1 cursor-pointer bg-primary-100 rounded-full fill-primary-300"
                                />
                                <MdDelete
                                    onClick={() => fields.length > 1 && remove(index)}
                                    className="text-2xl p-1 cursor-pointer bg-red-200 rounded-full fill-red-700"
                                />
                            </div>
                        </Root.Container>
                    )
                }
            </div>
        </div>
    )
};