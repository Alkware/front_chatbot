import { useContext } from "react";
import { ClientContext } from "../../../../../../context/ClientContext";
import { messagesEventManager } from "../../../../../../functions/messagesEventManager";
import { FaGear, FaRightToBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { TipContainer } from "../../../../../../components/TipContainer/TipContainer";
import { UserLogo } from "./components/UserLogo/UserLogo";
import { ClientName } from "./components/ClientName/ClientName";

interface UserPlanTypes {
    menuIsOpen: boolean
}

const UserPlanInfoProfile = ({ menuIsOpen }: UserPlanTypes) => {
    const { client } = useContext(ClientContext)
    const navigate = useNavigate();


    const handleExitThePanel = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    const handleConfigProfile = ()=>{
        navigate("/panel?tab=5")
    }

    return (
        client &&
        <div
            className="w-full min-h-[80px] flex flex-col gap-2 justify-center items-center relative"
        >
            <div className="w-4/5 flex flex-col justify-center items-center gap-2 border-b border-primary-100 dark:border-light/30 pb-8">
                <div className="w-full flex justify-center gap-2 items-end">
                    <TipContainer tip="Edite seu perfil">
                        <FaGear
                            data-menuisopen={menuIsOpen}
                            className="text-3xl cursor-pointer hover:animate-spin data-[menuisopen=false]:hidden"
                            onClick={handleConfigProfile}
                        />
                    </TipContainer>
                    
                    <UserLogo menuIsOpen={menuIsOpen} />

                    <TipContainer tip="Sair do seu painel">
                        <FaRightToBracket
                            data-menuisopen={menuIsOpen}
                            className="text-3xl cursor-pointer -scale-x-100 hover:fill-red-500 transition-colors duration-200 data-[menuisopen=false]:hidden"
                            onClick={handleExitThePanel}
                        />
                    </TipContainer>

                </div>

                <div
                    className={`w-full flex flex-col ${menuIsOpen ? "block" : "hidden"}`}
                >
                    <ClientName />

                    <h3 
                        data-ismessages={messagesEventManager(client.plan_management).maxMessages}
                        className="flex gap-1 justify-center items-center text-primary-200 dark:text-light font-bold data-[ismessages='0']:hidden"
                    >
                        {
                            messagesEventManager(client.plan_management).reminingMessages
                            +
                            " / "
                            +
                            messagesEventManager(client.plan_management).maxMessages
                        }
                    </h3>
                </div>
            </div>
        </div>
    )
};

export default UserPlanInfoProfile;