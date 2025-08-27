import axios from "axios"

const API =
   axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
})

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("access_token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
        console.log(config.params);
    }
    return config;
})

API.interceptors.response.use((response)=>
response,
async (error)=>{
    const orirequest = error.config;
    if(error.response?.status === 401 && !orirequest._retry){
          orirequest._retry = true;
          try{
             const refresh = localStorage.getItem("refresh_token");
             const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/",
                {refresh:refresh},
             );
             const newrefesh = res.data.access;
             localStorage.setItem("access_token",newrefesh);

             orirequest.headers.Authorization = `Bearer ${newrefesh}`;
             return API(orirequest);
          }catch(e){
             console.error("Refresh token expired. Logging out...");
             localStorage.removeItem("access_token");
             localStorage.removeItem("refresh_token");
          }
    }
     return Promise.reject(error);
})

export const searchDerived = (query: string, k = 20) =>
  API.get(`/search/`, { params: { query, k } });

export const getGridData = ()=> API.get('row/');
export const createGridData = (row:any) => API.post('row/',row);
export const deleteGridData = (id:number) => API.delete(`row/${id}/`);
