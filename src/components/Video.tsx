import { FC } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {
    videoId: string;
    channelPath: string
    title: string;
    img: string;
    channelTitle: string
    channelImg: string | null
}

const Video: FC<Props> = ({videoId, channelPath, title, img, channelTitle, channelImg}) => {
    const userId = localStorage.getItem("userId")

    return (
        <div className="max-w-[330px] flex flex-col">
            <div className="h-[196px] w-[330px] relative rounded-20 overflow-hidden flex justify-center bg-dark-gray/35">
                <Link to={`/video/${videoId}`} className="w-full flex justify-center">
                    <img src={img} alt={img} className="object-cover h-full w-auto"/>
                </Link>
            </div>
            <div className="flex gap-2.5 mt-2.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex justify-center items-center">
                    <Link to={channelPath}>
                        {channelImg && (
                            <img src={channelImg} alt={channelImg} className="h-full w-full object-cover"/>
                        )}
                        {!channelImg && (
                            <FaRegCircleUser size={40} className="text-dark-gray"/>
                        )}
                    </Link>
                </div>
                <div className="text-light-gray text-2xl">
                    <div>
                        <Link to={`/video/${videoId}`}>{title}</Link>
                    </div>
                    <Link to={userId === channelPath ? "/my-profile" : `/profile/${channelPath}`} className="font-bold">{channelTitle}</Link>
                </div>
            </div>
        </div>
    )
}

export default Video;