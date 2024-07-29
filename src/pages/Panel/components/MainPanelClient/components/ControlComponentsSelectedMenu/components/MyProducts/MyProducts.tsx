import { Container } from "../../../../../../../../components/Container/Container";
import { useContext, useState } from "react";
import { CardNoCategory } from "./components/CardNoCategory/CardNoCategory";
import { CardCategories } from "./components/CardCategories/CardCategories";
import { Button } from "../../../../../../../../components/button/Button";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";

interface MyProducts { }

export interface Category {
    category_name: string;
    products: Array<{
        product_name: string;
        price: string;
    }>;
}

export function MyProducts({ }: MyProducts) {
    const [categories, setCategories] = useState<Category[]>([]);
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { handleSubmit, register } = useForm();

    const handleCreateCategory = () => {

        function createCategory(data: any) {
            setCategories((values: any) => [...values, data])
            setModalContent({
                componentName: "modal_success_category",
                components:
                    <PopOver
                        componentName="modal_success_category"
                        message="Categoria adicionada com sucesso!"
                        functionAfterComplete={() => clearModal("modal_create_category")}
                    />
            })
        }

        setModalContent({
            componentName: "modal_create_category",
            components:
                <PopUp>
                    <form
                        onSubmit={handleSubmit(createCategory)}
                        className="flex flex-col items-center"
                    >
                        <input
                            type="text"
                            {...register("category_name")}
                        />
                        <Button>Cadastrar categoria</Button>
                    </form>
                </PopUp>
        })
    }


    return (
        <Container title="Produtos">
            <div className="p-4 w-full flex flex-col justify-center items-center gap-4">
                {categories.length ?
                    <div className="w-full space-y-4">
                        <div className="w-full flex justify-end">
                            <Button
                                onClick={handleCreateCategory}
                            >Criar categoria</Button>
                        </div>
                        <div className="w-full">
                            {categories.map(category =>
                                <CardCategories
                                    setCategories={setCategories}
                                    category={category}
                                />
                            )}
                        </div>
                    </div>
                    :
                    <CardNoCategory
                        handleCreateCategory={handleCreateCategory}
                    />
                }
            </div>
        </Container>
    )
};