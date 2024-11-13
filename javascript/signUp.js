import { authI,createUserWithEmailAndPassword, setDoc, doc, showModal, datab} from "./firebase.js";


// Registration Form Handling
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const registerUsername = document.getElementById("registerUsername").value;
    const registerEmail = document.getElementById("registerEmail").value;
    const registerPassword = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(authI, registerEmail, registerPassword).then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(datab, "USUARIOS", user.uid), {
            name: registerUsername,
            correo: registerEmail
        }).then(() => {
            showModal("Usuario creado exitosamente");
            setTimeout(() => {
                window.location.href = "pagp.html"; // Redirigir al inicio después de un registro exitoso
            }, 3000);
        });
    }).catch((error) => {
        showModal("Error: " + error.message);
    });
});



