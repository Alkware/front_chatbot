import { Dispatch, SetStateAction, useContext } from "react";
import { Briefcase, ChartLineUp, ChartPieSlice, CreditCard, Gear, Headset, ProjectorScreenChart } from "@phosphor-icons/react";
import { ClientContext } from "../../../../context/ClientContext";
import ControlCloseMenuNavigation from "../atoms/ControlCloseMenuNavigation";


interface containerMenuTypes {
    menuIsOpen: boolean,
    setTabNavigationIndex: Dispatch<SetStateAction<number>>
    setMenuIsOpen: Dispatch<SetStateAction<boolean>>
}

function MenuNavigate({ setTabNavigationIndex, menuIsOpen, setMenuIsOpen }: containerMenuTypes) {
    const { client } = useContext(ClientContext)

    const navMenu = [
        {
            index: 0,
            name: "Dashboard",
            access: "user",
            icon: <ChartPieSlice className="group-hover:fill-blue_dark transition-colors duration-100" size={32} />
        },
        {
            index: 1,
            name: "Meus chats",
            access: "user",
            icon: <ProjectorScreenChart className="group-hover:fill-blue_dark transition-colors duration-100" size={32} />
        },
        {
            index: 2,
            name: "Métricas",
            access: "user",
            icon: <ChartLineUp className="group-hover:fill-blue_dark transition-colors duration-100" size={32} />
        },
        {
            index: 3,
            name: "Suporte",
            access: "user",
            icon: <Headset className="group-hover:fill-blue_dark transition-colors duration-100" size={32} />
        },
        {
            index: 4,
            name: "Pagamentos",
            access: "user",
            icon: <CreditCard className="group-hover:fill-blue_dark transition-colors duration-100" size={32} />
        },
        {
            index: 5,
            name: "Configuração",
            access: "user",
            icon: <Gear className="group-hover:fill-blue_dark transition-colors duration-100" size={32} />
        },
        {
            index: 6,
            name: "System",
            access: "admin",
            icon: <Briefcase className="group-hover:fill-blue_dark transition-colors duration-100" size={32} />
        },
    ]



    return (
        <div
            className={`w-full h-[80%] flex flex-col justify-between rounded-xl`}
        >
            <ul className="w-full h-4/5 flex flex-col items-end">
                {
                    navMenu.map(menu =>
                        menu.access === "user" ?
                            <li
                                key={menu.name}
                                className="w-4/5 p-2 text-center cursor-pointer hover:border-r-4 hover:border-r-blue_dark transition-all mt-2 text-white flex gap-2 justify-start items-center group"
                                onClick={() => setTabNavigationIndex(menu.index)}
                            >
                                {menu.icon}
                                <p className={`group-hover:text-blue_dark transition-colors duration-100 ${menuIsOpen ? "block" : "hidden"}`}>{menu.name}</p>
                            </li>
                            :
                            <li
                                key={menu.name}
                                className="w-4/5 p-2 text-center cursor-pointer hover:border-r-4 hover:border-r-blue_dark transition-all mt-2 text-white flex gap-2 justify-start items-center group"
                                onClick={() => setTabNavigationIndex(menu.index)}
                            >
                                {menu.icon}
                                <p className={`group-hover:text-blue_dark transition-colors duration-100 ${menuIsOpen ? "block" : "hidden"}`}>{menu.name}</p>
                            </li>
                    )
                }
            </ul>
            <ControlCloseMenuNavigation
                menuIsOpen={menuIsOpen}
                setMenuIsOpen={setMenuIsOpen}
            />
        </div>
    )
}

export default MenuNavigate;