import { uploadFoto } from "./loadData.js";

document.getElementById('cuentanav').addEventListener('click', function () {
    document.getElementById('carousel').classList.remove("fade-in");
    document.getElementById('carousel').classList.add('hidden');
    document.getElementById('cuenta').classList.remove('hidden');
    document.getElementById('cuenta').classList.add('fade-in');
    uploadLaFoto();
});


document.getElementById('listjuegosnav').addEventListener('click', function () {
    document.getElementById('cuenta').classList.remove("fade-in")
    document.getElementById('cuenta').classList.add('hidden');
    document.getElementById('carousel').classList.remove('hidden');
    document.getElementById('carousel').classList.add('fade-in');
    uploadLaFoto();
});


async function uploadLaFoto(){
    const url = await uploadFoto();
    document.getElementById("fotoPerfil").src = "";
    document.getElementById("fotoPerfil").src = url; 
}