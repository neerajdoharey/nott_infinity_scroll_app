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

export const grant_type: string = 'password';
export const client_id: string = '8XLiNz3V7wdW9I1-5RD39LeBYU_m-KzW_GWlCEpyVqk';
export const client_secret: string = '9Dl-6v5WZw3OtcLFUpWfKIpzInNjXH0fc9L7sL3DO6Q';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null, verified: boolean | null };
  onRegister?: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  me?: () => Promise<any>;
  newOtp?: () => Promise<any>;
  verfiyCode?: (code: string) => Promise<any>;
  userInfo?: {
      id?: string;
      email?: string;
      fullName?: string;
      verified?: boolean;
      [key: string]: any;
  };
}
const USER_TOKEN = 'userToken';
const USER_VERIFIED = 'userVerified';

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
} 

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<{ 
    token: string | null; 
    authenticated: boolean | null,
    verified: boolean | null
  }>({
      token: null, 
      authenticated: false,
      verified: null
  });

  const [userInfo, setUserInfo] = useState<{
    id?: string;
    email?: string;
    fullName?: string;
    verified?: boolean;
    [key: string]: any;
  }>({});

    useEffect(() => {
        const checkToken = async () => {
          const token = await AsyncStorage.getItem(USER_TOKEN);
          const userVerified = await AsyncStorage.getItem(USER_VERIFIED);

          if (token) {
            setAuthState({
                token,
                authenticated: true,
                verified: userVerified === 'true' || false,
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            me(token)
          } else {
            setAuthState({
                token: null,
                authenticated: false,
                verified: null
            });
            axios.defaults.headers.common['Authorization'] = '';
          }
        };
        checkToken();
    }, []);

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
      const payload = {
        user: {
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName
        }
      };
      
      try{
        return await axios.post(`${API_URL}/api/v1/users/signup`, payload)
      }catch (error) {
        console.error('Error during registration:', error);
        return {error}
      }
    };

    const login = async (email: string, password: string) => {
      
      try{
        const result = await axios.post(`${API_URL}/oauth/token`, {email, password, grant_type, client_id, client_secret})
        setAuthState({
          token: result.data.access_token,
          authenticated: true,
          verified: result.data.user.verified,
        })

        setUserInfo({
          id: result.data.user.id,
          email: result.data.user.email,
          fullName: `${result.data.user.first_name} ${result.data.user.last_name}`,
          verified: result.data.user.verified,
        });

        await AsyncStorage.setItem(USER_TOKEN, result.data.access_token);
        await AsyncStorage.setItem(USER_VERIFIED, String(result.data.user.verified));

        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`;

      } catch (error: any) {
        const errorMessage = 'Login failed'

        Snackbar.show({
          text: errorMessage,
          duration: Snackbar.LENGTH_LONG,
        });

        return { error: true, message: errorMessage };
      }
    };

    const logout = async () => {
      try {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
        // const result = await axios.delete(`${API_URL}/api/v1/logout`)
        // if (result.status === 200) {
          await AsyncStorage.removeItem(USER_TOKEN)
          await AsyncStorage.removeItem(USER_VERIFIED)
          axios.defaults.headers.common['Authorization'] = '';
          setAuthState({ token: null, authenticated: false , verified: null});
        // }
      } catch (error) {
        
      }
    };

    const me = async (token: string) => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.get(`${API_URL}/api/v1//me`)
        if (result.status === 200) {
          setUserInfo({
            id: result.data.id,
            email: result.data.email,
            fullName: result.data.full_name,
            verified: result.data.verified,
          });
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_SHORT,
        });
      }
    }

    const generateOtp = async () => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
        const result = await axios.get(`${API_URL}/api/v1/generate_otp`, {})
        if (result.status === 200) {
          Snackbar.show({
            text: 'OTP regenerated successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      } catch (error) {
        console.error('Error during OTP regeneration:', error);
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_SHORT,
        });
      }
    }

    const verfiyCode = async (code: string) => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
        const result = await axios.post(`${API_URL}/api/v1/verify_otp`, { code });
        if (result.data.success) {
          setAuthState(prevState => ({
            ...prevState,
            verified: true
          }));
          await AsyncStorage.setItem(USER_VERIFIED, 'true');
          Snackbar.show({
            text: 'OTP verified successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
          return result.data;
        }else {
          Snackbar.show({
            text: result.data.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          return result.data;
        }
      } catch (error) {
        console.error('Error during OTP verification:', error);
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_SHORT,
        });
      }
    };

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        userInfo,
        newOtp: generateOtp,
        verfiyCode: verfiyCode
    };

    return (
      <AuthContext.Provider value={ value }>
        {children}
      </AuthContext.Provider>
    );
};