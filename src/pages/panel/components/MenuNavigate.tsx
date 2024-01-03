import { ElementType } from "react";
import { IoIosChatbubbles, IoIosCloud, IoIosStats, IoLogoBuffer, IoMdCash } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";

interface containerMenuTypes {
    menuIsOpen: boolean,
}

const navMenu = [
    {
        name: "Meus chats",
        Icon: IoLogoBuffer as ElementType
    },
    {
        name: "Métricas",
        Icon: IoIosStats as ElementType
    },
    {
        name: "Fonte de dados",
        Icon: IoIosCloud as ElementType
    },
    {
        name: "Registros",
        Icon: IoIosChatbubbles as ElementType
    },
    {
        name: "Assinatura",
        Icon: IoMdCash as ElementType
    },
]


function MenuNavigate({ menuIsOpen }: containerMenuTypes) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleSelectedTabNavigation = (index: number) => {
        navigate(`/panel?tab=${index}`)
    }

    return (
        <ul className="w-full flex flex-col items-end">
            {
                navMenu.map((menu, index) =>
                    <li
                        key={menu.name}
                        data-tab={Number(searchParams.get("tab")) == index ? true : false}
                        className="w-full py-3 flex gap-2 justify-center items-center text-center cursor-pointer font-bold text-xl hover:text-primary-300 hover:dark:text-light hover:bg-primary-100 hover:dark:bg-dark data-[tab=true]:dark:bg-dark transition-colors duration-300 group"
                        onClick={() => handleSelectedTabNavigation(index)}
                    >
                        <div
                            data-menuisopen={menuIsOpen}
                            className="w-full data-[menuisopen=true]:w-4/5 flex justify-center data-[menuisopen=true]:justify-start items-center gap-2"
                        >
                            <menu.Icon className="group-hover:fill-green_color text-xl transition-colors duration-100" />
                            <p className={`group-hover:text-green_color transition-colors duration-100 whitespace-nowrap text-ellipsis ${menuIsOpen ? "block" : "hidden"}`}>{menu.name}</p>
                        </div>
                    </li>
                )
            }
        </ul>
    )
}

export default MenuNavigate;