import axios, { AxiosRequestConfig, AxiosInterceptorManager } from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Créez une fonction pour attacher le JWT à chaque requête
const jwtInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

// Ajoutez l'intercepteur à la requête
(api.interceptors.request as AxiosInterceptorManager<AxiosRequestConfig>).use(jwtInterceptor);

export default api;
