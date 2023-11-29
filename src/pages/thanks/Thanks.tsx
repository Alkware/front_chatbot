import ButtonMain from "../../components/button/ButtonBlue";

export default function Thanks() {

    return (
        <div className="w-screen h-screen bg-zinc-700 grid place-items-center">
            <div className="">
                <h2>Obrigado por assinar nossa plataforma</h2>
                <ButtonMain onClick={()=> window.close()}>Acessar plataforma</ButtonMain>
            </div>
        </div>
    )
};