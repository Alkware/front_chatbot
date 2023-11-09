import { InputTextForm } from "../ComponentsForms/InputTextForm";

interface ProductDescribe {
    register: any,
    errors: any
}


export function Tracking({ register, errors }: ProductDescribe) {
    return (
        <div
            className="w-full hidden flex-col justify-center items-center"
            data-index="tracking"
            id="container"
        >
            <h2>Rastreamento e eventos</h2>

            <InputTextForm
                field_name="pixel_facebook"
                title="Pixel do facebook"
                placeholder="ex.: 111111111111111111"
                register={register}
                errors={errors}
            />
        </div>
    )
};