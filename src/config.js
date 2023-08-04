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

export { API_URL, inputTypes, formatLabel }