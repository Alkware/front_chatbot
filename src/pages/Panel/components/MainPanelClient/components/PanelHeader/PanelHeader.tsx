import { MenuHambuguer } from "../../../../../../components/MenuHambuguer/MenuHambuguer";
import { MenuIconsHeaderPanel } from "./components/MenuIconsHeaderPanel/MenuIconsHeaderPanel";

function PanelHeader() {
    return (
        <header
            className={`w-full h-[8%] px-0 md:px-20 min-h-[70px] col-span-8 row-span-1 flex justify-between md:justify-end items-center bg-primary-100 md:bg-transparent`}
        >
            <MenuHambuguer
                urlParamName="menu_mobile"
                className="md:hidden"
            />

            <MenuIconsHeaderPanel />
        </header>
    )
}

export default PanelHeader;