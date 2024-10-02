import { FaPlus } from "react-icons/fa";
import { Button } from "../../../../../../../../../../components/button/Button";
import { useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp";
import { FormCreateCategory } from "./components/FormCreateCategory/FormCreateCategory";

interface ButtonCreateCategory { }

export function ButtonCreateCategory({ }: ButtonCreateCategory) {
    const { setModalContent } = useContext(ModalContext);

    const handleCreateCategory = () => {
        setModalContent({
            componentName: "modal_show_form",
            components: <PopUp><FormCreateCategory/></PopUp>
        })
    }

    return (
        <Button
            effectNeon={true}
            onClick={handleCreateCategory}
            customClass=""
        ><FaPlus /> Adicionar categoria</Button>
    )
};