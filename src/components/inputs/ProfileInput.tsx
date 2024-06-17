import { FC } from "react";

interface Props {
    value: string;
    onChange?: (e: any) => void; 
    name: string;
    disabled?: boolean
}

const ProfileInput: FC<Props> = ({name, value, onChange, disabled = false}) => {
    return (
        <div className="max-w-[335px] w-full">
            <input type="text" value={value} name={name} onChange={onChange} disabled={disabled} className="bg-transparent border-b-2 border-light-gray text-2xl px-2.5 py-1.5 w-full text-white"/>
        </div>
    )
}

export default ProfileInput;