import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const ControlCloseMenuNavigation = ({ menuIsOpen, setMenuIsOpen }: any) => {

    return (
        <div 
            data-menuisopen={menuIsOpen}
            className="w-full absolute bottom-0 tall-6:bottom-6 flex data-[menuisopen=true]:justify-end justify-center"
        >
            {
                menuIsOpen ?
                    <FaCaretLeft
                        className="text-4xl fill-zinc-100 cursor-pointer"
                        data-control-arrow="left"
                        onClick={() => setMenuIsOpen(false)}
                    />
                    :
                    <FaCaretRight
                        className="text-4xl fill-zinc-100 cursor-pointer"
                        data-control-arrow="right"
                        onClick={() => setMenuIsOpen(true)}
                    />
            }
        </div>
    )
};

export default ControlCloseMenuNavigation;