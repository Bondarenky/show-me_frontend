import { FC, useEffect, useState } from "react";
import FormInput from "./inputs/FormInput";
import BlueButton from "./buttons/BlueButton";
import LinkButton from "./buttons/LinkButrton";

interface Props {
    handleCloseRegister: () => void;
    handleOpenLogin: () => void;
}


const Register: FC<Props> = ({handleCloseRegister, handleOpenLogin}) => {
    const [formValues, setFormValues] = useState({
        first_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [formErrors, setFormErrors] = useState({
        first_name: "",
        email: "",
        password: "",
        confirm_password: "",
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleClickForm = (event: any) => {
        event.stopPropagation()
    }

    const handleSubmit = (e: any) => {
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
        if(formValues.first_name === "") {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                first_name: "Некоректне ім’я",
            }));
        }
        if(formValues.confirm_password === "" || formValues.confirm_password !== formValues.password) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                confirm_password: "Неправильний пароль",
            }));
        }
        console.log("Register")
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
        if(formValues.first_name !== "") {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                first_name: ""
            }));
        }
        if(formValues.confirm_password !== "") {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                confirm_password: ""
            }));
        }
    }, [formValues, setFormErrors])

    return (
        <div className="absolute top-0 left-0 bg-slate-500/75 w-full h-full min-h-screen flex justify-center items-center z-50" onClick={handleCloseRegister}>
            <div className="px-7 py-12 bg-black rounded-20 flex flex-col gap-5" onClick={handleClickForm}>
                <div className="font-arimo font-bold text-white text-4xl text-center">
                    Форма реєстрації
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <FormInput errorMsg={formErrors.first_name} name="first_name" placeholder="Ім’я" type="text" value={formValues.first_name} key={"first_name"} onChange={handleInputChange}/>
                    <FormInput errorMsg={formErrors.email} name="email" placeholder="Адреса електроної пошти" type="text" value={formValues.email} key={"email"} onChange={handleInputChange}/>
                    <FormInput errorMsg={formErrors.password} name="password" placeholder="Пароль" type="password" value={formValues.password} key={"password"} onChange={handleInputChange}/>
                    <FormInput errorMsg={formErrors.confirm_password} name="confirm_password" placeholder="Повторіть пароль" type="password" value={formValues.confirm_password} key={"confirm_password"} onChange={handleInputChange}/>
                    <BlueButton onClick={() => {}} type="submit" key={"sub_btn"}>Зареєструватись</BlueButton>
                    <LinkButton onClick={handleOpenLogin} type="button">Вхід</LinkButton>
                </form>
            </div>
        </div>
    )
}

export default Register;