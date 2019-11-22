var modalMain = $("#muscleGroups");
var modalButton = $("#modButton");

var modalTest = $("#test");
modalTest.hide();
var muscleCheck = 0;

function getExercises ()
{
    var queryURL2 = "https://wger.de/api/v2/exercise?muscles=" + muscleCheck.toString() + "&license_author=wger.de&language=2"
    //  var queryURL2 = "https://wger.de/api/v2/exercise?license_author=wger.de&language=2"

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response)
    {
        console.log(response);
        console.log(muscleCheck);
        for (var j = 0; j < response.results.length; j++) {
            //first_exercise.push(response.results[j].name)
            var button = $("<button>");
            button.text(response.results[j].name)
            button.val(response.results[j].name)
            button.attr("class", "exerciseMovement")
            exercises.push(button.val())
            if (check == 0) {
                d1.append(button)
                modalTest.append(d1)
            }
            else if (check == 1) {
                d2.append(button)
                modalTest.append(d2)

            }
            else if (check == 2) {
                d3.append(button)
                modalTest.append(d3);
            }
        }
    })
}


// function renderGroups() {
//     for (var i = 0; i < muscleGroups.length; i++) {
//         var button = $("<button>")
//         button.text(muscleGroups[i])
//         button.attr("data-muscle", muscleGroups[i])
//         button.val(muscleGroups[i])
//         button.addClass("muscleGroup")
//         $(modalMain).append(button)
//     }
// }

function restart ()
{
    saveChanges.hide();
    check = 0;
    d1.empty();
    d2.empty();
    d3.empty();
    first_exercise = "";
    second_exercise = "";
    third_exercise = "";
}

$("#modButton").on("click", function ()
{
    restart();
})

closeButton.on("click", function ()
{
    check = 0;
})

saveChanges.on("click", function ()
{
    $("#resultTable").append("<tr>" +
        "<th scope='row'>" + muscleValue + "</th>" +
        "<td>" + first_exercise + "</td>" +
        "<td>" + second_exercise + "</td>" +
        "<td>" + third_exercise + "</td>" +
        "</tr>")
})

$(document).on("click", ".exerciseMovement", function ()
{
    check++;
    if (check == 3) {
        third_exercise = $(this).val()
        saveChanges.show();
        check = 0;
    }
    else if (check == 1) {
        first_exercise = $(this).val()
        getExercises();
    }
    else if (check == 2) {
        second_exercise = $(this).val()
        getExercises();
    }
    console.log(first_exercise)
    console.log(second_exercise)
    console.log(third_exercise)
})



// var queryURL = "https://wger.de/api/v2/exercise?language=2"
var queryURL = "https://wger.de/api/v2/exercisecategory?language=2"


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response)
{
    console.log(queryURL);
    console.log(response);
    // console.log(response.results[2].muscles)

    var muscleGroups = response.results;

    for (var i = 0; i < muscleGroups.length; i++) {
        if (response.results[i].name != "Calves") {
            var button = $("<button>")
            button.text(muscleGroups[i].name)
            button.attr("data-muscle", muscleGroups[i])
            button.val(muscleGroups[i].name)
            button.addClass("muscleGroup")
            $(modalMain).append(button)
        }
    }

    $(document).on("click", ".muscleGroup", function ()
    {
        // first_exercise = [];
        modalTest.show();
        var muscleValue = $(this).val();
        console.log(muscleValue)
        if (muscleValue == "Arms") {
            muscleCheck = 1;
            getExercises();
        }
        else if (muscleValue == "Shoulders") {
            muscleCheck = 2;
            getExercises();
        }
        else if (muscleValue == "Chest") {
            muscleCheck = 4;
            getExercises();
        }
        else if (muscleValue == "Abs") {
            muscleCheck = 6;
            getExercises();
        }
        else if (muscleValue == "Back") {
            muscleCheck = 12;
            getExercises();
        }
        else if (muscleValue == "Legs") {
            muscleCheck = 10;
            getExercises();
        }
        else if (muscleValue == "Calves") {
            muscleCheck = 15;
            getExercises();
        }

    })
})
