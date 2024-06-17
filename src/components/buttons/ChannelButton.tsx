import { FC, ReactNode } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {
    path: string
    image: string | null;
    children: ReactNode
}

const ChannelButton: FC<Props> = ({path, children, image}) => {
    return (
        <Link to={path} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex justify-center items-center overflow-hidden bg-white/35">
                {image && (
                    <img src={image} alt={image} className="w-full h-full object-cover" />
                )}
                {!image && (
                    <FaRegCircleUser size={40}/>
                )}
            </div>
            <div className="text-xl">
                {children}
            </div>
        </Link>
    )
}

export default ChannelButton;