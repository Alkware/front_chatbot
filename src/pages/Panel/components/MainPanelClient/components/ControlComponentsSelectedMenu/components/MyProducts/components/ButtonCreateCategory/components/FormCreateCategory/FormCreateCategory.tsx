import { useForm } from "react-hook-form";
import { Button } from "../../../../../../../../../../../../components/button/Button";
import { Input } from "../../../../../../../../../../../../components/Form/components/Fields/Input/Input";
import { SubTitle } from "../../../../../../../../../../../../components/SubTitle/SubTitle";
import { Title } from "../../../../../../../../../../../../components/Title/Title";
import { useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../../../../../../../components/modal/templates/PopUp";
import { DisplaySelectOfferType } from "./components/DisplaySelectOfferType/DisplaySelectOfferType";

interface FormCreateCategory { }

export function FormCreateCategory({ }: FormCreateCategory) {
    const { setModalContent } = useContext(ModalContext);
    const { register, handleSubmit } = useForm();

    const handleDisplaySelectTypeOffer = ({ category_name }: any)=>{
        setModalContent({
            componentName: "modal_display_select_offer",
            components: <PopUp><DisplaySelectOfferType category_name={category_name}/></PopUp>
        })
    }

    return (
        <form
            onSubmit={handleSubmit(handleDisplaySelectTypeOffer)}
            className="flex flex-col justify-center items-center gap-2 p-4"
        >
            <Title>Crie sua categoria</Title>
            <SubTitle className="max-w-[400px] opacity-70 md:text-base">Cadastre a categoria do seu produto, antes de adicionar produtos nela</SubTitle>
            <div className="my-4 w-full">
                <Input
                    name="category_name"
                    title="De um nome para sua categoria"
                    register={register}
                />
            </div>

            <Button>Criar categoria</Button>

            <Button
                customClass="bg-transparent underline cursor-pointer opacity-70 mt-4"
            >Meu produto não tem categoria</Button>
        </form>
    )
};