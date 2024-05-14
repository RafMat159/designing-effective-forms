// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
import { firebaseConfig } from './conf.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const form = document.querySelector("#form");

const displayError = (error) => {
    alert(`Authentication error: ${error.message} with status code ${error.code}`);
  };

  const updateUserForm = user => {
    const [firstName, lastName] = user.displayName.split(' ');
    document.getElementById('firstName').value = firstName || '';
    document.getElementById('lastName').value = lastName || '';
    document.getElementById('exampleInputEmail1').value = user.email || '';
  };


const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        updateUserForm(user);
    }).catch((error) => {
        displayError(error);
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        displayError(error);
    })
 }
 
 onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
    }else {
        console.log("Not authenticated");
      }
 })
 
 signInButton.addEventListener("click", userSignIn);
 signOutButton.addEventListener("click", userSignOut);


 form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("exampleInputEmail1").value.trim();
  
    if (firstName === "" || lastName === "" || email === "") {
      alert("Please fill in all required fields.");
      return;
    }
  
    alert("Form submitted successfully!");
  });