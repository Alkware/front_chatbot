import img from "../../assests/smile-face.svg"
interface Loading {
}

export function Loading() {
    return (
        <div className="w-full h-full grid place-items-center bg-light dark:bg-dark">
            <img
                src={img}
                alt="logo loading wipzee"
                className="w-full max-w-[250px] h-full object-cover animate-pulse"
            />
            <span className="animate-pulse text-2xl text-center">Carregando todas as informações, aguarde.</span>
        </div>
    )
};