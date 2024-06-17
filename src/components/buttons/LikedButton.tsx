import { FC } from "react";

interface Props {
    count: number;
    onClick: () => void;
    children: JSX.Element
}

const LikedButton: FC<Props> = ({count, onClick, children}) => {
    return (
        <div className="rounded-20 overflow-hidden bg-light-gray/45 max-w-14">
            <div className="p-3 bg-dark-blue/65 text-white rounded-20 overflow-hidden h-14">
                <button onClick={onClick}>
                    {children}
                </button>
            </div>
            <div className="text-center text-light-gray text-2xl font-bold">
                {count}
            </div>
        </div>
    )
}

export default LikedButton;