import {  } from "./firebase.js";
import { uploadFile, getFile, getUrl, deleteFile } from "./supabase.js";


document.getElementById("file").addEventListener("click",function(){
    const foto = document.getElementById("fotoFile").files[0];
    console.log(foto);
    let id = localStorage.getItem("id");
    uploadFoto(id, foto);
    alert(id);
    console.log("here");
})


function getEvent(event){
    const files = event.target.files[0];
    console.log(files);
    url("1232",files);
}


async function uploadFoto(id,fotoFile){
    deleteFile(id + ".png");
    const res = await uploadFile(fotoFile,id);
    console.log(res)
    const urlRes = await getFile(res.path);
    console.log(urlRes)
    updateFotoBlob(urlRes);
}

function updateFoto(url){
    alert("click");
    document.getElementById("fotoPerfil").src = "";
    document.getElementById("fotoPerfil").src = url;
}


function updateFotoBlob(blob){
    const imgUrl = URL.createObjectURL(blob);
    updateFoto(imgUrl);
}






