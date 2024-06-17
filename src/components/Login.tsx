import { FC, useEffect, useState } from "react";
import FormInput from "./inputs/FormInput";
import BlueButton from "./buttons/BlueButton";
import LinkButton from "./buttons/LinkButrton";

interface Props {
    handleCloseLogin: () => void;
    handleOpenRegister: () => void;
}

const Login: FC<Props> = ({handleCloseLogin, handleOpenRegister}) => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleClickForm = (event: any) => {
        event.stopPropagation()
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        if(formValues.email === "") {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                email: "Некоректна пошта",
            }));
        }
        if(formValues.password === "") {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                password: "Неправильний пароль",
            }));
        }

        handleCloseLogin();

    }

    useEffect(() => {
        if (formValues.email !== "") {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                email: ""
            }));
        }

        if(formValues.password !== "") {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                password: ""
            }));
        }
    }, [formValues, setFormErrors])

    return (
        <div className="absolute top-0 left-0 bg-slate-500/75 w-full h-full min-h-screen flex justify-center items-center z-50" onClick={handleCloseLogin}>
            <div className="px-7 py-12 bg-black rounded-20 flex flex-col gap-5" onClick={handleClickForm}>
                <div className="font-arimo font-bold text-white text-4xl text-center">
                    Форма входу
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <FormInput errorMsg={formErrors.email} name="email" placeholder="Адреса електроної пошти" type="text" value={formValues.email} key={"email"} onChange={handleInputChange}/>
                    <FormInput errorMsg={formErrors.password} name="password" placeholder="Пароль" type="password" value={formValues.password} key={"password"} onChange={handleInputChange}/>
                    <BlueButton onClick={() => {}} type="submit" key={"sub_btn"}>Вхід</BlueButton>
                    <LinkButton onClick={handleOpenRegister} type="button">Реєстрація</LinkButton>
                </form>
            </div>
        </div>
    )
}

export default Login;