import { Presentation } from "./components/Presentation/Presentation";

export function Main() {
    return (
        <main className="w-full h-auto">
            <Presentation />
            <section 
                id="about"
                className="h-screen grid place-content-center"
            >
                <h2>Sobre nós</h2>
            </section>
            <section 
                id="price"
                className="h-screen grid place-content-center"
            >
                <h2>Preços</h2>
            </section>
        </main>
    )
};