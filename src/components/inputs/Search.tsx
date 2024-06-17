import { ChangeEvent, FC, useState } from "react";
import { VscSearch } from "react-icons/vsc";

interface Props {
    value: string;
    placeholder: string
    onSearch: (value: string) => void;
    handleChangeSearch?: (value: string) => void;
}

const Search: FC<Props> = ({value, placeholder, onSearch, handleChangeSearch}) => {
    const [searchValue, setSearchValue] = useState(value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        if(handleChangeSearch) {
            handleChangeSearch(e.target.value)
        }
    }

    const handleSearch = () => {
        onSearch(searchValue);
    }

    return (
        <div className="relative flex items-center flex-1">
            <input type="text" value={searchValue} onChange={handleChange} className="pl-16 text-dark-gray py-4 bg-transparent border-2 border-blue-gray rounded-20 text-2xl w-full" placeholder={placeholder}/>
            <div className="absolute center-y left-3 text-dark-gray h-full flex items-center">
                <button onClick={handleSearch}>
                    <VscSearch size={35} />
                </button>
            </div>
        </div>
    )
}

export default Search;