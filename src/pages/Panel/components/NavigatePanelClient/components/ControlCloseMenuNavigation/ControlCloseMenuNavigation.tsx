import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { RESIZE_MENU } from "../../../../../../variables/variables";

const ControlCloseMenuNavigation = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const isMenuResize = searchParams.get(RESIZE_MENU.URL_NAME) === RESIZE_MENU.DEFAULT_VALUES.DEFAULT;

    const handleMenuResize = ()=>{
        const defaultValueMenuResize = searchParams.get(RESIZE_MENU.URL_NAME);

        if(!isMenuResize){
            searchParams.append(RESIZE_MENU.URL_NAME, RESIZE_MENU.DEFAULT_VALUES.DEFAULT);
            setSearchParams(searchParams);
        }

        if(defaultValueMenuResize === RESIZE_MENU.DEFAULT_VALUES.DEFAULT){
            searchParams.set(RESIZE_MENU.URL_NAME, RESIZE_MENU.DEFAULT_VALUES.RESIZED);
        }else{
            searchParams.set(RESIZE_MENU.URL_NAME, RESIZE_MENU.DEFAULT_VALUES.DEFAULT);
        }
        setSearchParams(searchParams);
    }

    return (
        <div 
            data-ismenuresize={isMenuResize}
            className="hidden md:flex w-full data-[ismenuresize=true]:absolute top-0 data-[ismenuresize=true]:justify-end justify-center z-50"
        >
            {
                isMenuResize ?
                    <FaCaretLeft
                        className="text-4xl fill-primary-100 dark:fill-zinc-100 cursor-pointer"
                        data-control-arrow="left"
                        onClick={handleMenuResize}
                    />
                    :
                    <FaCaretRight
                        className="text-4xl fill-primary-100 dark:fill-zinc-100 cursor-pointer"
                        data-control-arrow="right"
                        onClick={handleMenuResize}
                    />
            }
        </div>
    );
};

export default ControlCloseMenuNavigation;