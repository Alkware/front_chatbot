import { MdAdd } from "react-icons/md";
import { Button } from "../../../../../../../components/button/Button";
import { TextArea } from "../../../../../../../components/Form/components/Fields/TextArea/TextArea";
import { Select } from "../../../../../../../components/Select/Select";
import { Title } from "../../../../../../../components/Title/Title";
import { FieldValues, UseFieldArrayAppend, useForm } from "react-hook-form";
import { useContext } from "react";
import { ModalContext } from "../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../components/modal/templates/PopOver";

interface FormAddVariable { 
    append: UseFieldArrayAppend<any>
}

const options = [
    { text: "COR", value: "COR" },
    { text: "TAMANHO", value: "TAMANHO" },
    { text: "MARCA", value: "MARCA" },
    { text: "PESO", value: "PESO" },
    { text: "MODELO", value: "MODELO" },
    { text: "MATERIAL", value: "MATERIAL" },
    { text: "INGREDIENTES", value: "INGREDIENTES" },
    { text: "QUANTIDADE EM ESTOQUE", value: "QUANTIDADE EM ESTOQUE" },
    { text: "DIMENSÕES DE ENVIO", value: "DIMENSÕES DE ENVIO" },
];


export function FormAddVariable({ append }: FormAddVariable) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const formContext= useForm();


    function addVariable({ title, value}: FieldValues) {
        let errorMessage = null;

        if (!title) errorMessage = "Selecione uma característica";
        if (!value) errorMessage = "Digite o valor da característica";
        if (errorMessage !== null) {
            setModalContent({
                componentName: "modal_error_variable",
                components: <PopOver
                    componentName="modal_error_variable"
                    message={errorMessage}
                    type="WARNING"
                />
            });
            return;
        }

        append({ title, value });
        clearModal("modal_add_variable");
    }

    return (
        <div>
            <Title
                className="p-4"
            >Adicione uma nova variável</Title>
            <form
                onSubmit={formContext.handleSubmit(addVariable)}
                className="p-4 flex flex-col gap-6 items-center"
            >
                <Select
                    name="title"
                    title="Selecione uma característica"
                    options={options}
                    formContext={formContext}
                />
                <TextArea
                    name="value"
                    title="Digite os valores aqui:"
                    help="Caso queira adicionar mais de um valor adicione uma virgula (,) entre os valores: Ex: rosa, azul, preto..."
                    formContext={formContext}
                />
                <Button><MdAdd /> Adicionar</Button>
            </form>
        </div>
    )
};