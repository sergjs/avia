import * as axios from "axios";
 
export const getId = () => {
    return axios.get(`https://front-test.beta.aviasales.ru/search`);
};

export const getTicketsApi = (id) => {
    return axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`)  
};



