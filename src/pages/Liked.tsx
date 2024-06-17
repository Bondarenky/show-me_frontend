import { FC, useEffect } from "react";
import Header from "../components/Header";
import UserNavigation from "../components/UserNavigation";
import Video from "../components/Video";
import { useAuth } from "../hooks/useAuth";
import { useGetLikedQuery } from "../services/videos.service";

const Liked: FC = () => {
    const isAuth = useAuth();
    const {data: likedVideos, refetch: refetchLikedVideos} = useGetLikedQuery("", {
        skip: !isAuth
    })

    useEffect(() => {
        if(isAuth) {
            refetchLikedVideos()
        }
    }, [isAuth])
    

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
            <div className="px-12 flex flex-col gap-12">
                <div>
                    <h3 className="text-3xl text-light-gray font-bold">Вподобані відео</h3>
                </div>
                <div className="flex flex-wrap gap-x-16 gap-y-16">
                    {likedVideos && likedVideos.map(video => (
                        <Video channelImg={video.userImageUrl} channelPath={video.userId} channelTitle={video.userName} img={video.videoPreviewUrl} title={video.videoTitle} videoId={video.videoId} key={video.videoId} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Liked