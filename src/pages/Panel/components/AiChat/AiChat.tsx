import { FaComments } from "react-icons/fa";
import { TipContainer } from "../../../../components/TipContainer/TipContainer";
import { useState } from "react";

interface AiChat { }

export function AiChat({ }: AiChat) {
    const [display, setDisplay] = useState(false);

    return (
        <>
            <TipContainer
                tip="Precisa de ajudar no painel?"
                positionY="BOTTOM"
                positionX="LEFT"
            >
                <div
                    className="bg-primary-100 border border-light/50 rounded-full p-1"
                    onClick={() => setDisplay(v => !v)}
                >
                    <FaComments
                        className="size-6 fill-light cursor-pointer"
                    />
                </div>
            </TipContainer>
            <div className="fixed bottom-4 right-4 z-50">
                <div
                    id="wipzee-chat"
                    data-display={display}
                    className="data-[display=false]:hidden"
                ></div>
            </div>
        </>
    )
};