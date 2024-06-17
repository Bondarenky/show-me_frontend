import React, { FC, useState } from "react";
import FormInput from "../components/inputs/FormInput";
import BlueButton from "../components/buttons/BlueButton";
import LinkButton from "../components/buttons/LinkButrton";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";

const Register: FC = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const hanldeRegisterSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.registration({
                name: formValues.name,
                email: formValues.email,
                password: formValues.password,
                confirmPassword: formValues.confirmPassword
            })

            if(data) {
                toast.success(data);
                navigate("/sign-in")
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleLogin = () => {
        navigate("/sign-in");
    }
    
    const handleHome = () => {
        navigate("/")
    }

    return (
        <div className="absolute top-0 left-0 bg-black w-full h-full min-h-screen z-50">
            <div className="flex py-4">
                <BlueButton onClick={handleHome} type="button" styles="rounded-r-[20px]">На головну</BlueButton>
            </div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="px-7 py-12 bg-black rounded-20 flex flex-col gap-5">
                    <div className="font-arimo font-bold text-white text-4xl text-center">
                        Форма реєстрації
                    </div>
                    <form className="flex flex-col gap-9" onSubmit={hanldeRegisterSubmit}>
                        <FormInput errorMsg={""} name="name" placeholder="Ім’я" type="text" value={formValues.name} key={"first_name"} onChange={handleInputChange}/>
                        <FormInput errorMsg={""} name="email" placeholder="Адреса електроної пошти" type="text" value={formValues.email} key={"email"} onChange={handleInputChange}/>
                        <FormInput errorMsg={""} name="password" placeholder="Пароль" type="password" value={formValues.password} key={"password"} onChange={handleInputChange}/>
                        <FormInput errorMsg={""} name="confirmPassword" placeholder="Повторіть пароль" type="password" value={formValues.confirmPassword} key={"confirm_password"} onChange={handleInputChange}/>
                        <BlueButton type="submit">Зареєструватись</BlueButton>
                        <LinkButton onClick={handleLogin} type="button">Вхід</LinkButton>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;