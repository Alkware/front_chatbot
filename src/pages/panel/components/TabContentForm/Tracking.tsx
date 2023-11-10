import { InputTextForm } from "../ComponentsForms/InputTextForm";

interface ProductDescribe {
    register: any,
}


export function Tracking({ register }: ProductDescribe) {
    return (
        <div
            className="w-full hidden flex-col justify-center items-center"
            data-index="tracking"
            id="container"
        >
            <h2 className="w-full text-center text-2xl">Rastreamento e eventos</h2>

            <InputTextForm
                field_name="pixel_facebook"
                title="Pixel do facebook"
                placeholder="ex.: 111111111111111111"
                register={register}
            />
        </div>
    )
};