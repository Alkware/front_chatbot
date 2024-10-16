import { FaCheckCircle } from "react-icons/fa"
import { FaCircleXmark, FaX } from "react-icons/fa6"
import { MdArrowBackIos, MdArrowForwardIos, MdLink } from "react-icons/md";
import { MouseEvent, useContext } from "react";
import { Model } from "../../Tour";
import { ModalContext } from "../../../../context/ModalContext";
import { PopUp } from "../../../modal/templates/PopUp";
import { Text } from "../../../Text/Text";

interface ContentStepTour {
    tour: Model;
    index: number;
    modelSize: number;
}

export function ContentStepTour({ tour, index, modelSize }: ContentStepTour) {
    const { setModalContent, clearModal } = useContext(ModalContext);

    /**
    * Função responsável por dar o scroll nos container de estágios...
    * @param {MouseEvent} currentTarget atual elemento ao qual foi disparado a ação.
    */
    const handleScrollingTour = ({ currentTarget }: MouseEvent) => {
        const { id } = currentTarget;
        const container = currentTarget.closest("div")?.querySelector("div#container-stages");
        const containerChildWidth = Math.floor(container?.querySelector("div")?.getBoundingClientRect().width || 0);

        if (id === "scroll-left") container?.scrollBy({ left: -100, behavior: "smooth" });
        else container?.scrollBy({ left: +containerChildWidth, behavior: "smooth" })
    }

    return (
        <div
            data-completed={tour.completed}
            data-display={tour.display}
            className="group w-full h-full max-h-[70vh] data-[display=false]:h-auto flex gap-4 items-start"
        >
            <div className="w-[5%] h-full relative py-1 flex justify-center items-start group-data-[completed=false]:opacity-50 group-data-[display=true]:opacity-100">
                <div
                    data-display={index !== (modelSize - 1)}
                    className="h-full w-[1px] bg-white absolute top-1 -z-0 left-1/2 data-[display=false]:hidden"
                ></div>
                {tour.completed ?
                    <FaCheckCircle className="size-5 fill-green-500 bg-white rounded-full relative z-0" />
                    :
                    <FaCircleXmark className="size-5 fill-red-500 bg-white rounded-full relative z-0" />
                }
            </div>
            <div
                className="w-[90%] flex flex-col group-data-[completed=false]:opacity-50 group-data-[display=true]:opacity-100"
            >
                <Text.h3 className="w-full font-bold text-lg text-left text-light">{tour.title}</Text.h3>
                <div
                    className="w-full group-data-[display=false]:hidden overflow-hidden"
                >
                    <Text.h3 className="p-1 italic text-light ">Fazer manualmente</Text.h3>
                    <div
                        className="w-full relative"
                    >
                        <MdArrowBackIos
                            id="scroll-left"
                            className="size-10 fill-white cursor-pointer absolute top-1/2 left-0 opacity-50 transition-opacity hover:opacity-100"
                            onClick={handleScrollingTour}
                        />
                        <div
                            id="container-stages"
                            className="w-full flex gap-4 p-2 overflow-hidden snap-mandatory snap-x"
                        >
                            {tour.stages?.map((stage, index) =>
                                <div
                                    key={stage.title}
                                    className="w-full flex-none flex flex-col items-center gap-2 snap-start"
                                >
                                    <div className="w-full flex items-start justify-center gap-1 ">
                                        <span className="w-10 bg-primary-100 rounded-full flex justify-center font-bold">{index + 1}</span>
                                        <Text.h3 className="text-left">{stage.title}</Text.h3>
                                    </div>
                                    <img
                                        src={stage.image}
                                        alt={stage.title}
                                        className="max-w-[200px] object-contain cursor-pointer z-40 transition-transform"
                                        onClick={() => {
                                            setModalContent({
                                                componentName: "modal_show_image",
                                                components: <PopUp>
                                                    <FaX 
                                                        onClick={()=> clearModal("modal_show_image")}
                                                        className="absolute top-2 right-2 size-6 cursor-pointer"
                                                    />
                                                    <img
                                                        src={stage.image}
                                                        alt={stage.title}
                                                        className="max-w-[500px] object-contain rounded-md"
                                                    />

                                                </PopUp>
                                            })
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <MdArrowForwardIos
                            id="scroll-right"
                            className="size-10 fill-white cursor-pointer absolute top-1/2 right-0  opacity-50 transition-opacity hover:opacity-100"
                            onClick={handleScrollingTour}
                        />
                    </div>
                    <Text.h3 className="p-1 italic ">ou</Text.h3>
                    <div className="flex justify-evenly">
                        {tour.buttons.map(button =>
                            <a
                                key={button.url}
                                href={button.url}
                                target={button.target}
                                onClick={() => button.target === "_blank" && window.location.reload()}
                                className="my-4 p-2 px-4 bg-primary-100 rounded-md cursor-pointer flex gap-2 items-center"
                            ><MdLink /> {button.text || "Link rapído"}</a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};