import { SubTitle } from "../../../../../../../../../../components/SubTitle/SubTitle";
import { Title } from "../../../../../../../../../../components/Title/Title";
import { ButtonCreateCategory } from "../ButtonCreateCategory/ButtonCreateCategory";


interface CardNoItems { 
}

export function CardNoItems({ }: CardNoItems) {
    return (
        <div className="w-3/4 flex flex-col items-center gap-4">
            <Title>Cadastre seus produtos aqui</Title>
            <SubTitle
            >
                É muito simples e fácil, basta criar um categoria e logo em seguida adicionar seus produtos
            </SubTitle>
            <ButtonCreateCategory />
        </div>
    )
};