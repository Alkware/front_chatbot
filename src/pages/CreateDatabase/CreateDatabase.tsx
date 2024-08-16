import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlanManagementById } from "../../api/planManagement";
import { FormCreateDatabase } from "./components/FormCreateDatabase/FormCreateDatabase";
import { setThemePage } from "../../functions/setThemePage";

export function CreateDatabase() {
    const { plan_management_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            // define o thema da página de login
           setThemePage();

            const planManagement = await getPlanManagementById(plan_management_id);

            if (!planManagement) {
                navigate("/panel")
                return;
            }
        })()
    }, [])


    return (
        (plan_management_id) &&
        <div className="w-screen min-h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col justify-start items-center">
            <div className="w-[90%] flex flex-col gap-2 justify-start items-center">
                <FormCreateDatabase
                    plan_management_id={plan_management_id}
                />
            </div>
        </div >
    )
};