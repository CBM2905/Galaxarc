import { getUrl } from "./supabase.js";


async function uploadFoto(){
    const id = localStorage.getItem("id");
    const url = await getUrl(id + ".png");
    return url.publicUrl;
}


export {uploadFoto};