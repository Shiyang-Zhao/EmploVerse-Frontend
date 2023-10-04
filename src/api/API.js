import axios from 'axios';
import { API_URL } from "config";

const Axios = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
})

export const API = {
    signUp: function (data) {
        return Axios.post('/users/register', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    signIn: function (data) {
        return Axios.post('/users/authenticate', data);
    },

    logOut: function () {
        return Axios.post('/users/logout', null,);
    },

    getAllUsers: function () {
        return Axios.get('/users/',);
    },

    getUserById: function (id) {
        return Axios.get(`users/getUserById/${id}`,);
    },

    updateUserById: function (id, data) {
        return Axios.post(`users/updateUserById/${id}`, data,);
    },

    getPaginatedUsers: function (pagination) {
        return Axios.get(`/users/page/${pagination.currentPage}?pageSize=${pagination.pageSize}&sortField=${pagination.sortField}&sortDir=${pagination.sortDir}`,);
    },

    searchUsers: function (search) {
        return Axios.get(`/users/searchUsers?keyword=${search.keyword}&searchField=${search.searchField}`,);
    },

    getCurrentUser: function () {
        return Axios.get('/users/getCurrentUser');
    },

    updateCurrentUser: function (data) {
        return Axios.post('/users/updateCurrentUser', data,);
    },

    addCurrentUserToEmployee: function () {
        return Axios.post('/users/addCurrentUserToEmployee', null,);
    },

    updateCurrentUserProfileIamge: function (data) {
        return Axios.post('/users/updateCurrentUserProfileIamge', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getCurrentEmployee: function () {
        return Axios.get('/users/getCurrentEmployee',);
    },

    getAllEmployees: function () {
        return Axios.get('/employees/', {
            headers: {
                withCredentials: true
            }
        });
    },

    createEmployee: function (data) {
        return Axios.post('/employees/createEmployee', data,);
    },

    getEmployeeById: function (id) {
        return Axios.get(`/employees/getEmployeeById/${id}`,);
    },

    updateEmployeeById: function (id, data) {
        return Axios.post(`/employees/updateEmployeeById/${id}`, data,);
    },

    deleteEmployeeById: function (id) {
        return Axios.post(`/employees/deleteEmployeeById/${id}`, null,);
    },

    getPaginatedEmployees: function (pagination) {
        return Axios.get(`/employees/page/${pagination.currentPage}?pageSize=${pagination.pageSize}&sortField=${pagination.sortField}&sortDir=${pagination.sortDir}`,);
    },

    searchEmployees: function (search) {
        return Axios.get(`/employees/searchEmployees?keyword=${search.keyword}&searchField=${search.searchField}`,);
    },
}