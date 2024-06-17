import { FC } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useGetUserQuery } from "../services/user.service";

const UserNavigation: FC = () => {
    const navigate = useNavigate()
    const isAuth = useAuth();

    const userId = localStorage.getItem("userId")
    const {data: userDataResponse} = useGetUserQuery(userId || "", {
        skip: !userId
    })

    const userImg = userDataResponse?.userImageUrl

    const handleClickLogin = () => {
        navigate("/sign-in")
    }

    const handleClickProfile = () => {
        navigate("/my-profile")
    }

    return (
        <div className="flex text-dark-gray gap-5">
            <div>
                <button onClick={!isAuth ? handleClickLogin : handleClickProfile} className="overflow-hidden rounded-20">
                    {userImg && (
                        <img src={userImg} alt={userImg} className="w-[40px] h-[40px] object-cover"/>
                    )}
                    {!userImg && (
                        <FaRegCircleUser size={40}/>
                    )}
                </button>
            </div>
        </div>
    )
}

export default UserNavigation;