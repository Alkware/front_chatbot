import img from "../../assests/smile-face.svg"
interface Loading {
}

export function Loading() {
    return (
        <div className="w-full h-full grid place-items-center gap-4 bg-light dark:bg-dark">
            <img
                src={img}
                alt="logo loading wipzee"
                className="w-full max-w-[100px] md:max-w-[250px] h-full object-cover animate-pulse"
            />
            <span className="animate-pulse text-xl md:text-2xl text-center">Carregando, aguarde.</span>
        </div>
    )
};