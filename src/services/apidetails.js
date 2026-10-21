import axios from "axios";

const baseURL= "http://localhost:8080";
const token="";

// All course details
export const coursesData= async()=>{
    const response= await axios.get(`${baseURL}/courses`);
    return response;
}

//  get course data by Id
export const courseDataById= async(id)=>{
    const response= await axios.get(`${baseURL}/${id}`);
    return response;  
}

// register user
export const registerUser = async (requestData) => {
  const response = await axios.post(
    `${baseURL}/auth/signup`,
    requestData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

//  login user
export const loginUser = async (requestData) => {
  const response = await axios.post(
    `${baseURL}/auth/login`,
    requestData,
    {
      headers: {
        "Content-Type": "application/json"
        //  'Authorization': `Bearer ${token}`,
      },
    }
  );
   console.log("login response => ", response);
  return response;
};