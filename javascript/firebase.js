import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'
import { getStorage, ref, uploadBytes} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js'
const firebaseConfig = {
    apiKey: "AIzaSyDAXm0DD_QQez86NdFYAxFqXRaWAch1X7A",
    authDomain: "galaxarc-1dff1.firebaseapp.com",
    projectId: "galaxarc-1dff1",
    storageBucket: "galaxarc-1dff1.appspot.com",
    messagingSenderId: "953769382789",
    appId: "1:953769382789:web:5986cc9c4553b398b86aec",
    measurementId: "G-4BEHQYHPGS"
};





const init = initializeApp(firebaseConfig);
const authI = getAuth(init);
const datab = getFirestore(init);


// Modal Function
function showModal(message) {
    document.getElementById('modalBody').textContent = message; // Insertar mensaje en el modal
    $('#notificationModal').modal('show'); // Mostrar el modal
    setTimeout(() => {
        $('#notificationModal').modal('hide'); // Cerrar el modal después de 3 segundos
    }, 3000);
};


async function updateEmailFirestore(id,correo) {
    const refDoc = doc(datab, "USUARIOS",id);
    await updateDoc(refDoc, {
        "correo": correo
    });
}

async function updateName(id,name) {
    const refDoc = doc(datab, "USUARIOS",id);
    await updateDoc(refDoc, {
        "name": name
    });
}

async function updateEmailName(id,correo, name) {
    const refDoc = doc(datab, "USUARIOS",id);
    await updateDoc(refDoc, {
        "name": name,
        "correo": correo
    });
}

async function updateEmailAuth(email) {
    updateEmail(authI.currentUser, String(email)).then(() => {
        console.log("updated");
        return 1;
      }).catch((error) => {
        console.log(authI.currentUser)
        console.log(error);
        alert(error);
        return 0;
      });
}



async function updatePasswordAuth(password) {
    updatePassword(authI.currentUser, password).then(() => {
        return 1;
      }).catch((error) => {
        return 0;
      });
}

export {authI, datab, doc, getDoc, setDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, showModal, ref, uploadBytes, updateEmailFirestore, updateEmailName,updateEmailAuth,updateName,updatePasswordAuth}