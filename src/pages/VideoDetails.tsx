import { FC } from "react";
import Header from "../components/Header";
import UserNavigation from "../components/UserNavigation";
import { Link, useNavigate, useParams } from "react-router-dom";
import LikedButton from "../components/buttons/LikedButton";
import BlueButton from "../components/buttons/BlueButton";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import ReactPlayer from "react-player";
import { useGetVideoQuery, useToggleDislikeMutation, useToggleLikeMutation } from "../services/videos.service";
import { toast } from "react-toastify";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { useToggleSubMutation } from "../services/user.service";
import { useAuth } from "../hooks/useAuth";

const VideoDetails: FC = () => {
    const isAuth = useAuth();
    const navigate = useNavigate();
    const {videoId} = useParams();
    const userId = localStorage.getItem("userId");
    const {data: videoDetails, refetch: refetchVideoDetails} = useGetVideoQuery(videoId || "", {
        skip: !videoId,
        pollingInterval: 60000
    });
    const [toggleLike, {}] = useToggleLikeMutation()
    const [toggleDislike, {}] = useToggleDislikeMutation();
    const [toggleSub, {}] = useToggleSubMutation();

    const handleToggleLike = async() => {
        if(videoId) {
            await toggleLike(videoId)
        }
    }

    const handleToggleDislike = async() => {
        if(videoId) {
            await toggleDislike(videoId)
        }
    }

    const handleShare = async () => {
        const shareableLink = window.location.href;
        try {
            await navigator.clipboard.writeText(shareableLink);
            toast("Link copied to clipboard!")
        } catch (error) {
            toast.error("Failed to copy link.");
        }
    };

    const handleFollow = async() => {
        if(videoDetails) {
            await toggleSub(videoDetails.authorId);
            await refetchVideoDetails();
        }
    }

    const handleNavigateToLogin = () => {
        navigate("/sign-in");
    }
    
    return (
        <div className="flex flex-col gap-12 z-0 py-4">
            <Header>
                <>
                    <div>
                        <img src="logo.png" alt="logo" />
                    </div>
                    <UserNavigation/>
                </>
            </Header>
            <div className="px-12">
                <div className="flex items-end gap-12">
                    <div>
                        <ReactPlayer controls url={videoDetails?.videoUrl} width={window.innerWidth > 1536 ? 900 : 700} height={500} />
                    </div>
                    <div className="flex flex-col gap-12">
                        <Link to={userId === videoDetails?.authorId ? "/my-profile" : `/profile/${videoDetails?.authorId}`} className="flex items-center gap-2.5">
                            <div className="w-20 h-20 rounded-full flex justify-center items-center overflow-hidden text-dark-gray">
                                {videoDetails?.authorImageUrl && (
                                    <img src={videoDetails.authorImageUrl} alt={videoDetails.authorImageUrl} />
                                )}
                                {!videoDetails?.authorImageUrl && (
                                    <FaRegCircleUser size={80}/>
                                )}
                            </div>
                            <div className="text-3xl text-white font-bold">
                                {videoDetails?.authorName || "Супермама"}
                            </div>
                        </Link>
                        <div className="flex justify-start items-center gap-3">
                            <LikedButton count={videoDetails?.likes || 0} onClick={isAuth ? handleToggleLike : handleNavigateToLogin}>
                                <>
                                    {!videoDetails?.isLiked && (
                                         <BiLike size={32}/>
                                    )}
                                    {videoDetails?.isLiked && (
                                        <BiSolidLike size={32} />
                                    )}
                                </>
                            </LikedButton>
                            <LikedButton count={videoDetails?.dislikes || 0} onClick={isAuth ? handleToggleDislike : handleNavigateToLogin}>
                                <>
                                    {videoDetails?.isDisliked && (
                                         <BiSolidDislike size={32}/>
                                    )}
                                    {!videoDetails?.isDisliked && (
                                        <BiDislike size={32} />
                                    )}
                                </>
                            </LikedButton>
                            <div className="flex flex-col items-start gap-3">
                                {userId !== videoDetails?.authorId && !videoDetails?.subscribed &&  (
                                    <BlueButton type="button" styles="px-4 rounded-20" onClick={isAuth ? handleFollow : handleNavigateToLogin}>
                                        <div className="flex gap-5 items-center">
                                            <IoIosNotificationsOutline size={32}/>
                                            <div>Підписатися</div>
                                        </div>
                                    </BlueButton>
                                )}
                                {userId !== videoDetails?.authorId && videoDetails?.subscribed &&  (
                                    <BlueButton type="button" styles="px-4 rounded-20 bg-dark-gray/75 hover:bg-dark-gray" onClick={isAuth ? handleFollow : handleNavigateToLogin}>
                                        <div className="flex gap-5 items-center">
                                            <IoIosNotificationsOutline size={32}/>
                                            <div>Ви підписані</div>
                                        </div>
                                    </BlueButton>
                                )}
                                <BlueButton type="button" styles="px-4 rounded-20" onClick={handleShare}>
                                    <div className="flex gap-5 items-center">
                                        <CiLink size={32}/>
                                        <div>Поширити</div>
                                    </div>
                                </BlueButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full border-b-2 border-light-gray py-6">
                        <h2 className="text-3xl text-white font-bold">{videoDetails?.title || "Супермама 59 випуск"}</h2>
                    </div>
                    <div className="py-2.5">
                        <p className="text-white text-2xl px-12">
                            {videoDetails?.description || "Дивіться онлайн проєкт Супермама 6 сезон 59 випуск на YouTube! Третьою гостей зустрічатиме мама без стереотипів Наталя. У неї нестандартні погляди на життя та підходи до материнства, якими вона залюбки поділиться зі своїми суперницями. Чим матусі будуть вражені? Дізнайтеся просто зараз – дивіться онлайн проєкт Супермама 6 сезон 59 випуск. Головний виховний принцип Наталі – не порушувати особисті кордони сина. З самого народження вона ставиться до нього, як до дорослого та дає свободу вибору. Наталія вважає себе супермамою, яка виховує вільну і психологічно здорову дитину. Чи дійсно це так? Які недоліки конкурентки знайдуть у гостях у Наталі? Дізнайтеся просто зараз – дивіться онлайн проєкт Супермама 6 сезон 59 випуск."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetails;