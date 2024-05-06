import { CompanyLogo } from "../../../../components/CompanyLogo/CompanyLogo";

export function Footer() {
    return (
        <div className="w-screen h-auto md:h-[120px] py-8 flex flex-col md:flex-row justify-center md:justify-evenly items-center bg-primary-100 text-light">
            <span className="invisible">CNPJ 111.111.0001/00</span>

            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                    <a className="underline" href="/terms">Termos de uso</a>
                    <span className="hidden md:block">|</span>
                    <a className="underline" href="/polices">Politicas de privacidade</a>
                    <span className="hidden md:block">|</span>
                    <a className="underline" href="/cookies">Politicas de cookies</a>
                </div>
                <span>@WIPZEE 2024. Todos os direitos reservados.</span>
            </div>
            <CompanyLogo />
        </div>
    )
};