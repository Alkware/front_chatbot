import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";
import { MdClose, MdDelete, MdSave } from "react-icons/md";
import { RefObject, useContext, useEffect, useRef } from "react";
import { Button } from "../../../../../../../../../../components/button/Button";
import { FormProvider, UseFieldArrayReturn, UseFormReturn, useForm } from "react-hook-form";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { Input } from "../../../../../../../../../../components/Input/Input";
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp";
import { Confirm } from "../../../../../../../../../../components/modal/templates/Confirm";
import { TextArea } from "../../../../../../../../../../components/TextArea/TextArea";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { AddVariables } from "../../../AddVariables/AddVariables";
import { ComomQuestions } from "../../../ComomQuestions/ComomQuestions";
import { Root } from "../../../../../../../../../../components/Form/FormRoot";


interface ModalCreateProduct {
    index: number;
    useFormReturn: UseFormReturn;
    useFieldArray: UseFieldArrayReturn<any>
}

export function ModalCreateProduct({ useFieldArray, useFormReturn, index }: ModalCreateProduct) {
    const { setModalContent, clearModal } = useContext(ModalContext)
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    const { append, update, remove } = useFieldArray;
    const products = useFormReturn.watch(`step_0.products`);
    const form = useForm({
        defaultValues: products[index]
    });


    useEffect(() => {
        const hasDataProduct = products[index];
        if (!hasDataProduct) append({ name: "", value: "", description: "" })
    }, [])

    // Função para salvar o produto...
    const handleSaveProduct = (data: any) => {
        if (data?.name && data?.value && data?.description) {
            update(index, data);
            clearModal("modal_add_product");
        } else {
            const emptyField = !data?.name  ? "nome do produto" : !data?.value  ? "valor do produto" : "descrição do produto"

            setModalContent({
                componentName: "modal_error_save_product",
                components: <PopOver
                    componentName="modal_error_save_product"
                    message={`O campo ${emptyField} não pode estar vazio`}
                    type="ERROR"
                />
            })
        }
    }

    // Função para sair da modal...
    const handleExitModal = () => {
        if (!products[index]?.name || !products[index]?.value) remove(index)
        clearModal("modal_add_product");
    }

    // Função para deletar o produto caso ele esteja em modo edição...
    const handleDeleteProduct = () => {
        setModalContent({
            componentName: "modal_delete_product",
            components: <PopUp>
                <Confirm
                    title="Deseja realmente excluir esse produto?"
                    cancelFuntion={() => clearModal("modal_delete_product")}
                    confirmFunction={() => {
                        remove(index)
                        clearModal("modal_add_product")
                        clearModal("modal_delete_product")
                    }}
                />
            </PopUp>
        })
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-screen overflow-hidden overflow-y-auto fixed top-0 left-0 z-[999] bg-primary-50 dark:bg-primary-200 rounded-md pt-4 md:py-4 flex flex-col justify-start md:justify-center items-center gap-6"
        >
            <h2 className="text-2xl font-bold">Cadastre seus produtos</h2>
            <div className="w-full p-2 flex gap-4 justify-end items-center rounded-md absolute top-0 right-2">
                <TipContainer 
                    tip="Sair" 
                    positionY="BOTTOM"
                    positionX="LEFT"
                >
                    <MdClose
                        onClick={handleExitModal}
                        className="bg-zinc-500/40 text-3xl p-1 cursor-pointer rounded-full"
                    />
                </TipContainer>
            </div>

            <FormProvider {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleSaveProduct)}
                    className="w-full flex flex-col justify-start md:justify-center items-center gap-6"
                >
                    <div
                        className="w-[90%] flex flex-col md:flex-row gap-6 justify-center items-center relative "
                    >

                        <Input
                            name="name"
                            title="De um nome a esse produto:"
                            register={form.register}
                        />

                        <Input
                            name={`value`}
                            onChange={({ target }: any) => {
                                const number = parseFloat(target.value.replace(/[^\d]/g, '')) / 100;
                                const formatNumber = number.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                });

                                target.value = formatNumber
                            }}
                            title="Qual o valor do produto?"
                            register={form.register}
                        />

                    </div>

                    <div className="w-[90%] flex justify-center items-center">
                        <TextArea
                            name={`description`}
                            title="Conte um pouco sobre seu produto e como ele funciona"
                            register={form.register}
                        />
                    </div>


                    <div className="w-[90%] flex justify-center items-center">
                        <Root.Optional
                            name={`optional_variable`}
                            text="Esse produto possui alguma caracteristica?"
                        >
                            <AddVariables />
                        </Root.Optional>
                    </div>

                    <div className="w-[90%] flex justify-center items-center">
                        <Root.Optional
                            name="questions"
                            text="Esse produto possui perguntas frequentes?"
                        >
                            <ComomQuestions />
                        </Root.Optional>
                    </div>

                    <Button
                        type="submit"
                        customClass="min-w-[200px]"
                    >Salvar <MdSave /></Button>

                    <Button
                        data-productbeingedited={!!products[index]?.name}
                        type="button"
                        customClass="bg-red-900 min-w-[200px] data-[productbeingedited=false]:hidden"
                        onClick={handleDeleteProduct}
                    >Excluir Produto <MdDelete /></Button>

                </form>
            </FormProvider>


        </div>
    )
};