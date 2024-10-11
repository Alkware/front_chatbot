import { MdAdd, MdDelete } from "react-icons/md";
import { Root } from "../../../../../../components/Form/FormRoot";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";
import { Product } from "../../../../../../@types/products.types";
import { getPlanManagementById } from "../../../../../../api/planManagement";
import { Service } from "../../../../../../@types/services.types";
import { ItemsList } from "./components/ItemsList/ItemsList";
import { Button } from "../../../../../../components/button/Button";
import { useFormContext } from "react-hook-form";
import { Ai_products_Services } from "../../../../../../@types/artificialInteligence.types";
import { Heading } from "../../../../../../components/Heading/Heading";

export type Item = Product | Service;

interface StepAddProducts {
    plan_management_id: string
    ai_products_services?: Ai_products_Services[]
}

export function StepAddProducts({ plan_management_id, ai_products_services }: StepAddProducts) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { register, unregister, watch } = useFormContext();
    const [items, setItems] = useState<Item[]>();
    const productsRegister: string[] = watch("products_id");
    const servicesRegister: string[] = watch("services_id");

    useEffect(() => {
        const products = ai_products_services?.map(ai => ai.product).filter(product => !!product) || [];
        const services = ai_products_services?.map(ai => ai.service).filter(service => !!service) || [];
        setItems(values => values ? [...values, ...products, ...services] : [...products, ...services]);
    }, [])

    // UseEffect para registrar os valores dos produtos ou serviços selecionados...
    useEffect(() => {
        productsRegister?.forEach((_, index) => unregister(`products_id.${index}`));
        servicesRegister?.forEach((_, index) => unregister(`services_id.${index}`));

        const products = items?.filter((item: any) => !!item.product_name);
        const services = items?.filter((item: any) => !!item.service_name);

        products?.forEach((product, index) => register(`products_id.${index}`, { value: product.id }));
        services?.forEach((product, index) => register(`services_id.${index}`, { value: product.id }));
    }, [items])

    /**
     * Função responsável por exibir uma modal para que seja selcionado os produtos ou serviços..
     */
    const handleDisplayModalProducts = async () => {

        const planManagement = await getPlanManagementById(plan_management_id);

        if (!planManagement) return;


        setModalContent({
            componentName: "modal_display_modal",
            components:
                <PopUp>
                    <div className="flex flex-col items-center p-4">
                        <ItemsList
                            title="Produto(s)"
                            type="PRODUCT"
                            plan_management_id={plan_management_id}
                            list={planManagement.products}
                            items={items}
                            setItems={setItems}
                            register={register}
                        />
                        <ItemsList
                            title="SERVIÇOS"
                            type="SERVICE"
                            plan_management_id={plan_management_id}
                            list={planManagement.services}
                            items={items}
                            setItems={setItems}
                            register={register}
                        />
                        <Button onClick={() => clearModal("modal_display_modal")}>Pronto</Button>
                    </div>
                </PopUp>
        })
    }

    /**
     * Função responsável por deletar um produto ou serviço da lista de selecionados    
     * @param {string} id Id unico do produto ou serviço a ser removido! 
     */
    const handleDeleteItem = (id: string) => {
        setItems(items?.filter(i => i.id !== id))
    }

    return (
        <Root.Container>
            <Heading.h2 className="text-left font-medium">Produtos/Serviços</Heading.h2>
            <Heading.h3 className="text-left">Vincule seus produtos e serviços a sua inteligencia artificial para que ela obtenha conhecimento sobre eles.</Heading.h3>
            <div className="flex gap-2 flex-wrap my-8">
                {items?.map((item: Omit<Item, "product_name"> & { product_name?: string }) =>
                    <div
                        key={item.id}
                        className="group w-20 h-20 overflow-hidden border border-primary-100 grid place-items-center cursor-pointer relative"
                    >
                        <div className="absolute top-0 left-0 w-full bg-dark/80 grid place-items-center">
                            <span className="text-xs">{item?.product_name ? "Produto" : "Serviço"}</span>
                        </div>
                        <div
                            className="hidden group-hover:grid w-full h-full absolute bg-dark/70 place-items-center"
                            onClick={() => handleDeleteItem(item.id)}
                        >
                            <MdDelete className="size-8 fill-red-400" />
                        </div>
                        <img
                            src={item?.image_main?.url || "https://via.placeholder.com/100"}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div
                    className="w-20 h-20 border border-primary-100 grid place-items-center cursor-pointer"
                    onClick={handleDisplayModalProducts}
                >
                    <MdAdd />
                </div>
            </div>
        </Root.Container>
    )
};