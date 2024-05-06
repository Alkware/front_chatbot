import { useEffect } from "react";
import { Container } from "../../../../../../../../components/Container/Container";
import { useSearchParams } from "react-router-dom";

export function HelpCenter() {
    const [ params, setParams] = useSearchParams();

    useEffect(()=>{
        window.open("https://wa.me/5535991368790")
        params.set("tab", "0");
        setParams(params)
        window.location.reload();

    }, [])

    return (
        <Container
            title="Central de ajuda"
        >
            <h1 className="w-full text-center">Vamos redicionar você para o whatsapp</h1>
        </Container>
    )
};