import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlanManagementById } from "../../api/planManagement";
import { BackHome } from "../CreateChat/components/BackHome";
import { FormWithZod } from "./components/FormWithZod/FormWithZod";


export function CreateDatabase() {
    const { plan_management_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)


            const planManagement = await getPlanManagementById(plan_management_id)
            if (!planManagement) navigate("/panel")
        })()
    }, [])


    return (
        plan_management_id &&
        <div className="w-screen h-screen overflow-x-hidden bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center">
            <div className="w-[90%]  flex flex-col gap-2 justify-center items-center">

                <BackHome />


                <FormWithZod plan_management_id={plan_management_id} />
{/* 
                <FormCreateDatabase
                    plan_management_id={plan_management_id}
                /> */}

            </div>
        </div >
    )
};