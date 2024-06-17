import { FC, useState } from "react";
import FormInput from "../components/inputs/FormInput";
import BlueButton from "../components/buttons/BlueButton";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/buttons/LinkButrton";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";

const Login: FC = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const handleLoginSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({
                email: formValues.email,
                password: formValues.password
            })

            if(data) {
                setTokenToLocalStorage("accessToken", data.accessToken);
                localStorage.setItem("userId", data.userId);
                dispatch(login(data))
                toast.success("You have been logged in!");
                navigate("/")
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

    const handleRegistration = () => {
        navigate("/sign-up")
    }

    const handleHome = () => {
        navigate("/");
    }

    return (
        <div className="absolute top-0 left-0 bg-black w-full h-full min-h-screen z-50">
            <div className="flex py-4">
                <BlueButton onClick={handleHome} type="button" styles="rounded-r-[20px]">На головну</BlueButton>
            </div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="px-7 py-12 bg-black rounded-20 flex flex-col gap-5">
                    <div className="font-arimo font-bold text-white text-4xl text-center">
                        Форма входу
                    </div>
                    <form className="flex flex-col gap-9" onSubmit={handleLoginSubmit}>
                        <FormInput errorMsg={""} name="email" placeholder="Адреса електроної пошти" type="text" value={formValues.email} key={"email"} onChange={handleInputChange}/>
                        <FormInput errorMsg={""} name="password" placeholder="Пароль" type="password" value={formValues.password} key={"password"} onChange={handleInputChange}/>
                        <BlueButton type="submit" key={"sub_btn"}>Вхід</BlueButton>
                        <LinkButton onClick={handleRegistration} type="button">Реєстрація</LinkButton>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;