import { IoIosCreate } from "react-icons/io";
import { Button } from "../../../../../../../button/Button";

interface ButtonAction {
    display: boolean
    plan_management_id: string
}


export function ButtonAction({ display }: ButtonAction) {

    return (
        display &&
        <Button >
            Criar chat
            <IoIosCreate className="text-xl" />
        </Button>
    )
};