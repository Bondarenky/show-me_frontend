import { FC } from "react";
import Header from "../components/Header";
import UserNavigation from "../components/UserNavigation";
import ProfileInput from "../components/inputs/ProfileInput";
import BlueButton from "../components/buttons/BlueButton";
import { IoIosNotificationsOutline } from "react-icons/io";
import Video from "../components/Video";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery, useToggleSubMutation } from "../services/user.service";
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";

const Profile: FC = () => {
    const {userId} = useParams();
    const isAuth = useAuth()
    const navigate = useNavigate();

    const {data: userDataResponse} = useGetUserQuery(userId || "", {
        skip: !userId
    })
    const [toggleSub, {}] = useToggleSubMutation();

    const handleFollow = async() => {
        if(userId) {
            await toggleSub(userId);
        }
    }

    const handleNavigateToLogin = () => {
        navigate("/sign-in");
    }

    return (
        <div className="flex flex-col gap-7 z-0 py-4 flex-1">
            <Header>
                <>
                    <div>
                        <img src="logo.png" alt="logo" />
                    </div>
                    <UserNavigation/>
                </>
            </Header>
            {userDataResponse && (
                <div className="px-12 flex flex-col gap-12">
                    <div className="flex gap-12 items-center">
                        <div className="relative rounded-full overflow-hidden w-56 h-56">
                            {userDataResponse?.userImageUrl && (
                                <img src={userDataResponse.userImageUrl} alt={userDataResponse.userImageUrl} className="w-full h-full object-cover"/>
                            )}
                            {!userDataResponse?.userImageUrl && (
                                <div className="text-white flex justify-center items-center">
                                    <FaRegCircleUser size={224}/>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col gap-7">
                            <div>
                                <form className="flex flex-col gap-7 items-start">
                                    <ProfileInput name="username" value={userDataResponse?.userName} disabled={true} /> 
                                </form>
                            </div>
                            <div className="flex justify-start">
                                <BlueButton type="button" styles={`px-4 rounded-20 ${userDataResponse.subscribed ? "bg-dark-gray/75 hover:bg-dark-gray" : "" }`} onClick={isAuth ? handleFollow : handleNavigateToLogin}>
                                    <div className="flex gap-5 items-center">
                                        <IoIosNotificationsOutline size={32}/>
                                        <div>{userDataResponse?.subscribed ? "Ви Підписані" : "Підписатися"}</div>
                                    </div>
                                </BlueButton>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-12">
                        <h4 className="text-3xl text-white font-bold">Завантажені відео</h4>
                        <div className="flex flex-wrap gap gap-x-16 gap-y-16">
                            {userDataResponse.videos && userDataResponse.videos.map(video => (
                                <Video channelImg={video.userImageUrl} channelPath={video.userId} channelTitle={video.userName} img={video.videoPreviewUrl} title={video.videoTitle} videoId={video.videoId} key={video.videoId} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile;