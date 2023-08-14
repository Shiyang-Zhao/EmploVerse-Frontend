import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import defaultProfileImage from './media/profileImages/defaultProfileImage.jpg';

// const API_URL = 'http://54.153.123.3:8080/EmploVerse';

const API_URL = 'http://localhost:8080/EmploVerse';
const inputTypes = {
    password1: 'password',
    password2: 'password',
    email: 'email',
    profileImage: 'file',
    birthday: 'date',
    phoneNumber: 'tel',
    startDate: 'date',
    endDate: 'date',
    default: 'text',
};

const formatLabel = (name) => {
    const words = name.split(/(?=[A-Z])/); // Split camelCase into separate words
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// function ScrollToTop() {
//     const { pathname } = useLocation();

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [pathname]);

//     return null;
// }

const formatPath = (path) => {
    const rootToRemove = 'C:/Users/shiya/Downloads/Projects/EmploVerse/EmploVerse-Frontend/src/';
    return path.replace(rootToRemove, '');
};

export { API_URL, inputTypes, formatLabel, defaultProfileImage, formatPath }