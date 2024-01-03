import { Button } from "../../components/button/Button";

export default function Thanks() {

    return (
        <div className="w-screen h-screen bg-zinc-700 grid place-items-center">
            <div className="">
                <h2>Obrigado por assinar nossa plataforma</h2>
                <Button onClick={()=> window.open("https://wipzee.com/panel")}>Acessar plataforma</Button>
            </div>
        </div>
    )
};