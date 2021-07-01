import {getRequest,postRequest} from "./Ajax";

var backendUrl='http://localhost:8080';

export const login=(value,callback)=>{
    const url = backendUrl+"/user/login";
    console.log(value);
    postRequest(url,value,callback);
}

export const checkUsername=(username,callback)=>{
    const url = backendUrl+`/user/checkUsername?username=${username}`;
    getRequest(url,callback);
}

export const addUser=(object,callback)=>{
    const url = backendUrl+`/user/addUser`;
    postRequest(url,object,callback);
}
