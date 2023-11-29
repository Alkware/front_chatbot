import { useContext } from "react";
import { ClientContext } from "../../../context/ClientContext";
import { TbBusinessplan } from "react-icons/tb";
import { calculatesRemainingFreeTrialDays } from "../../../functions/calculatesRemainingFreeTrialDays";


interface UserPlanTypes {
    menuIsOpen: boolean
}

const UserPlanInfoProfile = ({ menuIsOpen }: UserPlanTypes) => {
    const { client } = useContext(ClientContext)

    const freeTrial = () => {
        if (client?.plan_management) return calculatesRemainingFreeTrialDays(client?.plan_management.free_trial)
        else return 0
    }

    return (
        client &&
        <div
            className="w-full h-[12%] min-h-[80px] flex gap-2 justify-center items-center border-b-[1px] border-b-blue_dark/30 relative"
        >
            <div
                className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer"
            >
                <img src={client?.logo || "https://via.placeholder.com/100"} alt="" />
            </div>
            <div
                className={`flex flex-col ${menuIsOpen ? "block" : "hidden"}`}
            >
                <h2 className="text-white text-center">{client?.fullname}</h2>

                {
                    client.plan_management ?
                        <h3 className="text-xs uppercase flex justify-center items-center gap-1">
                            <TbBusinessplan className="text-lg text-yellow-400 font-bold" />
                            <p className="text-yellow-400 font-bold ">
                                {client.plan_management.plan.plan_name}
                            </p>
                        </h3>
                        :
                        <p className="text-sm text-zinc-300">convidado</p>
                }
                {
                    freeTrial() > 0 &&
                    <h3 className="flex flex-col">
                        <span className="text-red-800/80 text-xs text-center ">(Periodo gratuito)</span>
                        <span className="text-red-800/70 text-xs text-center "> {(+ freeTrial() + " dias restantes")}</span>

                    </h3>
                }
            </div>
        </div>
    )
};

export default UserPlanInfoProfile;