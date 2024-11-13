import {authI ,signInWithEmailAndPassword, getDoc, doc, showModal, datab} from "./firebase.js"



alert("here");


// Login Form Handling
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(authI, loginEmail, loginPassword).then((userCredential) => {
        const user = userCredential.user;
        goFirebase(user.uid);
    }).catch((error) => {
        showModal("Error: " + error.message);
    });
});


// Function to redirect to Firestore
async function goFirebase(id) {
    const docRef = doc(datab, "USUARIOS", id);
    const documentRef = await getDoc(docRef);
    if (documentRef.exists()) {
        const data = documentRef.data();
        localStorage.setItem('usuario', data["name"]);
        localStorage.setItem('correo',data["correo"]);
        localStorage.setItem("id",id);
        window.location.href = 'pagp.html';
    }
};


