import { UseFormReturn } from "react-hook-form";
import { Select } from "../../../../Select/Select";
import { Text } from "../../../../Text/Text";

interface InputDate {
    name: string;
    title?: string;
    formContext?: UseFormReturn
}
const days = Array.from({ length: 31 }).map((_, index) => {
    ++index;
    const day = index.toString().padStart(2, "0");
    return { text: day, value: day }
})

const months = Array.from({ length: 12 }).map((_, index) => {
    ++index;
    const month = index.toString().padStart(2, "0");
    return { text: month, value: month }
});

const years = Array.from({ length: 10 }).map((_, index) => {
    const startYear = index + 2024;
    const year = startYear.toString().padStart(2, "0");
    return { text: year, value: year }
})

export function InputDate({ name, title, formContext }: InputDate) {
    const date = new Date();
    const currentDay = date.getDate().toString().padStart(2, "0");
    const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const currentYear = date.getFullYear().toString();
    
    return (
        <div className="flex flex-col">
            <Text.h2
                data-display={!!title}
                className="data-[display=false]:hidden text-base md:text-lg"
            >{title || ""}</Text.h2>
            <div className="flex gap-2">
                <Select
                    name={`${name}.day`}
                    options={days}
                    optionsDefault={[currentDay]}
                    title="Dia"
                    formContext={formContext}
                />
                <Select
                    name={`${name}.month`}
                    options={months}
                    optionsDefault={[currentMonth]}
                    title="Mês"
                    formContext={formContext}
                />
                <Select
                    name={`${name}.year`}
                    options={years}
                    optionsDefault={[currentYear]}
                    title="Ano"
                    formContext={formContext}
                />
            </div>
        </div>
    )
};