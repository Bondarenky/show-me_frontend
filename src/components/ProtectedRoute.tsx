import { FC } from "react"
import { useAuth } from "../hooks/useAuth"

interface Props {
    children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth()

    return (
        <>
            {isAuth ? children : (
                <div className="absolute top-0 left-0 w-full h-full bg-black z-50 flex justify-center items-center">
                    <h1 className="text-white text-5xl">Forbidden</h1>
                </div>
            )}
        </>
    )
}

export default ProtectedRoute;