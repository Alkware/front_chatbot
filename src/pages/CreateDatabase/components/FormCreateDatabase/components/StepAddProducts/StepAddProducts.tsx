import { MdAdd, MdDelete } from "react-icons/md";
import { Root } from "../../../../../../components/Form/FormRoot";
import { useContext, useState } from "react";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";
import { Product } from "../../../../../../@types/products.types";
import { getPlanManagementById } from "../../../../../../api/planManagement";
import { Service } from "../../../../../../@types/services.types";
import { Title } from "../../../../../../components/Title/Title";
import { ItemsList } from "./components/ItemsList/ItemsList";
import { Button } from "../../../../../../components/button/Button";
import { SubTitle } from "../../../../../../components/SubTitle/SubTitle";
import { useFormContext } from "react-hook-form";


export type Item = Product | Service;

interface StepAddProducts {
    plan_management_id: string

}

export function StepAddProducts({ plan_management_id }: StepAddProducts) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { register } = useFormContext();
    const [items, setItems] = useState<Item[]>();

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

    const handleDeleteItem = (id: string) => {
        setItems(items?.filter(i => i.id !== id))
    }

    return (
        <Root.Container>
            <div
            >
                <Title className="text-left font-medium">Produtos/Serviços</Title>
                <SubTitle className="text-left">Vincule seus produtos e serviços a sua inteligencia artificial para que ela obtenha conhecimento sobre eles.</SubTitle>
                <div className="flex gap-2 flex-wrap my-8">
                    {items?.map((item: any) =>
                        <div className="group w-20 h-20 overflow-hidden border border-primary-100 grid place-items-center cursor-pointer relative">
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
                                src={item.images[0].url}
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
            </div>

        </Root.Container>
    )
};