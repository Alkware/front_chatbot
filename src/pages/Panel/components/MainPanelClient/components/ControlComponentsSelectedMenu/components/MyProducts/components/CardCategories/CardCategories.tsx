import { FaPlus } from "react-icons/fa"
import { Button } from "../../../../../../../../../../components/button/Button"
import { Title } from "../../../../../../../../../../components/Title/Title"
import { Category } from "../../MyProducts"
import { SubTitle } from "../../../../../../../../../../components/SubTitle/SubTitle"
import { Dispatch, SetStateAction, useContext } from "react"
import { ModalContext } from "../../../../../../../../../../context/ModalContext"
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver"
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp"
import { useForm } from "react-hook-form"

interface CardCategories {
    category: Category;
    setCategories: Dispatch<SetStateAction<Category[] | []>>
}

export function CardCategories({ category, setCategories }: CardCategories) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { register, handleSubmit } = useForm();

    const handleCreateProduct = () => {

        function createCategory(data: any) {
            setCategories((values: Category[]) => {
                if (values) {
                    return values.map((value: Category) => {
                        if (value.category_name === category.category_name) {
                            return { ...value, products: !!value.products ? [...value.products, data] : [data] }
                        } else return value
                    });
                } else return []
            })
            setModalContent({
                componentName: "modal_success_category",
                components:
                    <PopOver
                        componentName="modal_success_category"
                        message="Produto criado com sucesso!"
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
                        <p>Nome do produto</p>
                        <input
                            type="text"
                            {...register("product_name")}
                        />
                        <p>Valor do produto</p>
                        <input
                            type="number"
                            {...register("value")}
                        />
                        <Button>Cadastrar produto</Button>
                    </form>
                </PopUp>
        })
    }

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center bg-primary-100 px-4">
                <Title
                    className="font-bold"
                >{category.category_name}</Title>
                <Button onClick={handleCreateProduct}><FaPlus /> Adicionar produto</Button>
            </div>
            <div className="w-full flex gap-4 justify-start flex-wrap items-center bg-primary-50 p-4">
                {category.products?.map(product =>
                    <div
                        key={product.product_name}
                        className="w-20 h-20 flex items-center gap-4 relative hover:scale-105 cursor-pointer transition-transform"
                    >
                        <img
                            src="https://via.placeholder.com/100"
                            className="w-full h-full object-cover"
                        />
                        <SubTitle
                            className="absolute bottom-0 w-full bg-dark/40"
                        >{product.product_name}</SubTitle>
                    </div>
                )}
            </div>
        </div>
    )
};