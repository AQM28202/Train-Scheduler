$(document).ready(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyDYi50vWY4E3Oq0UzZ_4cidt00x_AekiHk",
    authDomain: "new-project-fcbd5.firebaseapp.com",
    databaseURL: "https://new-project-fcbd5.firebaseio.com",
    projectId: "new-project-fcbd5",
    storageBucket: "",
    messagingSenderId: "532445689870",
    appId: "1:532445689870:web:054651904477fa59"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // Creating variables for the onClick event
  var name = "";
  var destination = "";
  var firstTrain = "";
  var frequency = 0;

  $("#add-train").on("click", function () {
    event.preventDefault();

    // Grabbed values from form
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    // Pushing to database
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
    $("form")[0].reset();
  });
  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function (childSnapshot) {

    var minsAway;
    // Chang year so first train comes before now
    var userTrain = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");

    // Difference between the current and firstTrain
    var diffTime = moment().diff(moment(userTrain), "minutes");
    var remainder = diffTime % childSnapshot.val().frequency;

    // Minutes until next train
    var minsAway = childSnapshot.val().frequency - remainder;

    // Next train time
    var nextTrain = moment().add(minsAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#add-row").prepend("<tr><td>" + childSnapshot.val().name +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().frequency +
            "</td><td>" + nextTrain + 
            "</td><td>" + minsAway + "</td></tr>");

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});



  });