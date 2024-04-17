import { FaAsterisk } from "react-icons/fa";

export function StarsAnimation() {
    return (
        <div className="w-[80vw] flex flex-col absolute bottom-[10vw]">
            {
                Array.from({ length: 8 }).map((_, indexContainer) =>
                    <div
                        className="w-full flex"
                        key={indexContainer}
                        style={{ paddingLeft: `${(indexContainer) * 4}vw`, justifyContent: `${indexContainer < 2 ? "space-between" : indexContainer < 4 ? "space-evenly" : "space-around"}` }}
                    >
                        {
                            Array.from({ length: 4 }).map((_, index) =>
                                indexContainer % 2 ?
                                    <FaAsterisk
                                        key={index}
                                        data-animate={index === 0 ? 1 : index}
                                        className="fill-primary-100 text-sm data-[animate='1']:animate-rising-10 data-[animate='2']:animate-rising-14 data-[animate='3']:animate-rising-18 z-0 opacity-15"
                                    />
                                    :
                                    <FaAsterisk
                                        key={index}
                                        data-animate={index === 0 ? 1 : index}
                                        className="fill-primary-100 text-sm data-[animate='1']:animate-rising-reverse-10 data-[animate='2']:animate-rising-reverse-14 data-[animate='3']:animate-rising-reverse-18 z-0 opacity-15"
                                        style={{ margin: `0 ${index}px` }}
                                    />

                            )
                        }
                    </div>
                )
            }
        </div>
    )
};