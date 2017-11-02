// Initialize Firebase
var config = {
    apiKey: "AIzaSyAA9e3TiY7LxqC2NLdKSmdksIVyHhP6Ems",
    authDomain: "traintimes-670fc.firebaseapp.com",
    databaseURL: "https://traintimes-670fc.firebaseio.com",
    projectId: "traintimes-670fc",
    storageBucket: "traintimes-670fc.appspot.com",
    messagingSenderId: "191670560835"
};
firebase.initializeApp(config);
firebase.database().ref('trains').push().set({
    train: "Test Train",
    location: "Epping, NH",
    time: "1300"
});