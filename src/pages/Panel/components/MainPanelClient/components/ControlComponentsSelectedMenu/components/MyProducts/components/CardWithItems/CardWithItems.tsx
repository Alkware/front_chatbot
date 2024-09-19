import { MouseEvent, useState } from "react";
import { Product } from "../../../../../../../../../../@types/products.types";
import { ProductsAndServices } from "../../../../../../../../../../api/productAndServices";
import { Title } from "../../../../../../../../../../components/Title/Title";
import { CardProducts } from "./components/CardProducts/CardProducts";
import { ButtonCreateCategory } from "../ButtonCreateCategory/ButtonCreateCategory";
import { Service } from "../../../../../../../../../../@types/services.types";
import { CardServices } from "./components/CardServices/CardServices";

interface CardWithItems {
    offers: ProductsAndServices
}

export function CardWithItems({ offers }: CardWithItems) {
    const [productContainerIsActive, setProductContainerIsActive] = useState(!!offers.products.length);

    const products = offers.products.reduce((acc: Product[][], product) => {
        const existingCategory = acc.find((items) => items[0]?.category.name === product.category.name);

        if (existingCategory) {
            existingCategory.push(product)
        } else {
            acc.push([product])
        }

        return acc
    }, []);

    const services = offers.services.reduce((acc: Service[][], service) => {
        const existingCategory = acc.find((items) => items[0]?.category.name === service.category.name);

        if (existingCategory) {
            existingCategory.push(service)
        } else {
            acc.push([service])
        }

        return acc
    }, []);


    const handleChangeTab = ({ currentTarget }: MouseEvent<HTMLHeadingElement>) => {
        currentTarget.id === "product" ?
            setProductContainerIsActive(true)
            :
            setProductContainerIsActive(false)
    }

    return (
        <div className="w-full space-y-4">
            <div className="w-full flex justify-end">
                <ButtonCreateCategory />
            </div>

            <div>
                <div
                    data-display={!!(products.length && services.length)}
                    className="w-full flex justify-start data-[display=false]:hidden"
                >
                    <Title
                        id="product"
                        data-active={productContainerIsActive}
                        className="w-1/2 text-left data-[active=true]:bg-primary-100 dark:data-[active=true]:bg-primary-200 bg-primary-50 dark:bg-primary-300 text-light border border-primary-100 dark:border-primary-200 cursor-pointer p-2"
                        onClick={handleChangeTab}
                    >Produto(s)</Title>
                    <Title
                        id="service"
                        data-active={!productContainerIsActive}
                        className="w-1/2 text-left data-[active=true]:bg-primary-100 dark:data-[active=true]:bg-primary-200 bg-primary-50 dark:bg-primary-300 text-light border border-primary-100 dark:border-primary-200 cursor-pointer p-2"
                        onClick={handleChangeTab}
                    >Serviço(s)</Title>
                </div>

                <div
                    data-display={productContainerIsActive}
                    className="w-full data-[display=false]:hidden"
                >
                    {products.map((products) =>
                        <CardProducts
                            key={products[0].id}
                            items={products}
                        />
                    )}
                </div>
                <div
                    data-display={!productContainerIsActive}
                    className="w-full data-[display=false]:hidden"
                >
                    {services.map((services) =>
                        <CardServices
                            key={services[0].id}
                            items={services}
                        />
                    )}
                </div>
            </div>

        </div>
    )
};