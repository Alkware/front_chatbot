import { useEffect, useRef } from "react";
import QRCode from 'qrcode';
import { TipContainer } from "../../../../../../../../../../../../../../components/TipContainer/TipContainer";
import { FaDownload } from "react-icons/fa";

interface QrCode {
    text: string,
    width: number,
}

export function QrCode({ text, width }: QrCode) {
    const canvasRef: any = useRef(null);
    const dark = localStorage.theme === "dark" ? "#000" : "#7672f2"
    const light = localStorage.theme === "dark" ? "#7672f2" : "#fff"

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, text, { width, margin: 1, color: { dark, light } }, function (error) {
                if (error) console.error(error);
            });
        }
    }, [text, width]);

    const handleDownloadQrCode = () => {
        if (canvasRef.current) {
            const url = canvasRef.current.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = url;
            link.click();
          }
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-4/5 flex justify-center">
                <canvas ref={canvasRef} />
            </div>
            <div className="w-1/5 flex justify-center items-center gap-4">
                <TipContainer tip="Baixar imagem">
                    <FaDownload onClick={handleDownloadQrCode} className=" text-2xl cursor-pointer" />
                </TipContainer>
            </div >
        </div>

    )
};