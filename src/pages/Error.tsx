import { FC } from "react"
import { useNavigate } from "react-router-dom"
import BlueButton from "../components/buttons/BlueButton";

const Error: FC = () => {
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate("/")
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center">
            <div className="flex flex-col text-white items-center gap-12">
                <h1 className="text-9xl font-bold">404</h1>
                <div className="text-2xl">Page not found!</div>
                <div>
                    <BlueButton type="button" onClick={handleNavigateToHome}>На головну</BlueButton>
                </div>
            </div>
        </div>
    )
}

export default Error