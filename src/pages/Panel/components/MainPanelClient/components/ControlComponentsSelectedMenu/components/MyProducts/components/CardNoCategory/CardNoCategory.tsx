import { Text } from "../../../../../../../../../../components/Text/Text";
import { ButtonCreateCategory } from "../ButtonCreateCategory/ButtonCreateCategory";

export function CardNoItems() {
    return (
        <div className="w-3/4 flex flex-col items-center gap-4 terceiro-teste">
            <Text.h2>Cadastre seus produtos aqui</Text.h2>
            <Text.h3
            >
                É muito simples e fácil, basta criar um categoria e logo em seguida adicionar seus produtos
            </Text.h3>
            <ButtonCreateCategory />
        </div>
    )
};