import { useNavigate } from "react-router-dom";

function Index() {
    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate("/panel")
    }

    return (
        <div
            className="w-screen h-screen bg-black grid place-items-center"
            onClick={handleClickLogo}
        >
            <div className="w-full max-w-[500px] max-h-[500px] cursor-pointer">
                <img
                    src="https://i.ibb.co/vcHSv0S/Blue-Minimal-Lion-Technology-Free-Logo.jpg"
                    alt=""
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    )
}

export default Index;