import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
    path?: string
    children: JSX.Element
    title: string
    onClick?: () => void
}

const ProfileButton: FC<Props> = ({path, children, title, onClick}) => {
    return (
        <>
            {path && (
                <Link to={path} className="flex items-center gap-2.5">
                    <div className="flex justify-center items-center">
                        {children}
                    </div>
                    <div className="text-xl">
                        {title}
                    </div>
                </Link>
            )}
            {!path && (
                <button className="flex items-center gap-2.5" onClick={onClick}>
                    <div className="flex justify-center items-center">
                        {children}
                    </div>
                    <div className="text-xl">
                        {title}
                    </div>
                </button>
            )}
        </>
    )
}

export default ProfileButton;