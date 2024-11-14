import { updateName, updateEmailFirestore, updateEmailAuth,  } from "./firebase.js";
import { uploadFile, getFile, getUrl, deleteFile } from "./supabase.js";


document.getElementById("file").addEventListener("click",function(){
    const correo = document.getElementById("inputUsuario").value;
    console.log("corre" + correo);
    updateEA(String(correo));
    //const foto = document.getElementById("fotoFile").files[0];
    //console.log(foto);
    //let id = localStorage.getItem("id");
    //uploadFoto(id, foto);
    //alert(id);
    //console.log("here");
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


function updateN(name){
    const id = localStorage.getItem("id");
    updateName(id, name);
};


function updateE(correo){
    const id = localStorage.getItem("id");
    updateEmail(id, correo);
}


function updateEA(correo){
    const id = localStorage.getItem("id");
    console.log(id + ". . ")
    updateEmailAuth(correo);
}


