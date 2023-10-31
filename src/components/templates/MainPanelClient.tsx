import { useState } from "react";
import UserPlanInfoProfile from "../compositeComponets/UserPlanInfoProfile";
import ContainerMenuNavigate from "./ContainerMenuNavigate";
import ComponentsSectionPanel from "./ControllerSectionComponents";
import ControlCloseMenuNavigation from "../compositeComponets/ControlCloseMenuNavigation";

function MainPanelClient() {
    const [menuIsOpen, setMenuIsOpen] = useState(true);
    const [tabNavigationIndex, setTabNavigationIndex] = useState(0);

    return (
        <main
            className="w-full h-full flex"
        >
            <nav
                className={`h-full  bg-blue_main2 rounded-md ${menuIsOpen ? "w-1/5 min-w-[300px]" : "w-[70px] min-w-0"}`}
            >
                <UserPlanInfoProfile menuIsOpen={menuIsOpen}  />

                <ContainerMenuNavigate
                    menuIsOpen={menuIsOpen}
                    setTabNavigationIndex={setTabNavigationIndex}
                />

                <ControlCloseMenuNavigation
                    menuIsOpen={menuIsOpen}
                    setMenuIsOpen={setMenuIsOpen}
                />

            </nav>

            <section className="w-4/5">
                <div className="w-full">
                    <ComponentsSectionPanel navMenu={tabNavigationIndex} />
                </div>
            </section>
        </main>
    )
}

export default MainPanelClient;