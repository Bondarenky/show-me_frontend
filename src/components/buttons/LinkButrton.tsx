import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode,
    type: "submit" | "button",
    onClick: () => void,
}

const LinkButton: FC<Props> = ({children, type, onClick}) => {
    return (
        <div className="flex flex-col items-center">
            <button onClick={onClick} type={type} className="py-1.5 border-b-2 border-white px-0.5 text-2xl text-white">{children}</button>
        </div>
    )
}

export default LinkButton