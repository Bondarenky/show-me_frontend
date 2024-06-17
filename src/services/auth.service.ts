import { instance } from "../api/axios.api";
import { ILogin, ILoginResponse, IRegistration } from "../types";

export const AuthService = {
    async registration(userData: IRegistration): Promise<string | undefined> {
        const { data } = await instance.post<string>("auth/sign-up", userData);
        
        return data
    },
    async login(userData: ILogin): Promise<ILoginResponse | undefined> {
        const { data } = await instance.post<ILoginResponse>("auth/sign-in", userData);

        return data
    }
}