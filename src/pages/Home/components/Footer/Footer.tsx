import { CompanyLogo } from "../../../../components/CompanyLogo/CompanyLogo";

export function Footer() {
    return (
        <div className="w-screen h-[120px] flex justify-evenly items-center bg-primary-100">
            <span>CNPJ 111.111.0001/00</span>

            <div className="flex flex-col">
                <div className="flex gap-2">
                    <a href="">Termos de uso</a>
                    <span>|</span>
                    <a href="">Politicas de privacidade</a>
                </div>
                <span>@WIPZEE 2024. Todos os direitos reservados.</span>
            </div>
            <CompanyLogo />
        </div>
    )
};