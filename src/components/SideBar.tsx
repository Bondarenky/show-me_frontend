import { FC, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FaUserLarge } from "react-icons/fa6";
import { RiFolderVideoLine, RiUserReceived2Line } from "react-icons/ri";
import { VscHome } from "react-icons/vsc";
import { NavLink, useNavigate } from "react-router-dom";
import ChannelButton from "./buttons/ChannelButton";
import ProfileButton from "./buttons/ProfileButton";
import { BsClockHistory } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";
import { CiLogout } from "react-icons/ci";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { useGetSubscriptionQuery } from "../services/user.service";

const SideBar: FC = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSubscriptions, setShowSubscriptions] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userId = localStorage.getItem("userId");

    const {data: userSubscriptions} = useGetSubscriptionQuery(userId || "", {
        skip: !userId
    })

    const isAuth = useAuth();

    const handleShowSidebar = () => {
        setShowSidebar(state => !state);
        setShowSubscriptions(false);
        setShowProfile(false)
    }

    const handleShowSubscriptions = () => {
        setShowSubscriptions(state => !state);
    }

    const handleShowProfile = () => {
        setShowProfile(state => !state);
    }

    const handleShowLogin = () => {
        navigate("/sign-in");
    }

    const handleLogout = () => {
        dispatch(logout());
        removeTokenFromLocalStorage("accessToken");
        removeTokenFromLocalStorage("userId");
        handleShowSidebar();
        navigate("/");
    }

    const handleFollowed = () => {
        navigate("/followed")
    }

    return (
        <>
            <div className={`fixed h-full max-w-64 text-light-gray font-actor flex flex-col gap-12 overflow-auto pt-7 ${showSidebar ? "bg-dark-gray/45" : ""}`}>
                    <div onClick={handleShowSidebar} className={`cursor-pointer px-4 flex ${showSubscriptions && userSubscriptions?.length !== 0 || showProfile ? "justify-start" : "justify-center"}`}>
                        <CgMenuGridR size={64} />
                    </div>
                    <div>
                        {showSidebar && (
                            <div className="flex flex-col gap-9">
                                <div className={`flex px-4 ${showSubscriptions && userSubscriptions?.length !== 0 || showProfile ? "justify-start" : "justify-center"}`}>
                                    <NavLink to={"/"} className={`flex gap-x-3 items-center ${showSubscriptions && userSubscriptions?.length !== 0 || showProfile ? "flex-row" : "flex-col"}`}>
                                        <VscHome  size={36}/>
                                        <div className="text-white text-xl">
                                            Головна
                                        </div>
                                    </NavLink>
                                </div>
                                <div>
                                    <div className={`flex px-4 ${showSubscriptions && userSubscriptions?.length !== 0 || showProfile ? "justify-start" : "justify-center"}`}>
                                        <button 
                                            className={`flex gap-x-3 items-center ${showSubscriptions && userSubscriptions?.length !== 0 || showProfile ? "flex-row" : "flex-col"}`} 
                                            onClick={isAuth ? handleShowSubscriptions : handleShowLogin}>
                                                <RiFolderVideoLine size={36}/>
                                                <div className="text-white text-xl">
                                                    Підписки
                                                </div>
                                        </button>    
                                    </div>
                                    {showSubscriptions && userSubscriptions?.length !== 0 && (
                                        <div className="border-y-2 px-8 py-4 mt-4 border-white/30 flex flex-col gap-4">
                                            {userSubscriptions && userSubscriptions.map(sub => (
                                                <ChannelButton image={sub.imageUrl} path={`/profile/${sub.id}`} key={sub.id}>{sub.name}</ChannelButton>
                                            ))}
                                            <div className="flex justify-center">
                                                <button onClick={handleFollowed}>Детальніше</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className={`flex px-4 ${showSubscriptions && userSubscriptions?.length !== 0 || showProfile ? "justify-start" : "justify-center"}`}>
                                        <button 
                                            className={`flex gap-x-3 items-center ${showSubscriptions && userSubscriptions?.length !== 0 || showProfile ? "flex-row" : "flex-col"}`} 
                                            onClick={isAuth ? handleShowProfile : handleShowLogin}>
                                                <FaUserLarge size={36}/>
                                                <div className="text-white text-xl">
                                                    Профіль
                                                </div>
                                        </button>
                                    </div>
                                    {showProfile && isAuth && (
                                        <div className="border-y-2 px-8 py-4 mt-4 border-white/30 flex flex-col gap-4">
                                            <ProfileButton path="/my-profile" title="Мій профіль">
                                                <RiUserReceived2Line size={32} />
                                            </ProfileButton>
                                            <ProfileButton path="/history" title="Історія">
                                                <BsClockHistory size={32}/>
                                            </ProfileButton>
                                            <ProfileButton path="/liked" title="Вподобані">
                                                <BiLike size={32}/>
                                            </ProfileButton>
                                            <ProfileButton title="Вийти" onClick={handleLogout}>
                                                <CiLogout size={32}/>
                                            </ProfileButton>
                                        </div>
                                    )}    
                                </div>   
                            </div>
                        )}
                    </div>
            </div>
        </>
    )
}

export default SideBar;