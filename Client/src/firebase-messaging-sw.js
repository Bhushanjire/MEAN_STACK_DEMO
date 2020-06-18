importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDNDJwm7pYKnKo-poyd24S6wNCaJBbRbBQ",
    authDomain: "my-angular-app-276108.firebaseapp.com",
    databaseURL: "https://my-angular-app-276108.firebaseio.com",
    projectId: "my-angular-app-276108",
    storageBucket: "my-angular-app-276108.appspot.com",
    messagingSenderId: "776692456291",
    appId: "1:776692456291:web:bdb4bfd4a9ae7774bc9156",
    measurementId: "G-7YZ0LV3C6E"
});
const messaging = firebase.messaging();
