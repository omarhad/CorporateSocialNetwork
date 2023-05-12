import api from '../config/api';
import { User, UpdateProfilePayload } from '../config/types';

const UserService = {
    async getUserProfile(userId: string): Promise<User> {
        try {
            const response = await api.get<User>(`/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async updateProfile(userId: string, payload: UpdateProfilePayload): Promise<User> {
        try {
            const response = await api.put<User>(`/user/${userId}`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async deleteProfile(userId: string): Promise<void> {
        try {
            await api.delete(`/user/${userId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async getUsers(): Promise<User[]> {
        try {
            const response = await api.get<User[]>('/user');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
};

export default UserService;
