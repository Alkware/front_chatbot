import { Button } from "../../button/Button";

interface Confirm {
    message: string,
    confirmFunction: ()=> void,
    cancelFuntion: () => void,
}

export function Confirm({ message, confirmFunction, cancelFuntion }: Confirm) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <h2>{message}</h2>
            <div className="w-full flex gap-4 justify-evenly ">
                
                <Button onClick={confirmFunction}>Sim</Button>

                <button
                    onClick={cancelFuntion}
                    className="underline opacity-60"
                >Cancelar</button>
            </div>
        </div>
    )
};