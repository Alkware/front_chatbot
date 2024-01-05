import { Dispatch, SetStateAction } from "react";
import { FcInfo, FcMindMap, FcNews, FcSettings } from "react-icons/fc";
import { useSearchParams } from "react-router-dom";
import { Project } from "../../../../../../../../../../../../@types/Project";
import { STEP_NAME_URL } from "../../../../../../../../../../../../components/Forms/components/FormInputs/components/ButtonSteps/ButtonSteps";
import { ButtonsModal } from "./components/ButtonModal/ButtonsModal";
import { Li } from "../../../../../../../../../../../../components/li/Li";

interface ListMenuModalChat {
    project: Project
    setNewProject: Dispatch<SetStateAction<Project>>
}

export const ListMenuModalChat = ({ project, setNewProject }: ListMenuModalChat) => {
    const [params, setParams] = useSearchParams()

    const listName = [
        {
            text: "Informações gerais",
            icon: <FcInfo />,
            index:0,
        },
        {
            text: "Descrição do produto",
            index:1,
            icon: <FcNews />
        },
        {
            text: "Rastreamento/Eventos",
            index:2,
            icon: <FcMindMap />
        },
        {
            text: "Configurações do chat",
            index:3,
            icon: <FcSettings />
        },
    ]

    const handleActiveLi = ({ target }: any) => {
        const { index } = target.dataset;
        params.set(STEP_NAME_URL, index)
        setParams(params)
    }


    return (
        <div className="w-1/4 h-full max-w-[300px] min-w-[250px] flex flex-col justify-between items-center border-r border-primary-100">

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
                setNewProject={setNewProject}
            />

        </div>
    )
};