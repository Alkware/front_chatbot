import { useSearchParams } from "react-router-dom";
import { Li } from "../../../../../../../../../../../../components/li/Li";
import { STEP_NAME_URL } from "../../../../../../../../../../../../variables/variables";

interface ListMenuModal {
    children: any;
}

export const ListMenuModal = ({ children }: ListMenuModal) => {
    const [params, setParams] = useSearchParams()


    const handleActiveLi = ({ target }: any) => {
        const { index } = target.dataset;
        params.set(STEP_NAME_URL, index)
        setParams(params)
    }

    return (
            <ul className="w-full flex flex-col uppercase">
                {
                    children.map((child: any) =>
                        <Li
                            key={child.props.index}
                            text={child.props.titleStep}
                            index={child.props.index}
                            onClick={handleActiveLi}
                        />
                    )
                }
            </ul>
    )
};