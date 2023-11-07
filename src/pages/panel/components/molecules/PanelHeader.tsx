import { CompanyLogo } from "../../../../components/companyLogo";
import { MenuIconsHeaderPanel } from "../atoms/MenuIconsHeaderPanel";

function PanelHeader() {


    return (
        <header
            className="w-full h-[70px] shadow-sm shadow-blue_main flex justify-between items-center"
        >
            <CompanyLogo />

            <MenuIconsHeaderPanel />

        </header>
    )
}

export default PanelHeader;