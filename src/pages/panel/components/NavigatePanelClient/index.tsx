import { useState } from "react";
import UserPlanInfoProfile from "./components/UserPlanInfoProfile";


import MenuNavigate from "../MenuNavigate";
import { CompanyLogo } from "./components/CompanyLogo";
import ControlCloseMenuNavigation from "../ControlCloseMenuNavigation";

function NavigatePanelClient() {
    const [menuIsOpen, setMenuIsOpen] = useState(true);

    // console.log("fui renderizado 01")

    return (
        <main
            data-menuisopen={menuIsOpen}
            className="w-[280px] data-[menuisopen=false]:w-[70px] relative h-full bg-gradient-to-b from-primary-100 via-light to-light dark:to-primary-300 dark:via-primary-300"
        >
            <CompanyLogo />

            <nav
                className="w-full py-4 relative"
            >
                <UserPlanInfoProfile menuIsOpen={menuIsOpen} />

                <MenuNavigate
                    menuIsOpen={menuIsOpen}
                />

            </nav>

            <ControlCloseMenuNavigation
                menuIsOpen={menuIsOpen}
                setMenuIsOpen={setMenuIsOpen}
            />
        </main>
    )
}

export default NavigatePanelClient;