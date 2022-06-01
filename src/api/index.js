import axios from "axios";

const instance = axios.create({
    baseURL: "https://backendnodejstzuzulcode.uw.r.appspot.com"
});

const post = async (url, data) => {
    try {
        const response = await instance.post(url, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export {
    post
}