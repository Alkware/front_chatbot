import { ReactNode, SetStateAction, createContext, useState } from "react";

interface ProviderTypes{
    isOpenModal: boolean | undefined,
    components?: ReactNode | undefined
}

interface ModalContextTypes {
    modalContent: ProviderTypes | undefined,
    setModalContent: React.Dispatch<SetStateAction<ProviderTypes | undefined>>
}

export const ModalContext = createContext<ModalContextTypes>({
    modalContent: undefined,
    setModalContent: ()=> {}
});

export function ModalProvider({ children }: any) {
    const [modalContent, setModalContent] = useState<ProviderTypes>();

    return (
        <ModalContext.Provider value={{ modalContent, setModalContent }}>
            {children}
        </ModalContext.Provider>
    )
};