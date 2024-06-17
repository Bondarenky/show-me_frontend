import { FC } from "react";

interface Props {
    children: JSX.Element;
}

const Header: FC<Props> = ({children}) => {
    return (
        <>
            <header className="flex items-center justify-between gap-52 px-6">
                {children}
            </header>
        </>
    )
}

export default Header;