import { URL_LOGO } from "../../variables";

export function CompanyLogo() {
    return (
        <h2
            className="w-full flex justify-center items-center p-4"
        >
            <img
                src={URL_LOGO}
                alt="Logo da empresa"
                className="w-[120px]"
            />
        </h2>
    )
};