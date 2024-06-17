import { FC, ReactNode } from "react";

interface Props {
    type: "submit" | "button";
    children: ReactNode;
    onClick?: () => void;
    styles?: string
}

const BlueButton: FC<Props> = ({type, children, onClick, styles}) => {
    return (
        <div className="flex justify-center">
            <button type={type} className={`bg-dark-blue/65 hover:bg-dark-blue/100 px-12 py-4 text-2xl text-white ${styles ? styles : "rounded-20"}`} onClick={onClick}>{children}</button>
        </div>
    )
} 

export default BlueButton;