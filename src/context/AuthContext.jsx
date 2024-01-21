import { createContext, useContext, useState } from "react";
import Service from "../utils/Service";
import { getCSRFToken } from "../utils/Service";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const getUser = async () => {
        let response = await Service.getUser();
        setUser(response.data);
    }

    const login = async (email, password) => {
        let response = await Service.login(email, password);

        if (response.status === 422) {
            setErrors(response.data.errors);
        }

        if (response.status === 204) {
            navigate('/');
        }
    }

    const register = async (name, email, password, passwordConfirmation) => {
        let response = await Service.register(name, email, password, passwordConfirmation);

        if (response.status === 422) {
            setErrors(response.data.errors);
        }

        if (response.status === 204) {
            navigate('/');
        }
    }

    return <AuthContext.Provider value={{ user, errors, getUser, login, register}}>
        {children}
    </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}