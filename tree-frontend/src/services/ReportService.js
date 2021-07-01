import {getRequest,postRequest,postRequest2} from "./Ajax";

var backendUrl='http://localhost:8080';


export const getReportsByDate=(date,callback)=>{
    var url=backendUrl+`/report/getReportsByDate?date=${date}`;
    getRequest(url,callback);
}

export const getItemsByUserId=(callback)=>{
    var userId=localStorage.getItem('userId');
    var url=backendUrl+`/report/getItemsByUserId?userId=${userId}`;
    getRequest(url,callback);
}

export const getUserInfo=(callback)=>{
    var userId=localStorage.getItem('userId');
    var url=backendUrl+`/user/getUserInfo?userId=${userId}`;
    getRequest(url,callback);
}

export const updateUserInfo=(data,callback)=>{
    var url=backendUrl+'/user/updateUserInfo';
    var userId=localStorage.getItem('userId');
    data['userId']=userId;
    postRequest(url,data,callback);
}

export const postItemsByUserId=(data,callback)=>{
    var userId=localStorage.getItem('userId');
    var url=backendUrl+`/report/postItemsByUserId?userId=${userId}`;
    postRequest2(url,data,callback);
}

export const getAllByUsername=(username,startDate,startNum,endNum,callback)=>{
    var url=backendUrl+'/report/getAllByUsername'
        +`?username=${username}&startDate=${startDate}&startNum=${startNum}&endNum=${endNum}`;
    getRequest(url,callback);
}

export const getDetails=(username,date,callback)=>{
    var url=backendUrl+'/report/getDetails' +`?username=${username}&date=${date}`;
    getRequest(url,callback);
}

export const updateDailyItem=(object,callback)=>{
    var url=backendUrl+'/report/updateDailyItem';
    postRequest(url,object,callback);
}

export const getImage=(dailyId,callback)=>{
    var url=backendUrl+`/report/getImage?dailyId=${dailyId}`;
    getRequest(url,callback);
}

export const getComments=(ownerName,date,callback)=>{
    var userId=localStorage.getItem('userId');
    var url=backendUrl+`/comment/getComments?userId=${userId}&ownerName=${ownerName}&date=${date}`;
    getRequest(url,callback);
}

export const addComment=(obj,callback)=>{
    var userId=localStorage.getItem('userId');
    obj['userId']=userId;
    var url=backendUrl+'/comment/addComment';
    postRequest(url,obj,callback);
}

export const getNoCheckNum=(callback)=>{
    var userId=localStorage.getItem('userId');
    var url=backendUrl+`/comment/getNoCheckNum?userId=${userId}`;
    getRequest(url,callback);
}

export const getNoCheckComments=(callback)=>{
    var userId=localStorage.getItem('userId');
    var url=backendUrl+`/comment/getNoCheckComments?userId=${userId}`;
    getRequest(url,callback);
}

export const getBackground=(userId,callback)=>{
    var url=backendUrl+`/user/getBackground?userId=${userId}`;
    getRequest(url,callback);
}
