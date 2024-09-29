// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO6Xzc1We84Q8y24uX4VtpBMBV--lkuJU",
  authDomain: "museum-chatbot-77b51.firebaseapp.com",
  projectId: "museum-chatbot-77b51",
  storageBucket: "museum-chatbot-77b51.appspot.com",
  messagingSenderId: "873263218031",
  appId: "1:873263218031:web:afbc83b73d63363cca3c9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function to show messages
function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const auth = getAuth();
const db = getFirestore();

const Login = document.getElementById("Login");
Login.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('remail').value;
  const password = document.getElementById('rpassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = 'login.html';
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    });
});

// Handle user login function
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
