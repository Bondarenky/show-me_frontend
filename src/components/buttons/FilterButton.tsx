import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
    selectedType: string;
    videoType: string
    handleClick: (value: string)  => void;
}

const FilterButton: FC<Props> = ({ children, handleClick, videoType, selectedType }) => {

    const onSelectToggle = () => {
        handleClick(videoType === selectedType ? "" : videoType)
    }

    return (
        <div className="flex">
            <button className={`px-11 py-1.5 ${videoType === selectedType ? "bg-dark-gray" : "bg-dark-gray/45"} text-white text-2xl rounded-20 min-w-[175px] hover:bg-dark-gray`} onClick={onSelectToggle}>{children}</button>
        </div>
    )
}

export default FilterButton