import { getUrl, getFile } from "./supabase.js";


async function uploadFoto(){
    const id = localStorage.getItem("id");
    const url = await getFile(id + ".png");
    return url;
}


export {uploadFoto};