import axios from "axios";

const BASE_URL=import.meta.env.VITE_BASE_URL

export const getEvents = async () => {
    
    const config = {
        method: `get`,
        url: BASE_URL + '/event',
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const postEvent = async (data) => {
    
    const config = {
        method: 'post',
        url: BASE_URL + `/event`,
        data: data,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const putEvent = async (id, data) => {

    const config = {
        method: 'put',
        url: BASE_URL + `/event/${id}`,
        data: data,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const deleteEvent = async (id) => {
    
    const config = {
        method: `delete`,
        url: BASE_URL + `/event/${id}`,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}