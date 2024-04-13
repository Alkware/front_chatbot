import { CompanyLogo } from "../../../../components/CompanyLogo/CompanyLogo";

export function Footer() {
    return (
        <div className="w-screen h-auto md:h-[120px] py-8 flex flex-col md:flex-row justify-center md:justify-evenly items-center bg-primary-100">
            <span>CNPJ 111.111.0001/00</span>

            <div className="flex flex-col items-center">
                <div className="flex gap-2 justify-center">
                    <a href="/terms">Termos de uso</a>
                    <span>|</span>
                    <a href="/polices">Politicas de privacidade</a>
                    <span>|</span>
                    <a href="/cookies">Politicas de cookies</a>
                </div>
                <span>@WIPZEE 2024. Todos os direitos reservados.</span>
            </div>
            <CompanyLogo />
        </div>
    )
};