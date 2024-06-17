import { FC } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
    name: string;
    type: "text" | "password";
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errorMsg: string;
    placeholder: string;
}

const FormInput: FC<Props> = ({name, type, value, onChange, errorMsg, placeholder}) => {
    return (
        <div>
            <div className="relative">
                <input 
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`border-b-2 text-2xl bg-transparent px-4 min-w-[550px] py-1.5 ${errorMsg ? "text-red-500 border-red-500 placeholder:text-red-500" : "text-light-gray border-light-gray"}`}
                    placeholder={placeholder}
                />
                {errorMsg && (
                    <div className="absolute right-4 center-y text-red-500">
                        <IoIosCloseCircleOutline size={30} />
                    </div>
                )}
            </div>
            {errorMsg && (
                <div className="px-4 text-red-500 text-base mt-1.5">
                    {errorMsg}
                </div>
            )}
        </div>
    )
}

export default FormInput;