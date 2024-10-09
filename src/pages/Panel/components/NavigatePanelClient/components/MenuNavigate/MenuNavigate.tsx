import { ElementType, MouseEvent, RefObject, useRef } from "react";
import { IoIosChatbubbles, IoIosPricetags, IoIosStats, IoLogoBuffer, IoMdArrowDropdown, IoMdCash } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { PARAM_MENU_MOBILE, RESIZE_MENU, TAB_NAME_URL } from "../../../../../../variables/variables";
import { IoArchiveSharp, IoDiamond } from "react-icons/io5";
import { GiCircuitry } from "react-icons/gi";

export type Tab = "my_chats" | "metrics" | "artificial_intelligence" | "products" | "records" | "leads" | "conversations" | "payment" | "help_center" | "config";

interface Menu {
    tab: Tab;
    name: string;
    Icon: ElementType;
}

interface NavMenu extends Menu {
    topics?: Menu[];
}

const navMenu: NavMenu[] = [
    {
        tab: "my_chats",
        name: "Meus chats",
        Icon: IoLogoBuffer,
    },
    {
        tab: "artificial_intelligence",
        name: "Inteligência artificial",
        Icon: GiCircuitry,
    },
    {
        tab: "products",
        name: "Meus produtos",
        Icon: IoIosPricetags,
    },
    {
        tab: "metrics",
        name: "Métricas",
        Icon: IoIosStats,
    },
    {
        tab: "records",
        name: "Registros",
        Icon: IoArchiveSharp,
        topics: [
            { tab: "conversations", name: "Conversas", Icon: IoIosChatbubbles, },
            { tab: "leads", name: "Leads", Icon: IoDiamond, }
        ]
    },
    {
        tab: "payment",
        name: "Assinatura",
        Icon: IoMdCash,
    },

]



function MenuNavigate() {
    const [searchParams, setSearchParams] = useSearchParams();
    const ulRef: RefObject<HTMLUListElement> = useRef(null);
    const isMenuResized = searchParams.get(RESIZE_MENU.URL_NAME) !== RESIZE_MENU.VALUE;
    const menuMobile = searchParams.get(PARAM_MENU_MOBILE.url_name) === PARAM_MENU_MOBILE.default_values.open;

    const handleSelectedTabNavigation = (e: MouseEvent<HTMLDivElement>) => {
        const currentMenu = e.currentTarget;
        const tab = currentMenu.dataset.tab;
        const topics: HTMLDivElement[] = ulRef.current?.querySelectorAll("div[data-container='topic']") as unknown as HTMLDivElement[];

        if (!tab) return;

        const menu = navMenu.find(menu => (menu.tab === tab));

        if (!menu?.topics) {
            callTabContainer(tab);
            // Verifica se é um sub topic...
            const isSubTopic = currentMenu.dataset.container === "sub_topic";
            // Caso ele for um sub topic, não será fechado o container topic...
            !isSubTopic && handleDisplayTopic(tab);
        } else {
            handleDisplayTopic(tab);
            // Caso o menu esteja redimencionado, será aberto...
            const menuIsResized = searchParams.get(RESIZE_MENU.URL_NAME)
            // Caso o menu esteja fechado e o usuário clicar em um menu que possu-a sub-topicos, será aberto o menu...
            if (menuIsResized) {
                // Ao remover a query params, por padrão o menu será aberto...
                searchParams.set(TAB_NAME_URL, tab)
                searchParams.delete(RESIZE_MENU.URL_NAME);
                setSearchParams(searchParams);
            }
        }

        // Lista com a exibição dos topicos...
        function handleDisplayTopic(tab: string) {
            // Fecha todos os topicos abertos...
            topics?.forEach(topic => {
                topic.classList.remove("hidden")
                topic.classList.add("hidden")
            });

            // Abre ou fecha o atual topico...
            topics?.forEach((topic) => {
                if (topic.dataset.tab === tab) topic.classList.toggle("hidden")
            });
        }

        // chama o container atual da tab...
        function callTabContainer(tab: string) {
            searchParams.set("tab", tab);
            (menuMobile && searchParams.set(PARAM_MENU_MOBILE.url_name, PARAM_MENU_MOBILE.default_values.close))
            setSearchParams(searchParams);
        }
    }

    return (
        <ul
            ref={ulRef}
            className="w-full"
        >
            {navMenu.map((menu, index) =>
                <li
                    key={menu.name}
                    data-tab={Number(searchParams.get("tab")) == index ? true : false}
                    className={`w-full flex flex-col justify-center items-end cursor-pointer text-xl data-[tab=true]:bg-primary-100`}
                >
                    <div
                        data-tab={menu.tab}
                        data-ismenuresize={isMenuResized}
                        className="w-full p-2 pl-2 flex gap-2 items-center justify-between md:data-[ismenuresize=false]:justify-center group"
                        onClick={handleSelectedTabNavigation}
                    >
                        <div className="flex gap-2 items-center">
                            <menu.Icon className="group-hover:fill-primary-100 text-primary-100 dark:text-light text-xl transition-colors duration-100" />
                            <h2
                                data-textisbig={menu.name.length > 20}
                                className="md:group-data-[ismenuresize=false]:hidden group-hover:text-primary-100 data-[textisbig=true]:text-lg whitespace-nowrap"
                            >{menu.name}</h2>
                        </div>
                        <IoMdArrowDropdown
                            data-hastopic={!!menu?.topics?.length}
                            className="md:group-data-[ismenuresize=false]:hidden data-[hastopic=false]:hidden self-center"
                        />
                    </div>
                    <div
                        data-container="topic"
                        data-tab={menu.tab}
                        className="w-[90%] flex-col hidden"
                    >
                        {menu.topics && menu.topics.map(topic =>
                            <div
                                key={topic.tab}
                                data-container="sub_topic"
                                data-tab={topic.tab}
                                data-ismenuresize={isMenuResized}
                                className="w-full flex items-center gap-2 group md:data-[ismenuresize=false]:hidden"
                                onClick={handleSelectedTabNavigation}
                            >
                                <topic.Icon className="group-hover:fill-primary-100 text-primary-100 dark:text-light text-base transition-colors duration-100" />
                                <h2 className="text-base group-hover:text-primary-100">{topic.name}</h2>
                            </div>)}
                    </div>
                </li>
            )}
        </ul>
    )
}

export default MenuNavigate;