import { useState } from "react";
import UserPlanInfoProfile from "../molecules/UserPlanInfoProfile";
import ComponentsSectionPanel from "../atoms/ControllerSectionComponents";
import MenuNavigate from "../molecules/MenuNavigate";

function MainPanelClient() {
    const [menuIsOpen, setMenuIsOpen] = useState(true);
    const [tabNavigationIndex, setTabNavigationIndex] = useState(0);

    return (
        <main
            className="w-full h-[90%] flex"
        >
            <nav
                className={`h-full  bg-blue_main2 rounded-md ${menuIsOpen ? "w-1/5 min-w-[300px]" : "w-[70px] min-w-0"}`}
            >
                <UserPlanInfoProfile menuIsOpen={menuIsOpen} />

                <MenuNavigate
                    menuIsOpen={menuIsOpen}
                    setTabNavigationIndex={setTabNavigationIndex}
                    setMenuIsOpen={setMenuIsOpen}
                />
            </nav>

            <section className="w-4/5">
                <ComponentsSectionPanel navMenu={tabNavigationIndex} />
            </section>
        </main>
    )
}

export default MainPanelClient;