import axios from 'axios';

const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, 
});

const getCSRFToken = async () => {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Failed to obtain CSRF token:', error);
    }
}

export default class Service {
    

  static async login(email, password) {
    try {
        await getCSRFToken();
        const response = await axiosInstance.post('/login', {
            email,
            password,
        });

        return response.data;
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
        return response.data;
    } catch (error) {
        return error.response;
    }
  }

}
