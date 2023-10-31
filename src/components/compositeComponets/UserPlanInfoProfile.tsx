import { useContext } from "react";
import { ClientContext } from "../../context/ClientContext";


interface UserPlanTypes {
    menuIsOpen: boolean
}

const UserPlanInfoProfile = ({ menuIsOpen } : UserPlanTypes) => {
    const { client } = useContext(ClientContext)

    return (
        <div
            className="w-full h-[12%] min-h-[80px] flex gap-2 justify-center items-center border-b-[1px] border-b-blue_dark/30 relative"
        >
            <div
                className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer"
            >
                <img src={client?.logo || "https://via.placeholder.com/100"} alt="" />
            </div>
            <div
                className={`flex flex-col ${menuIsOpen ? "block": "hidden"}`}

            >
                <h2 className="text-white text-center">{client?.fullname}</h2>
                <h3 className="text-yellow-400 font-bold text-xs ">Premium plan</h3>
                <h3 className="text-white text-xs ">R$ 87,34 crédits</h3>
            </div>
        </div>
    )
};

export default UserPlanInfoProfile;