import { useSearchParams } from "react-router-dom";
import { RESIZE_MENU, URL_LOGO } from "../../variables/variables";

export function CompanyLogo() {
    const [params] = useSearchParams();
    const isMenuResized = params.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.DEFAULT_VALUES.DEFAULT ? true : false;

    return (
        <h2
            className="flex justify-center items-center"
        >
            <img
                data-isresized={isMenuResized}
                src={URL_LOGO}
                alt="Logo da empresa"
                className="w-[90px] data-[isresized=false]:w-[50px]"
            />
        </h2>
    )
};