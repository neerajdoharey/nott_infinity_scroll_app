import React, { createContext, useState, FC, PropsWithChildren, useEffect, useContext } from 'react'
import axios from 'axios'
// import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native';

// export const API_URL: string = Config.API_URL
// const GRANT_TYPE: string = Config.GRANT_TYPE
// const CLIENT_ID: string = Config.CLIENT_ID
// const CLIENT_SECRET: string = Config.CLIENT_SECRET

export const API_URL: string = Platform.OS === 'android'
    ? 'http://10.0.2.2:3000' 
    : 'http://localhost:3000';

export const GRANT_TYPE: string = 'password';
export const CLIENT_ID: string = '8XLiNz3V7wdW9I1-5RD39LeBYU_m-KzW_GWlCEpyVqk';
export const CLIENT_SECRET: string = '9Dl-6v5WZw3OtcLFUpWfKIpzInNjXH0fc9L7sL3DO6Q';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}
const USER_TOKEN = 'userToken';

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
} 

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<{ 
    token: string | null; 
    authenticated: boolean | null 
  }>({
      token: null, 
      authenticated: false
  });

    useEffect(() => {
        const checkToken = async () => {
          const token = await AsyncStorage.getItem(USER_TOKEN);
          if (token) {
            setAuthState({
                token,
                authenticated: true,
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            setAuthState({
                token: null,
                authenticated: false,
            });
            axios.defaults.headers.common['Authorization'] = '';
          }
        };
        checkToken();
    }, []);
    const register = async (email: string, password: string) => {
      try{
        return await axios.post(`${API_URL}/register`, {email, password})
      }catch (error) {
          console.error('Error during registration:', error);
          return {error}
      }
    };

    const login = async (email: string, password: string) => {
      try{
        const result = await axios.post(`${API_URL}/oauth/token`, {email, password, GRANT_TYPE, CLIENT_ID, CLIENT_SECRET})

        setAuthState({
          token: result.data.access_token,
          authenticated: true,
        })

        await AsyncStorage.setItem(USER_TOKEN, result.data.access_token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`;

      }catch(error) {
        console.error('Error during login:', error);
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_SHORT,
        });
        return { error: true, message: String(error) };

      }
    };

    const logout = async () => {
        await AsyncStorage.removeItem(USER_TOKEN)
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({ token: null, authenticated: false });
    };

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
    };

    return (
      <AuthContext.Provider value={ value }>
        {children}
      </AuthContext.Provider>
    );
};