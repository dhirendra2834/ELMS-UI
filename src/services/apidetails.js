import axios from "axios";
import {api, publicApi} from '@/services/api';

// Authentication Management 
// register user
export const registerUserApi = async (requestData) => {
  const response = await publicApi.post(
    `/auth/signup`,
    requestData);
  return response;
};

//  login user
export const loginUserApi = async (requestData) => {
  const response = await publicApi.post(
    `/auth/login`, requestData);
   console.log("login response => ", response);
  return response;
};

// forget password 
export const forgetPasswordApi =async(email)=>{
  const response= await publicApi.post(`/auth/forget_password`, email);
  return response;
}

// verify OTP
export const verifyOtpApi=async(requestData)=>{
  const response = await publicApi.post(`/auth/verify_otp`, requestData);
  return response;
}

// Reset password
 export const resetPasswordApi= async(requestData)=>{
  const response = await api.post(`auth/reset_password`, requestData);
  return response;
 }

// change password
 export const changePasswordApi= async(requestData)=>{
  const response = await api.post(`auth/change_password`, requestData);
  return response;
 }

// --------------------- User management -------------------
// All user details
export const allUsersDataApi= async()=>{
    const response= await api.get(`/user/get/all`);
    return response;  
}

// get User data by UserId
export const userDetailsByUserIdApi=async(Id)=>{
 const response= await api.get(`/user/get/${Id}`);
 return response;
}

// get User details(for self profiles)
export const selfAccountDetailsApi=async(Id)=>{
 const response= await api.get(`/user/me`);
 return response;
}

// ------------------- Course Management ---------------------------
// create course
export const createCourseApi = async (requestData) => {
  const response = await api.post(
    `/courses`,
    requestData,
  );
  return response;
};

// All course details
export const coursesDataApi= async()=>{
    const response= await publicApi.get(`/courses`);
    return response;
}

//  get course data by Id
export const courseDataByIdApi= async(id)=>{
    const response= await publicApi.get(`/courses/${id}`);
    return response;  
}

// update course details By Id
  export const updateCourseByCourseIdApi= async(requestData,Id)=>{
    const response= api.put(
      `courses/${Id}`,
      requestData
    );
    return response;
  }

// delete course by course Id
  export const deleteCourseByCourseIdApi= async(Id)=>{
    const response= api.delete(`courses/${Id}`);
    return response;
  }
// -------------------- Subject Management ----------------
// create Subject
 export const createSubjectApi= async(requestData)=>{
   const response= api.post(`/subjects`, requestData);
   return response;
 }

 // get Subject By SubjectId
 export const getSubjectDatabySubjectIdApi= async(Id)=>{
  const response =api.get(`/subjects/${Id}`);
  return response;
 }

// get All Subject 
export const getAllSubjectApi=async()=>{
 const response =api.get(`/subjects`);
  return response;
}

// update the subject by Subject Id
 export const updateSubjectDatabySubjectIdApi= async(Id)=>{
  const response =api.put(`/subjects/${Id}`);
  return response;
 }

//  get All subject by Course Id
 export const getAllSubjectDatabyCourseIdApi= async(Id)=>{
  const response =api.get(`/subjects/Course/${Id}`);
  return response;
 }

//  --------------------- Chapter Management ---------------------------
//  create Chapter 
 export const createChapterApi= async(requestData)=>{
   const response= api.post(`/chapter`, requestData);
   return response;
 }

//  get Chapter details By Chapter Id
 export const getChapterDetailsByIdApi= async(Id)=>{
  const response =api.get(`/chapter/${Id}`);
  return response;
 }

//  update the Chapter by Chapter Id
 export const updateChapterDetailsByIdApi= async(Id)=>{
  const response =api.put(`/chapter/${Id}`);
  return response;
 }

//  delete the chapter By Chapter Id 
 export const deleteChapterDetailsByIdApi= async(Id)=>{
  const response =api.delete(`/chapter/${Id}`);
  return response;
 }

//  get All subject By chapterId
export const allChapterBySubIdApi= async(Id)=>{
  const response = api.get(`/chapter/subject/${Id}`);
  return response;
}

