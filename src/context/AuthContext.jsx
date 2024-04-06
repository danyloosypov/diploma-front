import { createContext, useContext, useEffect, useState } from "react";
import Service from "../utils/Service";
import { getCSRFToken } from "../utils/Service";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const getUser = async () => {
        let response = await Service.getUser();
        if (response.status === 401) {
            setUser(null);
        } else {
            setUser(response.data);
        }
        
    }

    const getToken = async () => {
        let response = await Service.getToken();
        if (response.token) {
            setToken(response.token);
            localStorage.setItem('token', response.token); 
        } 
    }

    const login = async (email, password) => {
        setErrors([]);

        let response = await Service.login(email, password);

        if (response.status === 422) {
            setErrors(response.data.errors);
        }

        if (response.status === 204) {
            await getUser();
            await getToken();
            navigate('/');
        }
    }

    const register = async (name, email, password, passwordConfirmation) => {
        setErrors([]);

        let response = await Service.register(name, email, password, passwordConfirmation);

        if (response.status === 422) {
            setErrors(response.data.errors);
        }

        if (response.status === 204) {
            await getUser();
            navigate('/');
        }
    }

    const logout = () => {
        Service.logout();
        setUser(null);
    }

    useEffect(() => {
        if(!user) {
          getUser();
        }
      }, []);

    return <AuthContext.Provider value={{ user, token, errors, getUser, login, register, logout}}>
        {children}
    </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}