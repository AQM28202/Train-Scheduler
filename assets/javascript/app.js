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
  var destination ="";
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
});
