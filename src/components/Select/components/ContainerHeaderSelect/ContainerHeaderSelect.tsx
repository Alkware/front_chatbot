import { ReactNode, RefObject } from "react"
import { MdArrowDropDown } from "react-icons/md"

interface ContainerHeaderSelect {
    children: ReactNode,
    contentOptionsRef: RefObject<HTMLDivElement>
}

export function ContainerHeaderSelect({ contentOptionsRef, children }: ContainerHeaderSelect) {

    const handleDisplayOptions = () => {
        const ul = contentOptionsRef.current?.querySelector("ul")
        ul && ul.classList.toggle("hidden")
    }

    return (
        <div
            id="select"
            onClick={handleDisplayOptions}
            className="w-full border bg-primary-100/30 dark:bg-gray border-primary-100 p-2 flex gap-4 justify-between items-center cursor-pointer rounded-md text-primary-100 dark:text-light"
        >
            <div className="w-full text-center flex gap-x-4 gap-y-1 justify-center flex-wrap">
                {children}
            </div>
            <MdArrowDropDown className="text-2xl" />
        </div>
    )
};