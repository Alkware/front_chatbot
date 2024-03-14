import { Presentation } from "./components/Presentation/Presentation";

export function Main() {
    return (
        <main className="w-full h-auto">
            <Presentation />
            <section
                id="about"
                className="h-screen flex flex-col gap-8 items-center translate-y-[80vh]"
            >
                <h2 className="text-3xl font-bold">O que a wipzee vai ajudar no seu negócio?</h2>
                <div className="w-4/5 flex flex-col justify-center items-center gap-4">
                    <p className="smooth-display-left text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, laboriosam. Perspiciatis a minus voluptates aperiam, incidunt odit quasi suscipit facere accusantium ullam voluptate quidem. Non minima est voluptatem quam sapiente?</p>
                    <p className="smooth-display-right text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, laboriosam. Perspiciatis a minus voluptates aperiam, incidunt odit quasi suscipit facere accusantium ullam voluptate quidem. Non minima est voluptatem quam sapiente?</p>
                    <p className="smooth-display-left text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, laboriosam. Perspiciatis a minus voluptates aperiam, incidunt odit quasi suscipit facere accusantium ullam voluptate quidem. Non minima est voluptatem quam sapiente?</p>
                    <p className="smooth-display-right text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, laboriosam. Perspiciatis a minus voluptates aperiam, incidunt odit quasi suscipit facere accusantium ullam voluptate quidem. Non minima est voluptatem quam sapiente?</p>
                </div>
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