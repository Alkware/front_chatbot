import { URL_LOGO } from "../../variables/variables";

export function CompanyLogo() {
    return (
        <h2
            className="flex justify-center items-center"
        >
            <img
                src={URL_LOGO}
                alt="Logo da empresa"
                className="w-[90px]"
            />
        </h2>
    )
};