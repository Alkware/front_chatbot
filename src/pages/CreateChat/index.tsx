import { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackHome } from "./components/BackHome";
import { getPlanManagementById } from "../../api/planManagement";
import { Steps } from "./components/Steps";
import { SimulatorChat } from "../../components/SimulatorChat";
import { GeneralInformation } from "../../components/Forms/ChatForm/components/GeneralInformation";
import { ProductDescribe } from "../../components/Forms/ChatForm/components/ProductDescribe";
import { ButtonSteps } from "./components/ButtonSteps";

export function CreateChat() {
    const { plan_management_id } = useParams();
    const [currentIndex] = useState(0)
    const navigate = useNavigate();
    const containerForm: RefObject<HTMLDivElement> = useRef(null);
    const tabIndex = ["general_information", "product_describe"]

    useEffect(() => {
        (async () => {
            const planManagement = await getPlanManagementById(plan_management_id)
            if (!planManagement) navigate("/panel")
        })()
    }, [])


    return (
        <div className="w-screen h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center overflow-hidden">
            <div className="w-4/5 p-8 min-w-[900px] rounded-2xl flex flex-col gap-8 justify-center items-center bg-primary-100 dark:bg-dark border border-primary-300">

                <BackHome />

                <Steps
                    numberSteps={tabIndex.length}
                    currentIndex={currentIndex}
                />

                <div className="w-full flex justify-center gap-8">

                    <div
                        ref={containerForm}
                        className="flex flex-col gap-12 w-3/4 max-w-[700px]"
                    >
                        <GeneralInformation />

                        <ProductDescribe />

                        <ButtonSteps
                            stepSize={tabIndex.length}
                            plan_management_id={plan_management_id}
                        />
                    </div>

                    <SimulatorChat />
                </div>
            </div>
        </div >
    )
};