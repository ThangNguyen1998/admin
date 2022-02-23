import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const login = (payload: any) => sendPost('/loginAdmin', payload);
export const signUp = (payload: any) => sendPost('/v1/app/auth/signup', payload);
