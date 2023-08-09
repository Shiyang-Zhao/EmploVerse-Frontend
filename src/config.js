import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import defaultProfileImage from './media/profileImages/defaultProfileImage.jpg';
import userIcon from './media/icons/user.svg';
import togglerIcon from './media/icons/toggler.svg';
import searchIcon from './media/icons/search.svg';
import editIcon from './media/icons/edit.svg';
import deleteIcon from './media/icons/delete.svg';
import facebookIcon from './media/icons/facebook.svg';
import instagramIcon from './media/icons/instagram.svg';
import twitterIcon from './media/icons/twitter.svg';
import youtubeIcon from './media/icons/youtube.svg';


// const API_URL = 'http://54.153.123.3:8080/EmploVerse';

const API_URL = 'http://localhost:8080/EmploVerse';
const inputTypes = {
    password: 'password',
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

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const formatPath = (path) => {
    console.log(path);
    const rootToRemove = 'C:/Users/shiya/Downloads/Projects/EmploVerse/EmploVerse-Frontend/src/';
    return path.replace(rootToRemove, '');
};

export { API_URL, inputTypes, formatLabel, ScrollToTop, defaultProfileImage, formatPath, userIcon, togglerIcon, searchIcon, editIcon, deleteIcon, facebookIcon, instagramIcon, twitterIcon, youtubeIcon }