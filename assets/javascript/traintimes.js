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

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var trainName = "";

// Click Button changes what is stored in firebase
function postTrainInfo() {
    $("#submit-button").on("click", function () {
        event.preventDefault();

        // Get inputs
        trainName = $("#train-name-input").val();

        // Change what is saved in firebase
        database.ref().set({
            trainName: trainName,
        });
    });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console
    database.ref().on("value", function (snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());

        // Log the value of the various properties
        console.log(snapshot.val().trainName);
        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

$(window).load(postTrainInfo);