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
                children.map((child: any, index: number) =>
                    <div
                        key={child.props.index}
                        data-isactive={index === Number(params.get(STEP_NAME_URL)) ? true : false}
                        className="data-[isactive=true]:bg-primary-200 hover:bg-primary-200 overflow-hidden px-2 flex justify-start items-center"
                    >
                        <Li
                            text={child.props.titleStep}
                            index={child.props.index}
                            icon={child.props.icon}
                            onClick={handleActiveLi}
                        />
                    </div>
                )
            }
        </ul>
    )
};