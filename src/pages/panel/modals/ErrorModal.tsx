export function ErrorModal({ errors }: { errors: any }) {

    console.log(errors)

    return (
        <>
            <p className="w-full mt-2 bg-red-100 text-red-800 text-center">{errors.project_name?.message}</p>
            <p className="w-full mt-2 bg-red-100 text-red-800 text-center">{errors.logo?.message}</p>
            <p className="w-full mt-2 bg-red-100 text-red-800 text-center">{errors.bio?.message}</p>
            <p className="w-full mt-2 bg-red-100 text-red-800 text-center">{errors.prompt?.message}</p>
            <p className="w-full mt-2 bg-red-100 text-red-800 text-center">{errors.describe_client?.message}</p>
            <p className="w-full mt-2 bg-red-100 text-red-800 text-center">{errors.call_to_action?.button_name?.message}</p>
            <p className="w-full mt-2 bg-red-100 text-red-800 text-center">{errors.call_to_action?.link?.message}</p>
            <p className="w-full mt-2 bg-red-100 text-red-800 text-center">{errors.chat_input_message?.message}</p>
        </>
    )
};