import { useSearchParams } from "react-router-dom"

export function Container({ children }: any) {
    return (
        <div className="flex gap-4">{children}</div>
    )
};

export function Steps({ children, index }: { children: any, index: number  }) {
    const [params] = useSearchParams();
    const currentStep = Number(params.get("form-step")) || 0;

    return (
        <div
            data-display={currentStep === index}
            className="flex-col gap-4 border p-4 my-4 data-[display='true']:flex hidden"
        >
            {children}
        </div>
    )
};


export function Inputs({ placeholder }: { placeholder: string }) {
    return (
        <input type="text" placeholder={placeholder} />
    )
};

export function Button({ text }: { text: string }) {
    return (
        <button className="bg-blue-500 p-2 rounded-xl"> {text}</button>
    )
};


export const FormTeste = {
    Container,
    Steps,
    Inputs,
    Button
}