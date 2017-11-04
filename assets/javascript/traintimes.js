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
var trainDestination = "";
var trainFrequency = "";
var trainTime = "";


// Click Button changes what is stored in firebase
function postTrainInfo() {
    $("#submit-button").on("click", function () {
        event.preventDefault();

        // Get inputs
        trainName = $("#train-name-input").val();
        trainDestination = $("#train-destination-input").val();
        trainFrequency = $("#train-frequency-input").val();
        trainTime = $("#train-time-input").val();

        // Change what is saved in firebase
        database.ref().push().set({
            trainName: trainName,
            trainDestination: trainDestination,
            trainFrequency: trainFrequency,
            trainTime: trainTime
        });

        // Clear input fields after submission
        $("#train-name-input").val("");
        $("#train-destination-input").val("");
        $("#train-frequency-input").val("");
        $("#train-time-input").val("");

    });

    // Firebase is always watching for changes to the data.
    database.ref().on("value", function (snapshot) {

        var trainData = snapshot.val();

        // Empty train data table befor appending data from database
        $(".submitted-train-data").empty();

        // Loop through the keys in database
        for (var key in trainData) {
            // Define and assign a variable to each key
            var trainObject = trainData[key];
            // Define and assign variable to current time
            var now = moment();
            // Define and assign a variable for the initial train time
            var nextTrainTime = moment(trainObject.trainTime, "HH:mm");
            // Define and assign a variable for the minutes away based on the current time and next train time
            var minutesAway = nextTrainTime.diff(now, 'minutes');

            // While the minutes away variable is less than zero continue looping and adding the frequency
            while (minutesAway < 0) {
                nextTrainTime = moment(nextTrainTime).add(trainObject.trainFrequency, 'm');
                minutesAway = nextTrainTime.diff(now, 'minutes');
            }

            // Create table row and table data elements with appropriate variable information
            var trainDataRow = $("<tr></tr>");
            var trainNameSubmitted = $("<td>" + trainObject.trainName + "</td>");
            var trainDestinationSubmitted = $("<td>" + trainObject.trainDestination + "</td>");
            var trainFrequencySubmitted = $("<td>" + trainObject.trainFrequency + "</td>");
            var trainTimeSubmitted = $("<td>" + moment(nextTrainTime).format("HH:mm") + "</td>");
            var trainMinutesSubmitted = $("<td>" + minutesAway + "</td>");

            // Append new data elements to new table row
            $(trainDataRow).append(trainNameSubmitted);
            $(trainDataRow).append(trainDestinationSubmitted);
            $(trainDataRow).append(trainFrequencySubmitted);
            $(trainDataRow).append(trainTimeSubmitted);
            $(trainDataRow).append(trainMinutesSubmitted);

            // Append new row to train data table
            $(".submitted-train-data").append(trainDataRow);
        }

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

$(window).load(postTrainInfo);