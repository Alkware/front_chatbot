import { FaPlus } from "react-icons/fa";
import { Button } from "../../../../../../../../../../components/button/Button";
import { SubTitle } from "../../../../../../../../../../components/SubTitle/SubTitle";
import { Title } from "../../../../../../../../../../components/Title/Title";


interface CardNoCategory { 
    handleCreateCategory: () => void;
}

export function CardNoCategory({ handleCreateCategory }: CardNoCategory) {
    return (
        <div className="w-3/4 flex flex-col items-center gap-4">
            <Title>Cadastre seus produtos aqui</Title>
            <SubTitle
            >
                É muito simples e fácil, basta criar um categoria e logo em seguida adicionar seus produtos
            </SubTitle>
            <Button
                effectNeon={true}
                onClick={handleCreateCategory}
            ><FaPlus /> Adicionar categoria</Button>
        </div>
    )
};