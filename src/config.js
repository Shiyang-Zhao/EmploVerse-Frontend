import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import imageCompression from 'browser-image-compression';
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

const labelNames = {

};

const errorTypes = {

};

const formatLabel = (name) => {
    const words = name.split(/(?=[A-Z])/); // Split camelCase into separate words
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatPath = (path) => {
    const rootToRemove = 'C:/Users/shiya/Downloads/Projects/EmploVerse/EmploVerse-Frontend/src/';
    return path.replace(rootToRemove, '');
};

const compressedImage = async (event, maxMB) => {
    try {
        const { name, value, files } = event.target;
        const file = files[0];
        if (event.target.type === 'file' && files.length > 0) {
            if (file.size > maxMB * 1024 * 1024) {

                const compressedBlob = await imageCompression(file, {
                    maxSizeMB: maxMB,
                });
                const compressedFile = new File([compressedBlob], file.name, { type: file.type });
                return compressedFile;
            } else {
                return file;
            }
        }
    } catch (error) {
        console.error('Error compressing image:', error);
    }
}

// const importImage = (path) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const imageModule = await import(`../../../${formatPath(path)}`);
//             resolve(imageModule);
//         } catch (error) {
//             console.error("Error loading profile image:", error);
//             reject(error);
//         }
//     });
// };

export { defaultProfileImage, API_URL, inputTypes, labelNames, errorTypes, formatLabel, formatPath, compressedImage }