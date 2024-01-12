import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { Project } from "../../../../../../../../../../../../@types/Project";
import { ButtonsModal } from "./components/ButtonModal/ButtonsModal";
import { Li } from "../../../../../../../../../../../../components/li/Li";
import { STEP_NAME_URL } from "../../../../../../../../../../../../variables/variables";

interface ListMenuModalChat {
    project: Project
    listName: Array<{
        text: string, 
        icon: ReactElement,
        index: number,
    }>
}

export const ListMenuModalChat = ({ project, listName }: ListMenuModalChat) => {
    const [params, setParams] = useSearchParams()


    const handleActiveLi = ({ target }: any) => {
        const { index } = target.dataset;
        params.set(STEP_NAME_URL, index)
        setParams(params)
    }


    return (
        <div className="w-auto h-full max-w-[300px] min-w-[250px] flex flex-col justify-between items-center px-2 border-r border-primary-100">

            <ul className="w-full flex flex-col uppercase">
                {
                    listName.map((list) =>
                        <Li
                            key={list.index}
                            text={list.text}
                            icon={list.icon}
                            index={list.index}
                            onClick={handleActiveLi}
                        />
                    )
                }
            </ul>

            <ButtonsModal
                project={project}
            />

        </div>
    )
};