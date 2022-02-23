import { sendGet, sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getListUser = () => sendGet('/getListUser');
export const updateUser = (payload: any) => sendPost('/onOffUser', payload);
export const getListSong = (payload: any) => sendPost('/getListSong', payload);
export const updateSong = (payload: any) => sendPost('/onOffSong', payload);
export const getSongDetail = (id: any) => sendGet(`/song/${id}`);
export const updateDetailSong = (payload: any) => sendPost('/updateSong', payload);
export const addSong = (payload: any) => sendPost('/createSong', payload);
