import UserPlanInfoProfile from "./components/UserPlanInfoProfile/UserPlanInfoProfile";


import MenuNavigate from "./components/MenuNavigate/MenuNavigate";
import ControlCloseMenuNavigation from "./components/ControlCloseMenuNavigation/ControlCloseMenuNavigation";
import { CompanyLogo } from "../../../../components/CompanyLogo/CompanyLogo";
import { MenuHambuguer } from "../../../../components/MenuHambuguer/MenuHambuguer";
import { useSearchParams } from "react-router-dom";
import { MOBILE_MENU, RESIZE_MENU } from "../../../../variables/variables";

function NavigatePanelClient() {
    const [params] = useSearchParams();
    const isMenuResized = params.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.DEFAULT_VALUES.DEFAULT ? true : false;
    const isOpenMobileOpen = params.get(MOBILE_MENU.URL_NAME) === MOBILE_MENU.DEFAULT_VALUES.OPEN ? true : false;

    return (
        <div
            data-isresizemenu={isMenuResized}
            data-isopenmobilemenu={isOpenMobileOpen}
            className="w-full md:w-[300px] fixed z-[999] md:relative data-[isopenmobilemenu=false]:w-auto md:data-[isresizemenu=false]:w-[70px] bg-primary-100 rounded-b-md md:rounded-none"
        >
            <ControlCloseMenuNavigation  />

            <MenuHambuguer 
                className="md:hidden"
            />

            <div
                data-isopenmobilemenu={isOpenMobileOpen}
                className="flex flex-col min-h-screen data-[isopenmobilemenu='false']:hidden md:data-[isopenmobilemenu='false']:flex bg-gradient-to-b from-primary-100 via-light to-light dark:to-primary-300 dark:via-primary-300"
            >
                <CompanyLogo />

                <nav
                    className="w-full h-full py-4 relative"
                >
                    <UserPlanInfoProfile menuIsOpen={isMenuResized} />

                    <MenuNavigate />

                </nav>
            </div>

        </div>
    )
}

export default NavigatePanelClient;