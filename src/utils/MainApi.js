import Url from "./const";

const getResponseData = (res, errorMessage) => {
    return res.ok ? res.json() : Promise.reject(errorMessage);
};

export {
    getResponseData
};
