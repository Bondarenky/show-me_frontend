import { FC } from "react";
import Header from "../components/Header";
import UserNavigation from "../components/UserNavigation";
import Video from "../components/Video";
import { useGetSubscibersQuery } from "../services/user.service";

const Followed: FC = () => {

    const userId = localStorage.getItem("userId");
    const {data: subscribedUsers} = useGetSubscibersQuery(userId || "", {
        skip: !userId
    })

    console.log(subscribedUsers);
    

    return (
        <div className="flex flex-col gap-12 z-0 py-4">
            <Header>
                <>
                    <div>
                        <img src="logo.png" alt="logo" />
                    </div>
                    <UserNavigation />
                </>
            </Header>
            <div className="px-12 flex flex-col gap-12">
                {subscribedUsers && subscribedUsers.map(item => (
                    <div className="flex flex-col gap-6" key={item.id}>
                        <div className="w-full border-b-2 border-white py-2">
                            <h3 className="text-3xl text-light-gray font-bold">{item.name}</h3>
                        </div>
                        <div className="flex gap-16 overflow-auto pb-4">
                            {item && item.videos.map(video => (
                                <Video channelImg={video.userImageUrl} channelPath={video.userId} channelTitle={item.name} img={video.videoPreviewUrl} title={video.videoTitle} videoId={video.videoId} key={video.videoId} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Followed;