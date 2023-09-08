import axios from 'axios';
import { Cookies } from 'react-cookie';
import { API_URL } from "config";

const cookies = new Cookies();

const Axios = axios.create({
    baseURL: API_URL,
    timeout: 10000,
})

export const API = {
    signUp: async function (data) {
        return await Axios.post('/users/register', data);
    },

    signIn: async function (data) {
        return await Axios.post('/users/authenticate', data);
    },

    logOut: async function () {
        return await Axios.post('/users/logout', null, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getAllUsers: async function () {
        return await Axios.get('/users/', {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getCurrentUser: async function () {
        return await Axios.get('/users/getCurrentUser', {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    updateCurrentUser: async function (data) {
        return await Axios.post('/users/updateCurrentUser', data, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    addCurrentUserToEmployee: async function () {
        return await Axios.post('/users/addCurrentUserToEmployee', null, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    updateCurrentUserProfileIamge: async function (data) {
        return await Axios.post('/users/updateCurrentUserProfileIamge', data, {
            headers: {
                'Authorization': cookies.get('jwt'),
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getCurrentEmployee: async function () {
        return await Axios.get('/users/getCurrentEmployee', {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },


}