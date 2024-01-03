import { useState } from "react";
import UserPlanInfoProfile from "../../../../../../../NavigatePanelClient/components/UserPlanInfoProfile";
import MenuNavigate from "../../../../../../../NavigatePanelClient/components/MenuNavigate/MenuNavigate";
import { ControlComponentsSelectedMenu } from "../../../..";

function MainPanelClient() {
    const [menuIsOpen] = useState(true);

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
                />
            </nav>

            <section className="w-4/5">
                <ControlComponentsSelectedMenu />
            </section>
        </main>
    )
}

export default MainPanelClient;