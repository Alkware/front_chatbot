import { FaPlus } from "react-icons/fa"
import { Title } from "../../../../../../../../../../../../components/Title/Title"
import { Button } from "../../../../../../../../../../../../components/button/Button"
import { SubTitle } from "../../../../../../../../../../../../components/SubTitle/SubTitle"
import { Products } from "../../../../../../../../../../../../@types/products.types"


interface CardProducts {
    items: Products[]
}

export function CardProducts({ items }: CardProducts) {

    return (
        <div className="flex flex-col">
            <div
                data-display={!!items[0].category?.name}
                className="w-full flex justify-between items-center bg-primary-100 px-4"
            >
                <Title
                    className="font-bold"
                >{items[0].category.name}</Title>
                <Button><FaPlus /> Adicionar produto</Button>
            </div>
            <div className="w-full flex gap-4 justify-start flex-wrap items-center bg-primary-50 p-4">
                {items.map(product => {
                    return (
                        <div
                            key={product.id}
                            className="w-20 h-20 flex items-center gap-4 relative hover:scale-105 cursor-pointer transition-transform"
                        >
                            <img
                                src={product.images[0]?.url || "https://via.placeholder.com/100"}
                                className="w-full h-full object-cover"
                            />
                            <SubTitle
                                className="absolute bottom-0 w-full bg-dark/80"
                            >{product.product_name}</SubTitle>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
};