import { useSearchParams } from "react-router-dom";
import { RESIZE_MENU, URL_LOGO } from "../../variables/variables";

export function CompanyLogo() {
    const [params] = useSearchParams();
    const isMenuResized = params.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.DEFAULT_VALUES.DEFAULT ? true : false;

    return (
        <div
            className="flex justify-center items-center absolute top-0 left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
            <img
                data-isresized={isMenuResized}
                src={URL_LOGO}
                alt="Logo da empresa"
                className="w-[90px] md:data-[isresized=false]:w-[50px]"
            />
        </div>
    )
};