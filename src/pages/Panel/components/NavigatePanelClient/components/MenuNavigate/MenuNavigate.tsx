import { ElementType } from "react";
import { FaHeadset } from "react-icons/fa6";
import { IoIosChatbubbles, IoIosCloud, IoIosStats, IoLogoBuffer, IoMdCash } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { MOBILE_MENU, RESIZE_MENU } from "../../../../../../variables/variables";

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
    {
        name: "Central de ajuda",
        Icon: FaHeadset as ElementType
    },
]


function MenuNavigate() {
    const [searchParams, setSearchParams] = useSearchParams();
    const isMenuResized = searchParams.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.DEFAULT_VALUES.DEFAULT ? true : false;

    const handleSelectedTabNavigation = (index: number) => {
        const isMobileMenu = searchParams.get(MOBILE_MENU.URL_NAME);

        if (isMobileMenu) searchParams.set(MOBILE_MENU.URL_NAME, "close");
        
        searchParams.set("tab", index.toString());
        
        setSearchParams(searchParams);
    }

    return (
        <ul className="w-full flex flex-col items-end">
            {
                navMenu.map((menu, index) =>
                    <li
                        key={menu.name}
                        data-tab={Number(searchParams.get("tab")) == index ? true : false}
                        data-ismenuresize={isMenuResized}
                        className="group w-full py-2 tall-6:py-3 flex gap-2 justify-center items-center text-center cursor-pointer font-bold text-xl hover:text-primary-300 hover:dark:text-light hover:bg-primary-100/30 hover:dark:bg-dark data-[tab=true]:dark:bg-dark transition-colors duration-300"
                        onClick={() => handleSelectedTabNavigation(index)}
                    >
                        <div
                            className="w-full group-data-[ismenuresize=true]:w-4/5 flex justify-center data-[ismenuresize=true]:justify-start items-center gap-2"
                        >
                            <menu.Icon className="group-hover:fill-primary-100 text-primary-100 dark:text-light text-xl transition-colors duration-100" />
                            <p
                                className="md:group-data-[ismenuresize=false]:hidden group-hover:text-primary-100 text-primary-100 dark:text-white transition-colors duration-100 whitespace-nowrap text-ellipsis"
                            >{menu.name}</p>
                        </div>
                    </li>
                )
            }
        </ul>
    )
}

export default MenuNavigate;