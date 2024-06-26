import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { RESIZE_MENU } from "../../../../../../variables/variables";

const ControlCloseMenuNavigation = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const isMenuResize = searchParams.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.VALUE;

    // Função responsável por redimencionar o menu
    const handleMenuResize = () => {
        // Obtem o atual status do menu, se ele está abertou ou fechado, caso venha null significa que ele está aberto...
        const currentResizeMenu = searchParams.get(RESIZE_MENU.URL_NAME);

        // Caso o menu esteja redimencionado, deve deletar a query params do navegador, por que esse é o padrão para o menu estar aberto...
        if (currentResizeMenu) searchParams.delete(RESIZE_MENU.URL_NAME);
        else searchParams.set(RESIZE_MENU.URL_NAME, RESIZE_MENU.VALUE);

        setSearchParams(searchParams);
    }

    return (
        <div
            data-ismenuresize={isMenuResize}
            className="hidden md:flex w-full data-[ismenuresize=false]:justify-end justify-center"
        >
            {
                isMenuResize ?
                    <FaCaretRight
                        className="text-4xl fill-primary-100 dark:fill-zinc-100 cursor-pointer"
                        data-control-arrow="right"
                        onClick={handleMenuResize}
                    />
                    :
                    <FaCaretLeft
                        className="text-4xl fill-primary-100 dark:fill-zinc-100 cursor-pointer"
                        data-control-arrow="left"
                        onClick={handleMenuResize}
                    />
            }
        </div>
    );
};

export default ControlCloseMenuNavigation;