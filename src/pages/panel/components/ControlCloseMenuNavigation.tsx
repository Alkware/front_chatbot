import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const ControlCloseMenuNavigation = ({ menuIsOpen, setMenuIsOpen }: any) => {

    return (
        <div className={`flex ${menuIsOpen ? "justify-end": "justify-center"} bg-blue_main2`}>
            {
                menuIsOpen ?
                    <FaCaretLeft
                        size={32}
                        className="fill-zinc-100 cursor-pointer"
                        data-control-arrow="left"
                        onClick={() => setMenuIsOpen(false)}
                    />
                    :
                    <FaCaretRight
                        size={32}
                        className="fill-zinc-100 cursor-pointer"
                        data-control-arrow="right"
                        onClick={() => setMenuIsOpen(true)}
                    />
            }
        </div>
    )
};

export default ControlCloseMenuNavigation;