import api from '../config/api';
import { LoginPayload, SignupPayload, User } from '../config/types';

const AuthService = {
    async login(payload: LoginPayload): Promise<{ token: string; user: User }> {
        try {
            const response = await api.post<{ token: string; user: User }>('/auth/login', payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async signup(payload: SignupPayload): Promise<{ token: string; user: User }> {
        try {
            const response = await api.post<{ token: string; user: User }>('/auth/signup', payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default AuthService;
