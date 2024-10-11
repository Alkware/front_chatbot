import { Heading } from "../../../../../../../../../../components/Heading/Heading";
import { ButtonCreateCategory } from "../ButtonCreateCategory/ButtonCreateCategory";

export function CardNoItems() {
    return (
        <div className="w-3/4 flex flex-col items-center gap-4 terceiro-teste">
            <Heading.h2>Cadastre seus produtos aqui</Heading.h2>
            <Heading.h3
            >
                É muito simples e fácil, basta criar um categoria e logo em seguida adicionar seus produtos
            </Heading.h3>
            <ButtonCreateCategory />
        </div>
    )
};