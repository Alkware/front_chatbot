import { useForm } from "react-hook-form";
import { Button } from "../../../../../../../../../../../../components/button/Button";
import { Input } from "../../../../../../../../../../../../components/Form/components/Fields/Input/Input";
import { Heading } from "../../../../../../../../../../../../components/Heading/Heading";
import { useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../../../../../components/modal/templates/PopUp";
import { DisplaySelectOfferType } from "./components/DisplaySelectOfferType/DisplaySelectOfferType";

interface FormCreateCategory { }

export function FormCreateCategory({ }: FormCreateCategory) {
    const { setModalContent } = useContext(ModalContext);
    const formContext = useForm();

    const handleDisplaySelectTypeOffer = ({ category_name }: any)=>{
        setModalContent({
            componentName: "modal_display_select_offer",
            components: <PopUp><DisplaySelectOfferType category_name={category_name}/></PopUp>
        })
    }

    return (
        <form
            onSubmit={formContext.handleSubmit(handleDisplaySelectTypeOffer)}
            className="max-w-[90vw] flex flex-col justify-center items-center gap-2 p-4"
        >
            <Heading.h2>Crie sua categoria</Heading.h2>
            <Heading.h3 className="max-w-[400px] opacity-70 md:text-base">Cadastre a categoria do seu produto, antes de adicionar produtos nela</Heading.h3>
            <div className="my-4 w-full">
                <Input
                    name="category_name"
                    title="De um nome para sua categoria"
                    formContext={formContext}
                />
            </div>

            <Button>Criar categoria</Button>

            <Button
                customClass="bg-transparent underline cursor-pointer opacity-70 mt-4"
            >Meu produto não tem categoria</Button>
        </form>
    )
};