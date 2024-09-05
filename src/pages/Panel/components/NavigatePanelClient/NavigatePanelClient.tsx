import UserPlanInfoProfile from "./components/UserPlanInfoProfile/UserPlanInfoProfile";


import MenuNavigate from "./components/MenuNavigate/MenuNavigate";
import ControlCloseMenuNavigation from "./components/ControlCloseMenuNavigation/ControlCloseMenuNavigation";
import { CompanyLogo } from "../../../../components/CompanyLogo/CompanyLogo";
import { MenuHambuguer } from "../../../../components/MenuHambuguer/MenuHambuguer";
import { useSearchParams } from "react-router-dom";
import { PARAM_MENU_MOBILE, RESIZE_MENU } from "../../../../variables/variables";

function NavigatePanelClient() {
    const [params] = useSearchParams();
    const isMenuResized = params.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.VALUE;
    const isOpenMobileOpen = params.get(PARAM_MENU_MOBILE.url_name) === PARAM_MENU_MOBILE.default_values.open;

    return (
        <div
            data-isresizemenu={isMenuResized}
            data-isopenmobilemenu={isOpenMobileOpen}
            className="w-full md:w-[250px] fixed z-30 md:relative md:data-[isresizemenu=true]:w-[70px] bg-primary-100 rounded-b-md md:rounded-none"
        >

            <div
                data-isopenmobilemenu={isOpenMobileOpen}
                className="flex flex-col min-h-screen py-4 md:py-0 data-[isopenmobilemenu='false']:hidden md:data-[isopenmobilemenu='false']:flex bg-gradient-to-b from-primary-100 via-light to-light dark:to-primary-300 dark:via-primary-300"
            >
                <MenuHambuguer
                    urlParamName={PARAM_MENU_MOBILE.url_name}
                    className="md:hidden"
                />

                <CompanyLogo />

                <nav
                    className="w-full h-full py-0 my-4 relative"
                >
                    <UserPlanInfoProfile />

                    <MenuNavigate />

                </nav>
                <ControlCloseMenuNavigation />
            </div>

        </div>
    )
}

export default NavigatePanelClient;