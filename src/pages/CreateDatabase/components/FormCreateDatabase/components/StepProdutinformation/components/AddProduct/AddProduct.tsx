import { MdAdd } from "react-icons/md";
import { ModalCreateProduct } from "./components/ModalCreateProduct/ModalCreateProduct";
import { useContext, useEffect } from "react";
import { UseFieldArrayReturn, useFieldArray, useFormContext } from "react-hook-form";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../variables/variables";

export function AddProduct() {
    const { setModalContent } = useContext(ModalContext)
    const useFormReturn = useFormContext();

    const useFieldArrayData: UseFieldArrayReturn = useFieldArray({
        name: 'step_0.products',
        control: useFormReturn.control,
    });

    // UseEffect: Toda vez que os fields mudarem será chamada a função saveAllProductsInLocalStorage
    useEffect(() => saveAllProductsInLocalStorage(), [useFieldArrayData.fields])

    // Responsavél por salvar o produto no localStorage e manter a consistencia de dados...
    const saveAllProductsInLocalStorage = () => {
        localStorage.setItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify({ products: useFieldArrayData.fields }));
    }

    // Abre o modal para ser criado um novo produto...
    const handleClickAddProduct = (index: number) => {
        setModalContent({
            componentName: "modal_add_product",
            components:
                <PopUp>
                    <ModalCreateProduct
                        useFieldArray={useFieldArrayData}
                        useFormReturn={useFormReturn}
                        index={index}
                    />
                </PopUp>
        })
    }


    return (
        <div className="w-full flex flex-col justify-start gap-4 px-2 md:px-4 overflow-hidden">
            <div className="w-full flex items-center justify-between my-4">
                <h2 className="w-full font-medium text-center text-lg md:text-xl">Cadastre seus produtos/serviços disponíveis</h2>
            </div>

            <div className="w-full min-h-40 flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 ">
                {useFieldArrayData.fields.map((field: any, index) =>
                    <div
                        key={field.id}
                        onClick={() => handleClickAddProduct(index)}
                        className="w-36 h-24 flex flex-col items-center justify-center text-primary-100 border border-primary-100 bg-primary-200 rounded-md cursor-pointer hover:scale-105 transition-transform"
                    >
                        <h2 className="font-bold w-full text-center whitespace-nowrap text-ellipsis overflow-hidden">{field.name}</h2>
                        <p>{field.value}</p>
                    </div>
                )}

                <div
                    onClick={() => handleClickAddProduct(useFieldArrayData.fields.length)}
                    className="w-36 h-24 flex flex-col items-center justify-center text-primary-100 border border-primary-100 rounded-md bg-primary-200 cursor-pointer hover:scale-105 transition-transform">
                    <MdAdd className="size-10" />
                </div>
            </div>
        </div>
    )
};