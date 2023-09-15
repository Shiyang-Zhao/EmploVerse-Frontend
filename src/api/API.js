import axios from 'axios';
import { Cookies } from 'react-cookie';
import { API_URL } from "config";

const cookies = new Cookies();

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
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getAllUsers: function () {
        return Axios.get('/users/', {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getUserById: function (id) {
        return Axios.get(`users/getUserById/${id}`, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getPaginatedUsers: function (pagination) {
        return Axios.get(`/users/page/${pagination.currentPage}?pageSize=${pagination.pageSize}&sortField=${pagination.sortField}&sortDir=${pagination.sortDir}`, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    searchUsers: function (search) {
        return Axios.get(`/users/searchUsers?keyword=${search.keyword}&searchField=${search.searchField}`, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getCurrentUser: function () {
        return Axios.get('/users/getCurrentUser', {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    updateCurrentUser: function (data) {
        return Axios.post('/users/updateCurrentUser', data, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    addCurrentUserToEmployee: function () {
        return Axios.post('/users/addCurrentUserToEmployee', null, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    updateCurrentUserProfileIamge: function (data) {
        return Axios.post('/users/updateCurrentUserProfileIamge', data, {
            headers: {
                'Authorization': cookies.get('jwt'),
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getCurrentEmployee: function () {
        return Axios.get('/users/getCurrentEmployee', {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getAllEmployees: function () {
        return Axios.get('/employees/', {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    createEmployee: function (data) {
        return Axios.post('/employees/createEmployee', data, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getEmployeeById: function (id) {
        return Axios.get(`/employees/getEmployeeById/${id}`, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    updateEmployeeById: function (id, data) {
        return Axios.post(`/employees/updateEmployeeById/${id}`, data, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    deleteEmployeeById: function (id, data) {
        return Axios.post(`/employees/deleteEmployeeById/${id}`, null, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    getPaginatedEmployees: function (pagination) {
        return Axios.get(`/employees/page/${pagination.currentPage}?pageSize=${pagination.pageSize}&sortField=${pagination.sortField}&sortDir=${pagination.sortDir}`, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },

    searchEmployees: function (search) {
        return Axios.get(`/employees/searchEmployees?keyword=${search.keyword}&searchField=${search.searchField}`, {
            headers: {
                'Authorization': cookies.get('jwt')
            }
        });
    },
}