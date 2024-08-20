import { Dispatch, SetStateAction, useContext, useState } from "react"
import { Button } from "../../../../../../../../components/button/Button"
import { Title } from "../../../../../../../../components/Title/Title"
import { Item } from "../../StepAddProducts"
import { MdAdd } from "react-icons/md";
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { UseFormRegister } from "react-hook-form";

interface ItemsList {
    title: string;
    list: Item[];
    items: Item[] | undefined;
    plan_management_id: string;
    type: "PRODUCT" | "SERVICE";
    setItems: Dispatch<SetStateAction<Item[] | undefined>>;
    register: UseFormRegister<any>;
}

export function ItemsList({ title, type, list, items, plan_management_id, register, setItems }: ItemsList) {
    const [isSelected, setIsSelected] = useState<Item[] | undefined>(items);
    const { clearModal } = useContext(ModalContext);
    const navigate = useNavigate();

    const handleCreateNewItem = () => {
        if (!list) return;

        const isProduct = type === "PRODUCT";
        isProduct ?
            navigate(`/create-product/${plan_management_id}/null?origin=database`)
            :
            navigate(`/create-service/${plan_management_id}/null?origin=database`);

        clearModal(null, { clearAll: true })
    }

    const handleSelectItem = (item: Item) => {
        const selected = isSelected?.find(select => select.id === item.id);
        if (selected) {
            setIsSelected(isSelected?.filter(select => select.id !== item.id))
            setItems(isSelected?.filter(select => select.id !== item.id))
        }
        else {
            const isProduct = type === "PRODUCT";
            const index  = !!items ? items.length > 0 ? (items.length - 1) : 0 : 0;
            register(isProduct ? `products_id.${index}` : `services_id.${index}`, { value: item.id })
            setIsSelected(values => values ? [...values, item] : [item]);
            setItems(values => values ? [...values, item] : [item]);
        }
    }

    const handleSelectAll = () => {
        setIsSelected(values => values ? [...values.filter(value => !list.find(l => l.id === value.id)), ...list] : list);
        setItems(values => values ? [...values.filter(value => !list.find(l => l.id === value.id)), ...list] : list);
    }

    return (
        <div className="w-full min-w-[50vw] flex flex-col gap-4 py-4">
            <div className="flex w-full justify-between">
                <Title>
                    {title}
                </Title>
                <Button onClick={handleSelectAll} customClass="px-1 py-0">Selecionar todos {!!isSelected?.length ? `(${isSelected.length})` : ""}</Button>
            </div>
            <div className="flex gap-2">
                {list.map(item =>
                    <div
                        data-isselected={!!isSelected?.find(selected => selected.id === item.id)}
                        className="group w-20 h-20 overflow-hidden cursor-pointer relative hover:scale-110 transition-transform rounded-md opacity-70  data-[isselected=true]:opacity-100 data-[isselected=true]:border-2 border-primary-100"
                        onClick={() => handleSelectItem(item)}
                    >
                        <div
                            className="w-4 h-4 bg-primary-100 absolute top-0 right-0 group-data-[isselected=false]:hidden"
                        > </div>
                        <img
                            src={item.images[0].url}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div
                    className="w-20 h-20 border border-primary-100 grid place-items-center cursor-pointer"
                    onClick={handleCreateNewItem}
                >
                    <TipContainer
                        tip={`Crie um novo ${type === "PRODUCT" ? "produto" : "serviço"}`}
                    >
                        <MdAdd />
                    </TipContainer>
                </div>
            </div>
        </div>
    )
};