import {  } from "./firebase.js";
import { uploadFile, getFile, getUrl } from "./supabase.js";


document.getElementById("file").addEventListener("click",function(){
    const foto = document.getElementById("fotoFile").files[0];
    console.log(foto);
    let id = localStorage.getItem("id");
    url(id, foto);
    alert(id);
    console.log("here");
})


function getEvent(event){
    const files = event.target.files[0];
    console.log(files);
    url("1232",files);
}


async function url(id,fotoFile){
    const res = await uploadFile(fotoFile,id);
    console.log(res.path)
    const urlRes = await getUrl(res.path);
    console.log( )
    updateFoto(urlRes.publicUrl);
}

function updateFoto(url){
    alert("click");
    document.getElementById("fotoPerfil").src = "";
    document.getElementById("fotoPerfil").src = url;
}






