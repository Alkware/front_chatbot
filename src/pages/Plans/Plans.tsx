import { Header } from "../Home/components/Header/Header";
import { Plans } from "../Home/components/Main/components/Plans/Plans";

export function PlansPage() {


    return (
        <div className="w-screen min-h-screen flex flex-col bg-light dark:bg-dark">
            <Header />
            <div className="mt-[100px]">
                <Plans />
            </div>
        </div>
    )
};