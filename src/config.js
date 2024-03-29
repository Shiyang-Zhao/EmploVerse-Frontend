import imageCompression from 'browser-image-compression';

const API_URL = 'https://emploverse-backend-44b450c4a01a.herokuapp.com/EmploVerse';
// const API_URL = 'http://localhost:8080/EmploVerse';

const SOCK_URL = 'https://localhost:8080/EmploVerse/ws';

const inputTypes = {
    ssn: 'password',
    password: 'password',
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

const labelNames = {

};

const errorTypes = {

};

const formatLabel = (name) => {
    const words = name.split(/(?=[A-Z])/); // Split camelCase into separate words
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

function formatDateFromArray(dateArray) {
    const year = dateArray[0];
    const month = dateArray[1] < 10 ? `0${dateArray[1]}` : dateArray[1];
    const day = dateArray[2] < 10 ? `0${dateArray[2]}` : dateArray[2];

    return `${year}-${month}-${day}`;
}

const compressImage = async (file, maxMB) => {
    try {
        // if (event.target.type === 'file' && files.length > 0) {
        if (file.size > maxMB * 1024 * 1024) {

            const compressedBlob = await imageCompression(file, {
                maxSizeMB: maxMB,
            });
            const compressedFile = new File([compressedBlob], file.name, { type: file.type });
            return compressedFile;
        } else {
            return file;
        }
        // }
    } catch (error) {
        console.error('Error compressing image:', error);
    }
}


function debounce(func, delay) {
    let timeout;

    return function (...args) {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}


export { API_URL, SOCK_URL, inputTypes, labelNames, errorTypes, formatLabel, compressImage, formatDateFromArray }