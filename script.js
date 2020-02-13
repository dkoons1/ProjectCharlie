var modalMain = $("#muscleGroups");
var modalButton = $("#modButton");
var check = 0;
var first_exercise;
var second_exercise;
var third_exercise;
var first_submit;
var second_submit;
var third_submit;
var exercises = [];
var d1 = $("#first")
var d2 = $("#second")
var d3 = $("#third")
var submitTest = $("#submitTest")
var modalTest = $("#test");
var saveChanges = $("#saveChanges")
var closeButton = $("#closeButton")
var muscleValue;
modalTest.hide();
var muscleCheck = 0;
var timeTotal = 0;
var arr = [];
var workout = ["Workout"];
// For drawing the lines
var arms = [0];
var legs = [0];
var back = [0];
var chest = [0];
var abs = [0];
var shoulders = [0];
console.log(shoulders)
var zero = [1];
var ctx = document.getElementById("myChart");

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAXSU5J-w4May1xyijYfiDJ8OomtbtREeE",
    authDomain: "projectcharlie-91b97.firebaseapp.com",
    databaseURL: "https://projectcharlie-91b97.firebaseio.com",
    projectId: "projectcharlie-91b97",
    storageBucket: "projectcharlie-91b97.appspot.com",
    messagingSenderId: "153103074691",
    appId: "1:153103074691:web:c74d6b5f788862b6fae2b6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var connectionsRef = database.ref("/connections");

  var connectedRef = database.ref(".info/connected");

  connectedRef.on("value", function(snap) {

    // If they are connected..
    if (snap.val()) {
  
      // Add user to the connections list.
      var con = connectionsRef.push(true);
  
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
  });

  connectionsRef.on("value", function(snapshot) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#watchers").text(snapshot.numChildren());
  });

function getExercises(){
    var queryURL2 = "https://wger.de/api/v2/exercise?muscles=" + muscleCheck.toString() +  "&license_author=wger.de&language=2"
  //  var queryURL2 = "https://wger.de/api/v2/exercise?license_author=wger.de&language=2"

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(muscleCheck);              
        for(var j = 0; j < response.results.length; j++){
            //first_exercise.push(response.results[j].name)
            var button = $("<button>");
            button.text(response.results[j].name)
            button.val(response.results[j].name)
            button.attr("class", "exerciseMovement")
            button.css("margin-right", "20px")
            button.css("margin-bottom","10px")
            // button.css("display","block")
            exercises.push(button.val())
            if(check == 0){
                d1.append(button)
                modalTest.append(d1)
                $("#submitInput").val('')
            }
            else if(check == 1){
                d2.append(button)
                modalTest.append(d2)
                $("#submitInput").val('')
            }
            else if(check == 2){
                d3.append(button)
                modalTest.append(d3);
                $("#submitInput").val('')
            }
        }
    })
}

function renderChart(){

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {	
      labels: workout,
      datasets: [
        {
          data: arms,
          label: "Arms",
          backgroundColor: "#8A2BE2",
          fill: false
        },
        {
            data: legs,
            label: "Legs",
            backgroundColor: "#3E95CD",
            fill: false
      },
          {
          data: back,
            label: "Back",
            backgroundColor: "#A52A2A",
            fill: false
        },
                {
          data: chest,
            label: "Chest",
            backgroundColor: "#0000FF",
            fill: false
        },
                {
          data: abs,
            label: "Abs",
            backgroundColor: "#00FFFF",
            fill: false
        },
        {
          data: shoulders,
            label: "Shoulders",
            backgroundColor: "#7FFF00",
            fill: false
        },
            {
          data: zero,
            label: "0",
            fill: false
        },
      ]
    }
  });
}

renderChart()

function restart(){
    saveChanges.hide();
    submitTest.hide();
    check = 0;
    d1.empty();
    d2.empty();
    d3.empty();
    d1.css("pointer-events","")
    d2.css("pointer-events","")
    d3.css("pointer-events","")
    submitTest.css("pointer-events", "")
    first_exercise = "";
    second_exercise = "";
    third_exercise = "";
    first_submit = "";
    second_submit = "";
    third_submit = "";
}  

$(".submitButton").on("click", function(){
    event.preventDefault();
    check++;
    if (check == 3){
        third_submit = parseInt($("#submitInput").val())
        d3.css("pointer-events","none")
        saveChanges.show();
        submitTest.css("pointer-events", "none")
        check = 0;  
    }
    else if (check == 1){
        first_submit = parseInt($("#submitInput").val())
        d1.css("pointer-events","none")
     //   d1.hide();
        //submitTest.show();
        submitTest.hide();
        getExercises();
    }
    else if (check == 2){
        second_submit = parseInt($("#submitInput").val())
        d2.css("pointer-events","none")
      //  d2.hide();
        submitTest.hide();
        getExercises();
    }
})

$("#modButton").on("click", function(){
    restart();
})

closeButton.on("click", function(){
    check = 0;
})

saveChanges.on("click", function(){
    var sum = first_submit + second_submit + third_submit;

    localStorage.clear();
    localStorage.setItem("muscleValue", muscleValue);
    localStorage.setItem("first_exercise", first_exercise);
    localStorage.setItem("second_exercise", second_exercise);
    localStorage.setItem("third_exercise", third_exercise);
    localStorage.setItem("sum", sum);
    

    var tableRow = $("<tr>" + 
    "<th scope='row'>" + localStorage.getItem("muscleValue") + "</th>" +
    "<td>" + localStorage.getItem("first_exercise") + "</td>" +
    "<td>" + localStorage.getItem("second_exercise") + "</td>" +
    "<td>" + localStorage.getItem("third_exercise") + "</td>" +
    "<td>" + localStorage.getItem("sum") + "</td>" +
    "</tr>")

    localStorage.setItem( "tabledata", $("#resultTable").html() );

    $("#resultTable").append(tableRow)



    if(muscleCheck == 1){
        arms[0] += sum;
        renderChart();
    }
    else if(muscleCheck == 2){
        shoulders[0] += sum;
        renderChart();
    }
    else if(muscleCheck == 4){
        chest[0] += sum;
        renderChart();
    }
    else if(muscleCheck == 6){
        abs[0] += sum;
        renderChart();
    }
    else if(muscleCheck == 12){
        back[0] += sum;
        renderChart();
    }
    else if(muscleCheck == 10){
        legs[0] += sum;
        renderChart();
    }
})

$(document).on("click", ".exerciseMovement",function(){
    submitTest.show();
    if (check == 2){
        third_exercise = $(this).val()
    }
    else if (check == 0){
        first_exercise = $(this).val()
        d1.append("<hr>")
    }
    else if (check == 1){
        second_exercise = $(this).val()
        d2.append("<hr>")
    }
  //  console.log(first_exercise)
  //  console.log(second_exercise)
  //  console.log(third_exercise)
})

// $(".close").on("click", function(){
//     restart();
// })

//var queryURL = "https://wger.de/api/v2/exercise?language=2"

var queryURL = "https://wger.de/api/v2/exercisecategory?language=2"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(queryURL);
    console.log(response);
   // console.log(response.results[2].muscles)

    var muscleGroups = response.results;

        for (var i = 0; i < muscleGroups.length; i++) {
            if(response.results[i].name != "Calves"){
                var button = $("<button>")
                button.text(muscleGroups[i].name)
                button.attr("data-muscle", muscleGroups[i])
                button.val(muscleGroups[i].name)
                button.addClass("muscleGroup")
                $(modalMain).append(button)
            }
        }

    $(document).on("click", ".muscleGroup",function(){
       // first_exercise = [];
       restart();
       modalTest.empty();
        modalTest.show();
        muscleValue = $(this).val();
    //    console.log(muscleValue)
        if(muscleValue == "Arms"){
            muscleCheck = 1;
            getExercises();
        }
        else if(muscleValue == "Shoulders"){
            muscleCheck = 2;
            getExercises();
        }
        else if(muscleValue == "Chest"){
            muscleCheck = 4;
            getExercises();
        }
        else if(muscleValue == "Abs"){
            muscleCheck = 6;
            getExercises();
        }
        else if(muscleValue == "Back"){
            muscleCheck = 12;
            getExercises();
        }
        else if(muscleValue == "Legs"){
            muscleCheck = 10;
            getExercises();
        }
    }) 
})
