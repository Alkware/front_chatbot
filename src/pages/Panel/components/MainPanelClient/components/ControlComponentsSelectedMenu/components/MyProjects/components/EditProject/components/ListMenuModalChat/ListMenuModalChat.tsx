import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { Li } from "../../../../../../../../../../../../components/li/Li";
import { STEP_NAME_URL } from "../../../../../../../../../../../../variables/variables";

interface ListMenuModalChat {
    listName: Array<{
        text: string, 
        icon: ReactElement,
        index: number,
    }>
}

export const ListMenuModalChat = ({ listName }: ListMenuModalChat) => {
    const [params, setParams] = useSearchParams()


    const handleActiveLi = ({ target }: any) => {
        const { index } = target.dataset;
        params.set(STEP_NAME_URL, index)
        setParams(params)
    }


    return (
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
    )
};