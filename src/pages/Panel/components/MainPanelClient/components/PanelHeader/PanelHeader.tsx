import { MenuIconsHeaderPanel } from "../../../MenuIconsHeaderPanel";

function PanelHeader() {
    return (
        <header
            className={`w-full h-[8%] px-20 min-h-[70px] col-span-8 row-span-1 flex justify-end items-center`}
        >
            <MenuIconsHeaderPanel />
        </header>
    )
}

export default PanelHeader;