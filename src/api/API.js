import axios from 'axios';
import { Cookies } from 'react-cookie';
import { API_URL } from "config";

const cookies = new Cookies();
const jwt = cookies.get('jwt');

const Axios = axios.create({
    baseURL: API_URL,
    timeout: 10000,
})

export const API = {
    signUp: function (data) {
        return Axios.post('/users/register', data);
    },

    signIn: function (data) {
        return Axios.post('/users/authenticate', data);
    },

    logOut: function () {
        return Axios.post('/users/logout', null, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    getAllUsers: function () {
        return Axios.get('/users/', {
            headers: {
                'Authorization': jwt
            }
        });
    },

    getPaginatedUsers: function (pagination) {
        return Axios.get(`/users/page/${pagination.currentPage}?sortField=${pagination.sortField}&sortDir=${pagination.sortDir}`, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    searchUsers: function (search) {
        return Axios.get(`/users/searchUsers?keyword=${search.keyword}&searchField=${search.searchField}`, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    getCurrentUser: function () {
        return Axios.get('/users/getCurrentUser', {
            headers: {
                'Authorization': jwt
            }
        });
    },

    updateCurrentUser: function (data) {
        return Axios.post('/users/updateCurrentUser', data, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    addCurrentUserToEmployee: function () {
        return Axios.post('/users/addCurrentUserToEmployee', null, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    updateCurrentUserProfileIamge: function (data) {
        return Axios.post('/users/updateCurrentUserProfileIamge', data, {
            headers: {
                'Authorization': jwt,
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getCurrentEmployee: function () {
        return Axios.get('/users/getCurrentEmployee', {
            headers: {
                'Authorization': jwt
            }
        });
    },

    getAllEmployees: function () {
        return Axios.get('/employees/', {
            headers: {
                'Authorization': jwt
            }
        });
    },

    createEmployee: function (data) {
        return Axios.post('/employees/createEmployee', data, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    getEmployeeById: function (id) {
        return Axios.get(`/employees/getEmployeeById/${id}`, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    updateEmployeeById: function (id, data) {
        return Axios.post(`/employees/updateEmployeeById/${id}`, data, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    deleteEmployeeById: function (id, data) {
        return Axios.post(`/employees/deleteEmployeeById/${id}`, null, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    getPaginatedEmployees: function (pagination) {
        return Axios.get(`/employees/page/${pagination.currentPage}?sortField=${pagination.sortField}&sortDir=${pagination.sortDir}`, {
            headers: {
                'Authorization': jwt
            }
        });
    },

    searchEmployees: function (search) {
        return Axios.get(`/employees/searchEmployees?keyword=${search.keyword}&searchField=${search.searchField}`, {
            headers: {
                'Authorization': jwt
            }
        });
    },
}