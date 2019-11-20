var modalMain = $("#muscleGroups");
var modalButton = $("#modButton");
var first_exercise = [];
var second_exercise = [];
var third_exercise = [];

var modalTest = $("#test");
modalTest.hide();
var muscleCheck = 0;

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




function getExercises(){
    var queryURL2 = "https://wger.de/api/v2/exercise?muscles=" + muscleCheck.toString() +  "&license_author=wger.de&language=2"
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(muscleCheck);               
        for(var j = 0; j < response.results.length; j++){
            var d1 = $("<div>")
            var button = $("<button>");
            button.text(response.results[j].name)
            d1.append(button)
            modalTest.append(d1)
        }
    })
}

    

// var queryURL = "https://wger.de/api/v2/exercise?language=2"
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
            var button = $("<button>")
            button.text(muscleGroups[i].name)
            button.attr("data-muscle", muscleGroups[i])
            button.val(muscleGroups[i].name)
            button.addClass("muscleGroup")
            $(modalMain).append(button)
        }

    $(document).on("click", ".muscleGroup",function(){

        modalTest.show();
        var muscleValue = $(this).val();
        console.log(muscleValue)
        if(muscleValue == "Abs"){
            muscleCheck = 6;
            getExercises();
        }
    }) 
})




