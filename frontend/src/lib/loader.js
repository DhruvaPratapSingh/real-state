import apiRequest from "./apiRequest"
import { defer } from 'react-router-dom';


export const singlePageLoader=async({request,params})=>{
   const res=await apiRequest("/posts/"+params.id);
    return res.data;
    }

    // export const listPageLoader = async ({ request, params }) => {
    //     const query = request.url.split("?")[1];
    //     const res = await apiRequest("/posts?" + query);
    //     // console.log("Query String:", query);
    //     // console.log("Full Response:", res.data);
    
    //     // if (!res || !res.data || !res.data.posts) {
    //     //     console.error("Error: API response is invalid", res);
    //     //     return null;
    //     // }
    //     console.log("Extracted Data:", res.data.posts);
    //     return res.data.posts;
    // };
    export const listPageLoader = async ({ request, params }) => {
        const query = request.url.split("?")[1];
        const postPromise = await apiRequest("/posts?" + query);
        return defer({postResponce:postPromise.data});
    };
    