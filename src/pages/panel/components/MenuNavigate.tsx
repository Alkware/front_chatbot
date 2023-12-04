import { Dispatch, SetStateAction } from "react";
import ControlCloseMenuNavigation from "./ControlCloseMenuNavigation";
import { FaGear } from "react-icons/fa6";
import { IoIosChatbubbles, IoIosStats, IoMdCash } from "react-icons/io";


interface containerMenuTypes {
    menuIsOpen: boolean,
    setTabNavigationIndex: Dispatch<SetStateAction<number>>
    setMenuIsOpen: Dispatch<SetStateAction<boolean>>
}

function MenuNavigate({ setTabNavigationIndex, menuIsOpen, setMenuIsOpen }: containerMenuTypes) {

    const navMenu = [
        {
            name: "Meus chats",
            access: "user",
            icon: <IoIosChatbubbles className="group-hover:fill-blue_dark transition-colors duration-100" />
        },
        {
            name: "Métricas",
            access: "user",
            icon: <IoIosStats className="group-hover:fill-blue_dark transition-colors duration-100" />
        },
        {
            name: "Pagamentos",
            access: "user",
            icon: <IoMdCash className="group-hover:fill-blue_dark transition-colors duration-100" />
        },
        {
            name: "Configuração",
            access: "user",
            icon: <FaGear className="group-hover:fill-blue_dark transition-colors duration-100" />
        },
    ]



    return (
        <div
            className={`w-full h-[80%] flex flex-col justify-between rounded-xl`}
        >
            <ul className="w-full h-4/5 flex flex-col items-end">
                {
                    navMenu.map((menu, index) =>
                        menu.access === "user" ?
                            <li
                                key={menu.name}
                                className="w-4/5 p-2 text-center cursor-pointer hover:border-r-4 hover:border-r-blue_dark transition-all mt-2 text-white flex gap-2 justify-start items-center group"
                                onClick={() => setTabNavigationIndex(index)}
                            >
                                {menu.icon}
                                <p className={`group-hover:text-blue_dark transition-colors duration-100 ${menuIsOpen ? "block" : "hidden"}`}>{menu.name}</p>
                            </li>
                            :
                            <li
                                key={menu.name}
                                className="w-4/5 p-2 text-center cursor-pointer hover:border-r-4 hover:border-r-blue_dark transition-all mt-2 text-white flex gap-2 justify-start items-center group"
                                onClick={() => setTabNavigationIndex(index)}
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