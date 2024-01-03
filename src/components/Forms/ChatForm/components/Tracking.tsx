import { InputTextForm } from "../../Components/InputTextForm";

export function Tracking() {
    return (
        <div
            className="w-full hidden flex-col justify-center items-center animate-display-screen"
            data-index="tracking"
            id="container"
        >
            <h2 className="w-full text-center text-2xl">Rastreamento e eventos</h2>

            <InputTextForm
                field_name="pixel_facebook"
                title="Pixel do facebook"
            />
        </div>
    )
};