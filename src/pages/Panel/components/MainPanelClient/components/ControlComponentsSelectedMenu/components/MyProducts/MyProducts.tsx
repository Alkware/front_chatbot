import { Container } from "../../../../../../../../components/Container/Container";
import { useContext, useEffect, useState } from "react";
import { CardNoItems } from "./components/CardNoCategory/CardNoCategory";
import { CardWithItems } from "./components/CardWithCategory/CardWithCategory";
import { getAllProductsAndServices, ProductsAndServices } from "../../../../../../../../api/productAndServices";
import { ClientContext } from "../../../../../../../../context/ClientContext";

interface MyProducts { }

export interface Category {
    category_name: string;
    products: Array<{
        product_name: string;
        price: string;
    }>;
}

export function MyProducts({ }: MyProducts) {
    const { client } = useContext(ClientContext)
    const [offers, setOffers] = useState<ProductsAndServices>({ products: [], services: [] });

    useEffect(()=>{
        (async ()=>{
            if(!client) return;
            const offers = await getAllProductsAndServices(client?.plan_management.id);

            if(!offers) return;

            setOffers(offers);
        })();
    }, [])


    return (
        <Container title="Produtos">
            <div className="p-4 w-full flex flex-col justify-center items-center gap-4">
                {(offers.products.length || offers.services.length) ?
                    <CardWithItems
                        offers={offers}
                    />
                    :
                    <CardNoItems />
                }
            </div>
        </Container>
    )
};