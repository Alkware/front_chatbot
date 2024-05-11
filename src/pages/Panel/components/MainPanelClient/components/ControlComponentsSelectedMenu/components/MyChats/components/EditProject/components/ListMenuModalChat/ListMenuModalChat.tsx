import { useSearchParams } from "react-router-dom";
import { Li } from "../../../../../../../../../../../../components/li/Li";
import { STEP_NAME_URL } from "../../../../../../../../../../../../variables/variables";

interface ListMenuModal {
    children: any;
}

export const ListMenuModal = ({ children }: ListMenuModal) => {
    const [params, setParams] = useSearchParams()
    const MENU_MOBILE = "menu_modal_edit_chat";
    const isOpenMobileOpen = params.get(MENU_MOBILE) === "open" ? true : false;

    const handleActiveLi = ({ target }: any) => {
        if(isOpenMobileOpen){
            params.set(MENU_MOBILE, "close");
        }
        const { index } = target.dataset;
        params.set(STEP_NAME_URL, index)
        setParams(params)
    }

    return (
        <div
            data-isopenmobileopen={isOpenMobileOpen}
            className="w-full h-[90%] flex flex-col fixed md:static top-0 left-0 z-40 bg-primary-100 md:bg-transparent data-[isopenmobileopen=false]:hidden md:data-[isopenmobileopen]:block" 
        >
            <ul className="w-full flex flex-col uppercase">
                {
                    children.map((child: any, index: number) =>
                        <div
                            key={child.props.index}
                            data-isactive={index === Number(params.get(STEP_NAME_URL)) ? true : false}
                            className="w-full text-center data-[isactive=true]:bg-primary-200 hover:bg-primary-200 overflow-hidden px-2 flex justify-start items-center text-sm"
                        >
                            <Li
                                text={child.props.titleStep}
                                index={child.props.index}
                                icon={child.props.icon}
                                onClick={handleActiveLi}
                            />
                        </div>
                    )
                }
            </ul>
        </div>
    )
};