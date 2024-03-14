import { Desktop } from "./components/Desktop/Desktop";
import { Mobile } from "./components/Mobile/Mobile";



export function SimulatorDevice() {
    return (
        <div
            className="group w-[400px] h-auto border-[20px] border-black rounded-[2rem] z-50 transform-mobile-to-desktop"
        >
            <Mobile />
            <Desktop />
        </div>
    )
};