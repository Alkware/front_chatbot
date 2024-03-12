import { MdAlarm, MdBattery50, MdSignalCellular3Bar } from "react-icons/md";

interface SimulatorDevice {
    isDesktop?: boolean
}

export function SimulatorDevice({ isDesktop }: SimulatorDevice) {
    return (
        <div 
            data-isdesktop={!!isDesktop}
            className="group data-[isdesktop=true]:w-[90vw] w-[400px] h-[720px] border-[20px] border-black rounded-[2rem] bg-black"
        >
            <div className="w-full h-full bg-zinc-800 rounded-2xl overflow-hidden flex flex-col">
                <div 
                    className="w-full flex justify-around group-data-[isdesktop=true]:justify-end"
                >
                    <div className="flex px-4 p-1">
                        <MdAlarm className="text-xl fill-light" />
                    </div>
                    <div 
                        className="group-data-[isdesktop=true]:hidden w-1/2 h-[30px] bg-black rounded-b-2xl flex justify-evenly items-center gap-4"
                    >
                        <div className="w-1/5 h-1/3 rounded-2xl bg-zinc-600"></div>
                        <div className="w-1/12 h-1/3 rounded-2xl bg-zinc-600"></div>
                    </div>
                    <div className="flex gap-2 justify-end px-4 p-1">
                        <MdSignalCellular3Bar className="text-xl fill-light" />
                        <MdBattery50 className="text-xl fill-light" />
                    </div>
                </div>
                <div
                    className="w-full h-[80vh] flex flex-col"
                >

                </div>
            </div>
        </div>
    )
};