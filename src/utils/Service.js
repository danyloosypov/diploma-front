import axios from 'axios';

const baseURL = 'http://192.168.0.105:8000';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, 
});

axiosInstance.defaults.headers.common['Accept'] = 'application/json';

export const getCSRFToken = async () => {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Failed to obtain CSRF token:', error);
    }
};

export default class Service {
    static async login(email, password) {
        try {
            await getCSRFToken();
            const response = await axiosInstance.post('/login', {
                email,
                password,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async register(name, email, password, password_confirmation) {
        try {
            await getCSRFToken();
            const response = await axiosInstance.post('/register', {
                name,
                email,
                password,
                password_confirmation,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async getUser() {
        try {
            const response = await axiosInstance.get('/api/user');
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async getToken() {
        try {
            const response = await axiosInstance.post('/api/tokens/create');
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    static logout() {
        axiosInstance.post('/logout');
    }

    static async forgotPassword(email) {
        try {
            await getCSRFToken();
            const response = await axiosInstance.post('/forgot-password', {
                email
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async resetPassword(email, token, password, password_confirmation) {
        try {
            await getCSRFToken();
            const response = await axiosInstance.post('/reset-password', {
                email,
                token,
                password,
                password_confirmation,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async deleteAccount() {
        try {
            await getCSRFToken();
            const response = await axiosInstance.post('/trash-account');
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async getGameRoles() {
        try {
            await getCSRFToken();
            const response = await axiosInstance.get('/api/game-roles');
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    static async getGoals() {
        try {
            await getCSRFToken();
            const response = await axiosInstance.get('/api/goals');
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    static async getUsers() {
        try {
            await getCSRFToken();
            const response = await axiosInstance.get('/api/users');
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    static async createMatch(data) {
        try {
            await getCSRFToken();
            console.log(data);
            const response = await axiosInstance.postForm('/api/competition', data);
            return response;
        } catch (error) {
            return error.response;
        }
    }

}
