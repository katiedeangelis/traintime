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

        $("#train-name-input").val("");
        $("#train-destination-input").val("");
        $("#train-frequency-input").val("");
        $("#train-time-input").val("");

    });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console
    database.ref().on("value", function (snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());

        var trainData = snapshot.val();

        $(".submitted-train-data").empty();

        for (var key in trainData) {
            var trainObject = trainData[key];
            var now = moment();
            var nextTrainTime = moment(trainObject.trainTime, "HH:mm");
            console.log(now.to(nextTrainTime));

            var trainDataRow = $("<tr></tr>");
            var trainNameSubmitted = $("<td>" + trainObject.trainName + "</td>");
            var trainDestinationSubmitted = $("<td>" + trainObject.trainDestination + "</td>");
            var trainFrequencySubmitted = $("<td>" + trainObject.trainFrequency + "</td>");
            var trainTimeSubmitted = $("<td>" + trainObject.trainTime + "</td>");
            var trainMinutesSubmitted = $("<td></td>");

            $(trainDataRow).append(trainNameSubmitted);
            $(trainDataRow).append(trainDestinationSubmitted);
            $(trainDataRow).append(trainFrequencySubmitted);
            $(trainDataRow).append(trainTimeSubmitted);
            $(trainDataRow).append(trainMinutesSubmitted);

            $(".submitted-train-data").append(trainDataRow);
        }

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

$(window).load(postTrainInfo);