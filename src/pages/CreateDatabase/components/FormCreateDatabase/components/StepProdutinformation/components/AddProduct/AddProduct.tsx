import { MdAdd } from "react-icons/md";
import { ModalCreateProduct } from "./components/ModalCreateProduct/ModalCreateProduct";
import { useContext, useEffect } from "react";
import { UseFieldArrayReturn, useFieldArray, useFormContext } from "react-hook-form";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE, PREVIEW_IMAGE } from "../../../../../../../../variables/variables";

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
        <div className="w-full flex flex-col justify-start gap-4 px-2 md:px-4 overflow-hidden text-primary-100 dark:text-light">
            <div className="w-full flex items-center justify-between my-4">
                <h2 className="w-full font-medium text-center text-lg md:text-xl">Cadastre seus produtos/serviços disponíveis</h2>
            </div>

            <div className="w-full min-h-40 flex flex-nowrap md:flex-wrap overflow-auto justify-start md:justify-center gap-4 ">
                <div
                    onClick={() => handleClickAddProduct(useFieldArrayData.fields.length)}
                    className="w-36 min-w-[100px] h-24 flex flex-col items-center justify-center text-primary-100 border border-primary-100 rounded-md bg-primary-200 cursor-pointer hover:scale-105 transition-transform">
                    <MdAdd className="size-10" />
                </div>

                {useFieldArrayData.fields.map((field: any, index) =>
                    <div
                        key={field.id}
                        onClick={() => handleClickAddProduct(index)}
                        className="w-36 min-w-[100px] h-24  flex flex-col items-center justify-center overflow-hidden text-primary-100 border border-primary-100 bg-primary-200 rounded-md cursor-pointer hover:scale-105 transition-transform"
                    >
                        <div className="w-full h-full relative">
                            <div className="bg-black/50 absolute top-0 left-0 w-full h-full"></div>
                            <h3 className="w-full overflow-hidden whitespace-nowrap text-ellipsis px-1 text-center absolute bottom-0 bg-dark font-bold">{field.name}</h3>
                            <img
                                src={field?.image?.url || PREVIEW_IMAGE}
                                alt={`Imagem do produto: ${field.name}`}
                                className="w-full h-fullobject-cover"
                            />
                        </div>
                    </div>
                ).reverse()}


            </div>
        </div>
    )
};